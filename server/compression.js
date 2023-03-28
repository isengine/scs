import compression from 'compression'

function shouldCompression(req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}

export { compression, shouldCompression }
