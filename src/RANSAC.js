function RANSAC(points) {
    // list of 2D cartesian points
    this.unassignedPoints = points
    this.maxAttempts = 100   // max number of times to attempt to find lines
    this.numSamples = 3     // number of samples to compute initial line
    this.range = 20          // range of used data points to sample from
    this.maxDist = 3         // max distance a reading may be from line to get associated to line
    this.minNumPoints = 10   // number of points that must lie on a line for it to be taken as a line

    /* 
    consensus example: [
        {points: [{x: 2, y: 5}, {x: 1, y: 3}, {x: 3, y: 7}], m: 1, b: 2},
        {points: [{x: 1, y: 3}, {x: 2, y: 8}, {x: 2, y: 9}], m: 0.3, b: 3},
        {points: [{x: 1, y: 4}, {x: 3, y: 9}, {x: 4, y: 9}], m: 0.4, b: 1}
    ] 
    */
    this.consensus = []

    this.analyze = function () {
        var tries = 0
        while (this.unassignedPoints.length > 5
            && this.unassignedPoints.length > this.consensus.length
            && tries < this.maxAttempts) {

            // TODO this will be replaced by "while" above
            // for (var i = 0; i < 10000; i++) {

            // list of randomly picked sample points
            var samples = []
            // used to check if a index was used earlier
            var previousIndices = []
            var initialIdx = floor(random(this.unassignedPoints.length))
            for (var i = 0; i < this.numSamples; i++) {
                // only pick indices around the initial index
                var rndIdx = initialIdx + floor(random(-this.range / 2, this.range / 2))
                // if index is negative or index was picked earlier, pick new index
                while (rndIdx < 0 
                    || rndIdx >= this.unassignedPoints.length 
                    || previousIndices.includes(rndIdx)) {
                    rndIdx = initialIdx + floor(random(-this.range / 2, this.range / 2))
                }
                previousIndices.push(rndIdx)
                samples.push(this.unassignedPoints[rndIdx])
            }

            // compute line parameters of sample points  
            var lineParameters = this.linearLeastSquares(samples)

            // select points, which are close to this line
            var selectedPoints = []
            var numberOfUnassignedPoints = this.unassignedPoints.length
            var pointsTooFarAway = []
            for (var i = 0; i < numberOfUnassignedPoints; i++) {
                var point = this.unassignedPoints.pop()
                let m = lineParameters.get([0])
                let b = lineParameters.get([1])
                var expectedY = m * point.x + b
                var distance = dist(point.x, point.y, point.x, expectedY)
                if (distance < this.maxDist) {
                    selectedPoints.push(point)
                } else {
                    pointsTooFarAway.push(point)
                }
            }
            pointsTooFarAway.forEach(p => this.unassignedPoints.push(p))

            // if amount of selected points is big enough, compute new line parameters
            if (selectedPoints.length > this.minNumPoints) {
                lineParameters = this.linearLeastSquares(selectedPoints)
                this.consensus.push({ points: selectedPoints, m: lineParameters.get([0]), b: lineParameters.get([1]) })
                var startPointLine = { x: 0, y: lineParameters.get([1]) }
                var endPointLine = { x: width / 2, y: lineParameters.get([0]) * width / 2 + lineParameters.get([1]) }
                line(startPointLine.x, startPointLine.y, endPointLine.x, endPointLine.y)
            } else {
                // too few points for consensus: add them again to the list of unassigned points
                selectedPoints.forEach(p => this.unassignedPoints.push(p))
            }
            tries++
        }
    }

    /** 
     * Expects a list of points, e.g. [{x: 12, y: 23}, {x:6, y: 8}].
     * Estimates a linear regression line: y=mx+b
     * Reuturns a 2x1 matrix.
     * The first element is the slope: m
     * The second element is the intersection with y-axis: b
    */
    this.linearLeastSquares = function (points) {
        var tmpA = []
        var tmpY = []

        for (var point of points) {
            // console.log('points', points)
            tmpA.push([point.x, 1])
            tmpY.push(point.y)
        }

        var A = math.matrix(tmpA)
        var Atrans = math.transpose(A)
        var ATA = math.multiply(Atrans, A)
        var y = math.matrix(tmpY)

        // solve (A' * A)^-1 * A'*y
        var inv = math.inv(ATA)
        var result = math.multiply(inv, math.multiply(Atrans, y))
        return result
    }
}