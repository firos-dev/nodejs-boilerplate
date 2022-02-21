const express = require('express')
const { searchIHI } = require('../healthCare/searchIHI.js')

const router = express.Router()


router.get('/', (req,res) => {
    res.send('Welcome to the simple node express biolerplate.')
})

router.get('/test',async (req,res) => {
    const response = await searchIHI()
    // console.log(response);
  res.json(response)
})

module.exports = router