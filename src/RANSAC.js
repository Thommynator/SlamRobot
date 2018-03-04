function RANSAC(data) {
    this.rawData = data
    this.maxAttempts = 500   // max number of times to attempt to find lines
    this.numSamples = 3      // number of samples to compute initial line
    this.range = 20          // range of used data points to sample from
    this.maxDist = 50        // max distance a reading may be from line to get associated to line
    this.minNumPoints = 20   // number of points that must lie on a line for it to be taken as a line

    this.unassignedPoints = []
    this.consensus = []

    this.analyze = function() {
        var tries = 0
        // while(this.rawPoints.length > 0 
        //     && this.rawPoints.length > this.consensus.length
        //     && tries < this.maxAttempts) {

        for(var i=0; i<100; i++){

            // step 1: select a random data reading
            var rndIdx = random(rawData.length)

            // step 2 range

            // step 3 least squares line

            // step 4 count points close to line
            
            // step 5

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
        var ATA = math.multiply(Atrans, A)
        var y = math.matrix(tmpY)

        // solve (A' * A)^-1 * A'*y
        var inv = math.inv(ATA)
        var result = math.multiply(inv, math.multiply(Atrans, y))
        return result
    }
}