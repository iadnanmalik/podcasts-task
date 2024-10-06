const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const PODCAST_API_BASE = 'https://601f1754b5a0e9001706a292.mockapi.io/podcasts';

// Validate query params helper
const validateQueryParams = (query) => {
  if (query.page && isNaN(query.page)) return 'Page must be a number';
  if (query.limit && isNaN(query.limit)) return 'Limit must be a number';
  return null;
};

router.get('/', async (req, res) => {
  try {
    const { search, title, categoryName, page, limit } = req.query;

    const error = validateQueryParams(req.query);
    if (error) return res.status(400).json({ error });

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (title) params.append('title', title);
    if (categoryName) params.append('categoryName', categoryName);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);

    const url = `${PODCAST_API_BASE}?${params.toString()}`;

    const response = await axios.get(url);

    if (!response.data || (Array.isArray(response.data) && response.data.length === 0)) {
      return res.status(404).json({ error: 'No podcasts found' });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
