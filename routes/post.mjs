import express from 'express'
import { customAlphabet } from 'nanoid'
import pineconeClient, { openai as openaiClient } from '../pinecone.mjs'
// import { ObjectId } from 'mongoose';
// import Posts from '../modals/Posts.mjs';
import 'dotenv/config'

//In pinecone index is known as database and namespace is known as collection or table in context of SQLdb
const pcIndex = pineconeClient.Index(process.env.PINECONE_INDEX_NAME);
console.log("process.env.PINECONE_INDEX_NAME: ", process.env.PINECONE_INDEX_NAME);

let router = express.Router()


// POST //create   /api/v1/post
router.post('/post', async (req, res, next) => {
    console.log('This is create post request', new Date());
    try {
        if (
            (req.body.PostTitle.trim().length == 0) || (req.body.Desc.trim().length == 0)
        ) {
            res.status(403);
            res.send(`required parameters missing, 
        example request body:
        {
            PostTitle: "abc post title",
            PostDesc: "some post text"
        } `);
            return;
        }
        const response = await openaiClient.embeddings.create({
            model: "text-embedding-ada-002",
            input: `${req.body.PostTitle} ${req.body.Desc}`,
        })
        const vector = response?.data[0]?.embedding
        console.log("vector: ", vector);

        const upsertResponse = await pcIndex.upsert([{
            id: nanoid(), // unique id
            values: vector,
            metadata: {
                PostTitle: req.body.PostTitle,
                Desc: req.body.Desc,
                createdOn: new Date().getTime()
            },
        }]);
        console.log("upsertResponse: ", upsertResponse);


        res.send('Post created');
    }
    catch (error) {

        console.error(error);
        res.status(500).send('Internal Server Error');

    }

})
// GET     /api/v1/posts/:userId
router.get('/posts', async (req, res, next) => {
    console.log('this is posts v1', new Date());

    // const cursor = col.find({});
    // let PostArr = await cursor.toArray()
    // res.send(PostArr)

    try {
        const response = await openaiClient.embeddings.create({
            model: "text-embedding-ada-002",
            input: "",
        });
        const vector = response?.data[0]?.embedding
        console.log("vector: ", vector);
        // [ 0.0023063174, -0.009358601, 0.01578391, ... , 0.01678391, ]

        const queryResponse = await pcIndex.query({
            vector: vector,
            // id: "vec1",
            topK: 10000,
            includeValues: false,
            includeMetadata: true
        });

        queryResponse.matches.map(eachMatch => {
            console.log(`score ${eachMatch.score.toFixed(1)} => ${JSON.stringify(eachMatch.metadata)}\n\n`);
        })
        console.log(`${queryResponse.matches.length} records found `);

        const formattedOutput = queryResponse.matches.map(eachMatch => ({
            text: eachMatch?.metadata?.text,
            title: eachMatch?.metadata?.title,
            _id: eachMatch?.id,
        }))

        res.send(formattedOutput);

    } catch (e) {
        console.log("error getting data pinecone: ", e);
        res.status(500).send('server error, please try later');
    }

})
// // GET     /api/v1/post/:userId/:postId
router.get('/post/:postId', async (req, res, next) => {
    console.log('this is specific post request v1', new Date());


})
// // PUT     /api/v1/post/:userId/:postId
router.put('/post/update/:postId', async (req, res, next) => {
    console.log('this is post v1', new Date());
    try {
        if (postId && req.body.PostTitle.trim().length != 0 && req.body.Desc.trim().length != 0) {
            const response = await openaiClient.embeddings.create({
                model: "text-embedding-ada-002",
                input: `${req.body.PostTitle} ${req.body.Desc}`,
            });
            const vector = response?.data[0]?.embedding
            console.log("vector: ", vector);

            const upsertResponse = await pcIndex.upsert([{
                id: req.params.postId,
                values: vector,
                metadata: {
                    PostTitle: req.body.PostTitle,
                    Desc: req.body.Desc,
                },
            }]);
            console.log("upsertResponse: ", upsertResponse);


            res.send({ message: 'post created' });
        }
    } catch (error) {
        res.send({ message: `Please donot leave the given fields Empty` })
        res.status(422)
    }


})
// // DELETE  /api/v1/post/:userId/:postId
router.delete('/post/delete/:postId', async (req, res, next) => {
    console.log('this is delete post v1', new Date());

    const deleteResponse = await pcIndex.deleteOne(req.params.postId)
    console.log("deleteResponse: ", deleteResponse);

    res.send('post deleted');
})
export default router