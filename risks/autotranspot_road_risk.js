var object = execution.getVariable('object')
var block = object.prop("entitiesKndKnoData").elements()
	.get(0)
	.prop("regionalAdditionalData")
	.prop("form")
	.prop("block")    
    
var AUTOTRANSPORT_risk_category = null
var ROADS_risk_category = null
var globalRisk = null
var riskCategory = null

var highRisk = 1
var significantRisk = 2
var middleRisk = 3
var lowRisk = 4

var risk_severity = null
var risk_probability= null
var risk_conscientiousness = null

var countPoints_severity = null
var countPoints_probability = null
var countPoints_conscientiousness = null

var coeff_severity = 0.5
var coeff_probability = 0.25
var coeff_conscientiousness = 0.25 

var dtpCount = 0
var regularCart = 0
var insurance = 0
var groupSeverity = "" 
var groupProbability= 0 

// checkboxes
var transportRisk = false
var roadsRisk = false

try {
    transportRisk = block.prop("transportRisk").value()
} catch(error) {}

try {
    transportRisk = block.prop("transportRisk").value()
} catch(error) {}
try {
    roadsRisk = block.prop("roadsRisk").value()
} catch(error) {}
try {
    dtpCount = block.prop("dtpCount").value()
} catch(error) {}
try {
    regularCart = block.prop("regularCart").value()
} catch(error) {}
try {
    insurance = block.prop("insurance").value()
} catch(error) {}
try {
    groupSeverity = block.prop("groupSeverity").value()
} catch(error) {}
try {
    groupProbability = block.prop("groupProbability").value()
} catch(error) {}
   

function assignSeverityPoints(quantity) { 
    if(quantity === 0) return 0
    if(quantity === 1 || quantity === 2) return 25
    if(quantity === 3 || quantity === 4) return 50
    if(quantity === 5 || quantity === 6) return 75
    if(quantity > 6) return 100 
}

countPoints_severity = assignSeverityPoints(dtpCount)


function assignProbabilityPoints(quantity) {
    if(quantity < 11) return  0
    if(quantity > 10 && quantity < 51) return 25
    if(quantity > 50 && quantity < 101) return 50
    if(quantity > 100 && quantity < 151) return 75
    if(quantity > 150) return 100
}

countPoints_probability = assignProbabilityPoints(regularCart)


function assignConscientiousnessPoints(quantity) {
    if(quantity === 0) return 0
    if(quantity === 1) return 100
}

countPoints_conscientiousness = assignConscientiousnessPoints(insurance)


function calculationSeverityRisk (s, cs) { return risk_severity = s * cs }
calculationSeverityRisk(coeff_severity, countPoints_severity)

function calculationProbabilityRisk (p, r) { return risk_probability = p * r }
calculationProbabilityRisk(coeff_probability, countPoints_probability)

function calculationConscientiousnessRisk (c, i) { return risk_conscientiousness = c * i }
calculationConscientiousnessRisk(coeff_conscientiousness, countPoints_conscientiousness)

function calculationGlobalRiskTransport (s, p, c) {
    var globalRisk = s + p + c 
    if(globalRisk > 75)  return highRisk
    if(globalRisk  > 49 && globalRisk <= 75 ) return middleRisk
    if(globalRisk  < 50  ) return lowRisk
}


AUTOTRANSPORT_risk_category = calculationGlobalRiskTransport(
    risk_severity, 
    risk_probability, 
    risk_conscientiousness
    ) 

riskCategory = AUTOTRANSPORT_risk_category 
execution.setVariable("riskCategory", riskCategory); 


// function calculationGlobalRiskRoad (s, p) {
//     if ((s === "A" || s === "B") && p === 1) return highRisk
//     if ((s === "A" || s === "B") && p === 2) return significantRisk
//     if ((s === "A" && p > 2) || (s === "B" && p === 3)) return middleRisk
//     if (s === "B" && p === 4) return lowRisk
// }

// ROADS_risk_category = calculationGlobalRiskRoad(
//     groupSeverity, 
//     groupProbability
//     )

// if (!transportRisk && !roadsRisk) transportRisk = true

// if (transportRisk)  { 
//     roadsRisk = false
// }


// riskCategory = ROADS_risk_category 

// if (roadsRisk)  {
//     transportRisk = false
// }
