function RANSAC(points) {
    // list of 2D cartesian points
    this.unassignedPoints = points
    this.maxAttempts = 500   // max number of times to attempt to find lines
    this.numSamples = 10     // number of samples to compute initial line
    this.range = 20          // range of used data points to sample from
    this.maxDist = 50        // max distance a reading may be from line to get associated to line
    this.minNumPoints = 20   // number of points that must lie on a line for it to be taken as a line

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
        // while(this.unassignedPoints.length > 0 
        //     && this.unassignedPoints.length > this.consensus.length
        //     && tries < this.maxAttempts) {

        // TODO this will be replaced by "while" above
        for (var i = 0; i < 10000; i++) {

            // list of randomly picked sample points
            var samples = []
            for (var i = 0; i < this.numSamples; i++) {
                var rndIdx = floor(random(this.unassignedPoints.length))
                samples.push(this.unassignedPoints[rndIdx])
            }

            // compute line parameters of sample points  
            var lineParameters = this.linearLeastSquares(samples)

            // select points, which are close to this line
            var selectedPoints = []
            for (var i = 0; i < this.unassignedPoints.length; i++) {
                var point = this.unassignedPoints[i]
                let m = lineParameters.get([0])
                let b = lineParameters.get([1])
                var expectedY = m * point.x + b
                // console.log('m', m, 'b', b)
                console.log(point.x, point.y, point.x, expectedY)
                var distance = dist(point.x, point.y, point.x, expectedY)
                if (distance < this.maxDist) {
                    selectedPoints.push(this.unassignedPoints.splice(i, 1)[0])
                }
            }

            // if amount of selected points is big enough, compute new line parameters
            if (selectedPoints.length > this.minNumPoints) {
                lineParameters = this.linearLeastSquares(selectedPoints)
                this.consensus.push({ points: selectedPoints, m: lineParameters.get([0]), b: lineParameters.get([1]) })
            } else {
                // too few points for consensus: add them again to the list of unassigned points
                this.unassignedPoints.push(selectedPoints)
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
            tmpA.push([point.x, 1])
            tmpY.push(point.y)
        }

        var A = math.matrix(tmpA)
        var Atrans = math.transpose(A)
        console.log('AT', Atrans, 'A', A)
        var ATA = math.multiply(Atrans, A)
        var y = math.matrix(tmpY)

        // solve (A' * A)^-1 * A'*y
        var inv = math.inv(ATA)
        console.log('A', A, 'AT', Atrans, 'ATA', ATA, 'Inv', inv)
        return math.multiply(inv, math.multiply(Atrans, y))
    }
}