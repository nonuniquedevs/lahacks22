export const calculateFlightEmissions = function(selectedAirports, passengers) {
    let legs = []
    let max = selectedAirports.length-1
    for (let key2 = 0; key2<max; key2++) {
        var key3 = key2+1
        let temporaryLeg = {
                departure_airport: selectedAirports[key2],
                destination_airport: selectedAirports[key3]
        }
        legs.push(temporaryLeg)
    }
    console.log(legs)
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer Zjxitbl7VzuoMXlEnoMNw",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "flight",
        passengers: passengers,
        legs: legs,
      }),
    };
    return fetch("https://www.carboninterface.com/api/v1/estimates", options)
        .then((response) => response.json())
        .then((responseText) => {
            console.log("results")
            console.log(responseText.data.attributes)
            return responseText.data.attributes
        })
    
}
