// STEP 1: Plotly
// Use the D3 libary to read in "samples.json" file & parse out the 3 different arrays (names, metadata and samples).

d3.json("samples.json").then(function (data) {
    console.log(data);
    var names = data.names;
    console.log(names);
    //var metadata = data.metadata;
    //console.log(metadata);
    //var samples = data.samples;
    //console.log(samples);
    // Setup drop down menu for Test Subject ID No. using the names array.
    for (var i = 0; i < names.length; i++) {
        var option = d3.select("#selDataset").append("option").text(names[i]);
        console.log(option);
    }
});

function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
    d3.event.preventDefault();

    var dropdownoptions = d3.select("#selDataset");
    var id = dropdownoptions.property("value");
    console.log(id);
    // Filtered data in samples array based on selected Test Subject ID No. 
    d3.json("samples.json").then(function (data) {
        var samples = data.samples;
        console.log(samples)
        var filter_results = samples.filter(sample => sample.id == id);
        console.log(filter_results);
        var subject_results = filter_results[0];
        console.log(subject_results);


        var subject_ids = subject_results.otu_ids;
        var yticks = subject_ids.slice(0, 10).map(subject_id => `OTU ${subject_id}`).reverse();
        var yticks2 = subject_ids.map(subject_id => `OTU ${subject_id}`).reverse();
        var subject_labels = subject_results.otu_labels;
        var subject_values = subject_results.sample_values;

        console.log(subject_ids);
        console.log(yticks);
        console.log(subject_labels);
        console.log(subject_values);

        //Graphed select data as a bar chart.
        var trace1 = {
            x: subject_values.slice(0, 10).reverse(),
            y: yticks,
            text: subject_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 OTUs",
            xaxis: { title: "Relative Abundance" },
            //yaxis: { title: "OTUs" },
            //margin: { t: 30, l: 150 }
        };
        Plotly.newPlot("bar", data1, layout1);

        //Graphed select data as a bubble chart.
        var trace2 = {
            x: yticks2,
            y: subject_values,
            text: subject_labels,
            mode: "markers",
            marker: {
                color: yticks2,
                colorscale: "Earth",
                opacity: 0.8,
                size: subject_values,
                sizeref: 0.4,
                sizemode: "area"
            },
        };

        var data2 = [trace2];

        var layout2 = {
            title: "All OTUs On A Test Subject's Navel ",
            yaxis: { title: "Relative Abundance" },
            showlegend: false,
            height: 800,
            width: 1200
        };
        Plotly.newPlot("bubble", data2, layout2);

        //Updated Demographic Info based on select id as a unordered list.
        //Lines 103 and 104 were added to clear out previous demographic info before adding the new id.
        var demoinfo = d3.select("ul");
        demoinfo.html("");
        var newmetadata = data.metadata;
        console.log(newmetadata);
        var filter_metadata = newmetadata.filter(person => person.id == id);
        console.log(filter_metadata);
        var person_metadata = filter_metadata[0];
        console.log(person_metadata);
        var age = d3.select('ul').append('li').text(`AGE: ${person_metadata.age}`);
        var ethnicity = d3.select('ul').append('li').text(`ETHNICITY: ${person_metadata.ethnicity}`);
        var gender = d3.select('ul').append('li').text(`GENDER: ${person_metadata.gender}`);
        var location = d3.select('ul').append('li').text(`LOCATION: ${person_metadata.location}`);
        var bbtype = d3.select('ul').append('li').text(`BBTYPE: ${person_metadata.bbtype}`);
        var wfreq = d3.select('ul').append('li').text(`WFREQ: ${person_metadata.wfreq}`);
        var sample = d3.select('ul').append('li').text(`SAMPLE ID: ${person_metadata.id}`);

        //OPTIONAL: Graphed Wfreq data as a gauge chart.
        var person_wfreq = parseInt(person_metadata.wfreq);
        var data3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: person_wfreq,
                title: { text: "Washing Frequency (WFREQ)" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [0, 9] }
                }
            }
        ];

        var layout3 = { margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data3, layout3);
    });
}


