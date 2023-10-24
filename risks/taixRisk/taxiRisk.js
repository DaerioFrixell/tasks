var object = execution.getVariable("object")
var block = object
	.prop("entitiesKndKnoData")
	.elements()
	.get(0)
	.prop("regionalAdditionalData")
	.prop("form")
	.prop("block")

var riskCategory;
var biggestValue;

var highCategory = 1
var middleCategory = 2
var lowCategory = 3

var M1 = 0
var M2 = 0

var N1 = 0
var Z1 = 0
var N2 = 0

var Rt = 0
var Rv = 0
var Rd = 0

var P1 = ""
var P2 = ""
var P3 = ""
var P4 = ""
var P5 = ""
var P6 = ""
var P7 = ""
var P8 = ""
var P9 = ""


try {
	M1 = block.prop("M1").value()
} catch (error) {}
try {
	M2 = block.prop("M2").value()
} catch (error) {}

try {
	N1 = block.prop("N1").value()
} catch (error) {}
try {
	Z1 = block.prop("Z1").value()
} catch (error) {}
try {
	N2 = block.prop("N2").value()
} catch (error) {}

try {
	P1 = block.prop("P1").value()
} catch (error) {}
try {
	P2 = block.prop("P2").value()
} catch (error) {}
try {
	P3 = block.prop("P3").value()
} catch (error) {}
try {
	P4 = block.prop("P4").value()
} catch (error) {}
try {
	P5 = block.prop("P5").value()
} catch (error) {}
try {
	P6 = block.prop("P6").value()
} catch (error) {}
try {
	P7 = block.prop("P7").value()
} catch (error) {}
try {
	P8 = block.prop("P8").value()
} catch (error) {}
try {
	P9 = block.prop("P9").value()
} catch (error) {}

var k = 0;

// проверка деления на 0
if (Number(Z1) === 0) {
  k = 0;
} else {
  k = N1 / Z1;
}

function calculateValue() {
	Rt = 20 * M1 + 5 * M2;
	Rv = 200 * k + 5 * N2;
	Rd = 4 * (9 - +P1 - +P2 - +P3 - +P4 - +P5 - +P6 - +P7 - +P8 - +P9);
	var biggestIndex = Math.max(Rt, Rv, Rd);
	var numberBiggestIndex = Number(biggestIndex)
	
	execution.setVariable("biggestIndex", biggestIndex)
	execution.setVariable("numberBiggestIndex", numberBiggestIndex)
	return numberBiggestIndex;
}

var biggestValue = calculateValue()
var a = Number(biggestValue)

execution.setVariable("biggestValue", biggestValue)
riskCategory = 0;

execution.setVariable("riskCategoryBefore", riskCategory)

if (biggestValue >= 15) {
	riskCategory = highCategory
	execution.setVariable("riskCategory", riskCategory)
}
if (biggestValue >= 7 && biggestValue <= 14) {
	riskCategory = middleCategory
	execution.setVariable("riskCategory", riskCategory)
}
if (biggestValue <= 6 || biggestValue === 0) {
	riskCategory = lowCategory
	execution.setVariable("riskCategory", riskCategory)
}

execution.setVariable("riskCategoryAfter", riskCategory)

