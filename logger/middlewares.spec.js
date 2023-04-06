import request from 'supertest'
import express from 'express'
import { withRequestContext } from './middlewares';
import { ctx } from './context';

describe('withRequestContext', () => {
    describe('an inbound request with a request-id', () => {
        const app = express()
        app.use(withRequestContext)
        app.get('/test', function (req, res) {
            expect(ctx.getRequestId()).not.toBe(undefined)
            res.status(200).json({ healthy: 'yes' });
        });

        it('sets a new request-id in the context', async () => {
            await request(app).get('/test')
                .expect(200)
        })    
    })

    describe('an inbound request with a request-id', () => {
        const app = express()
        app.use(withRequestContext)
        app.get('/test', function (req, res) {
            expect(ctx.getRequestId()).toEqual('inbound-request-id')
            res.status(200).json({ healthy: 'yes' });
        });

        it('uses existing request-id in the header', async () => {
            await request(app).get('/test').set('request-id', 'inbound-request-id')
                .expect(200)
        }) 
    })
})