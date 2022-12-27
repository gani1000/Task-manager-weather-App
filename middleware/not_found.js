const notFound = (req, res) => {
    res.status(404).send('Not found/ Unknown')
}

module.exports = notFound;