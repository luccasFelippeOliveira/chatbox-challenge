const express = require('express');
const router = express.Router();

router.route('/').get(
    (req, res, next) => {
        try {
            return res.status(200).json({
                success: true,
                data: 'Sucesso'
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
)

module.exports = router;