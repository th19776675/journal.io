const { User, Journal, Page } = require('../models');
const cron = require('node-cron');

cron.schedule('0 0 * * *', async function() {
    const journals = await Journal.find(
        { isDaily: true }
    )
    for (let i = 0; i < journals.length; i++) {
        const journal = await Journal.findOneAndUpdate(
            {_id: journals[i]._id},
            {$set: {isEditable: true}},
            { runValidators: true, new: true }
        )
        if (!journal) {
            return res.status(400).json({ message: 'Daily Editability was not restored!' });
        }
    }
    console.log('Restored editibility to daily journals');
  });

module.exports = {
    async createJournal ({user, body}, res) {
        const newJournal = await Journal.create({
            ...body, 
            authorName: user.username,
        })

        if (!newJournal) {
            return res.status(400).json({ message: 'Journal was not created!' });
        }

        const updatedUser = await User.findOneAndUpdate(
            {_id: user._id},
            {$addToSet: {journals: newJournal._id}},
            { runValidators: true, new: true }
        )

        if (!updatedUser) {
            return res.status(400).json({ message: 'User was not synced with Journal!' });
        }

        res.json({ newJournal, updatedUser })
    },
    async getAllJournals (req, res) {
        const publicJournals = await Journal.find(
            { isPublic : true }
        )

        if (!publicJournals) {
            return res.status(400).json({ message: 'There are no public Journals' });
        }

        res.json( publicJournals )
    },
    async getJournal ({user, params}, res) {
        const journal = await Journal.findById(params.journalId).populate("pages")
        if (!journal) {
            return res.status(400).json({ message: 'This journal could not be found!' });
        }
        if (journal.isPublic === false && journal.authorName !== user.username) {
            return res.status(400).json({ message: 'This journal is private!' });
        }
        res.json(journal);
    },
    async getDailyJournal ({user, params}, res) {
        const dailyJournal = await Journal.findOne({authorName: user.username, isDaily: true}
        )
        if (!dailyJournal) {
            return res.status(400).json({ message: 'This journal could not be found!' });
        }
        res.json(dailyJournal);
    },
    async updateJournal ({body, params}, res) {
        const updatedJournal = await Journal.findOneAndUpdate(
            { _id: params.journalId },
            { $set: body },
            { runValidators: true, new: true }
        );
        if (!updatedJournal) {
            return res.status(400).json({ message: 'The journal could not be updated!' });
        };
        res.json(updatedJournal);
    },
    async deleteJournal ({user, params}, res) {
        const deletedJournal = await Journal.findByIdAndDelete(params.journalId)
        if (!deletedJournal) {
            return res.status(400).json({ message: 'The journal could not be deleted!' });
        }
        const updatedUser = await User.findOneAndUpdate(
            {_id: user._id},
            {$pull: {journals: params.journalId}},
            { runValidators: true, new: true }
        )
        if (!updatedUser) {
            return res.status(400).json({ message: 'The user could not be updated!' });
        }
        res.json({ deletedJournal, updatedUser })
    },
    async createPage ({headers, body, params}, res) {
        const {content, isPlain, isDaily} = body
        const newPage = await Page.create({content, isPlain});
        if (!newPage) {
            return res.status(400).json({ message: 'Page could not be created!' });
        };
        let updatedJournal = await Journal.findOneAndUpdate(
            {_id: params.journalId},
            {$addToSet: {pages: newPage._id}},
            { runValidators: true, new: true }
        );
        if (!updatedJournal) {
            return res.status(400).json({ message: 'Page could not be added to journal!' });
        };
        if (isDaily === true) {
            updatedJournal = await Journal.findOneAndUpdate(
                {_id: params.journalId},
                {$set: {isEditable: false}},
                { runValidators: true, new: true }
            );
        }
        res.json({newPage, updatedJournal})
    },
    async getPage ({params}, res) {
        const page = await Page.findById(params.pageId);
        if (!page) {
            return res.status(404).json({ message: 'Page could not be found!' });
        }
        res.json(page)
    },
    async addPage ({body, params}) {
        const checkPage = Page.findById(params.pageId);
        if (!checkPage) {
            return res.status(404).json({ message: 'Page could not be found!' });
        }
        const updatedJournal = await Journal.findOneAndUpdate(
            {_id: body.journalId},
            {$addToSet: {pages: params.pageId}},
            { runValidators: true, new: true }
        );
        if (!updatedJournal) {
            return res.status(404).json({ message: 'Page was not added to Journal!' });
        }
        res.json(updatedJournal);
    },
}
