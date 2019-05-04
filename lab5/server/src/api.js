import express from 'express';
import mongoose from 'mongoose';
import { CREATED, OK } from 'http-status-codes';
import { check, validationResult } from 'express-validator/check';

const router = express.Router();

const markdownSchema = mongoose.Schema({
    content: String,
});

const markdownEntity = mongoose.model('Markdown', markdownSchema);

const isObjectId = value => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Id is not ObjectId');
    }
    return true;
};

router.get('/', (req, res) => {
    markdownEntity.find((err, entities) => {
        res.json(entities);
    });
});

router.get('/:id', [check('id').custom(isObjectId)], (req, res) => {
    validationResult(req).throw();
    markdownEntity.findById(req.params.id, (err, entity) => {
        res.json(entity);
    });
});

router.post('/', [check('content').isString()],
    (req, res) => {
        validationResult(req).throw();
        const { content } = req.body;

        new markdownEntity({ content }).save((err, entity) => {
            res.status(CREATED).json(entity);
        });
    },
);

router.put(
    '/:id',
    [
        check('content').isString(),
        check('id').custom(isObjectId),
    ],
    (req, res) => {
        validationResult(req).throw();
        const { id } = req.params;
        const { content } = req.body;

        markdownEntity.findByIdAndUpdate(
            id,
            { content },
            { new: true },
            (err, entity) => {
                res.status(OK).json(entity);
            },
        );
    },
);

router.delete('/:id', [check('id').custom(isObjectId)], (req, res) => {
    validationResult(req).throw();
    const { id } = req.params;
    markdownEntity.findByIdAndDelete(id, () => {
        res.sendStatus(OK);
    });
});

export default router;
