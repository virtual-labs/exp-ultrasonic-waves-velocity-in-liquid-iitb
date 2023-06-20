var first_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity4();" style=" position: absolute; bottom: 8vh; width: 85%;">Next</button>`;
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle('Determination of ultrasonic waves velocity in liquid media', 3);
    let left_panel_text = `
    <div id="act3-left-content">

    <div>
        <label for="">Select Fluid</label>
        <Select onchange='set_fluid();' id='fluid-dd' class="form-select">
            <option value="">--Select--</option>
        </Select>
    </div>

    <div>
        <label for="">Select Frequency</label>
        <Select onchange='set_frequency();' disabled id='frequency-dd' class="form-select">
            <option value="">--Select--</option>
        </Select>
    </div>

    <div>
        <label for="">Vernier Calliper</label>
        <input disabled type="range" min='1' max='20' step='1' value="1" id='range' onchange="set_readings();" oninput="set_readings();">

        <br>

        <label for="">Main Scale Reading</label>
        <input disabled type='text' class='form-control' style="display: inline !important; width: 30%; margin-left: 5%;"  id='ms-reading'>

        <br> <br>

        <label for="">Vernier Scale Reading</label>
        <input disabled type="text" class='form-control'  style="display: inline !important; width: 30%; margin-left: 5%;"  id='vs-reading'>

       
        </div>

        </div>


    `;
    pp.addtoleftpannel(left_panel_text);
    load_fluid();
}
function load_fluid() {
    let fluid_sel = document.getElementById('fluid-dd');
    fluid_sel.innerHTML = `<option value=''>--Select--</option>`;
    for (let i = 0; i < data.length; i++) {
        fluid_sel.innerHTML += `<option value='${data[i].fluid}'>${data[i].fluid}</option>`;
    }
}
function set_fluid() {
    let fluid_sel = document.getElementById('fluid-dd');
    let freq_sel = document.getElementById('frequency-dd');
    if (fluid_sel.value) {
        freq_sel.innerHTML = `<option value=''>--Select--</option>`;
        selected_fluid = fluid_sel.value;
        for (let i = 1; i <= 5; i++) {
            freq_sel.innerHTML += `<option value='${i}'>${i} MHz</option>`;
        }
        freq_sel.disabled = false;
    }
    else {
        freq_sel.disabled = true;
    }
}
function set_frequency() {
    let fluid_sel = document.getElementById('fluid-dd');
    let freq_sel = document.getElementById('frequency-dd');
    let slider = document.getElementById('range');
    if (freq_sel) {
        selected_frequency = parseInt(freq_sel.value);
        slider.disabled = false;
        set_table1();
        //add std deviation
        add_std_deviation();
        calculate_table1();
    }
    else {
        slider.disabled = true;
    }
}
function add_std_deviation() {
    for (let i = 0; i < table1.length; i++) {
        table1[i][1] = parseFloat(std_deviation(table1[i][1]).toFixed(1));
    }
}
function set_readings() {
    let slider = document.getElementById('range');
    let label1_val = document.getElementById('ms-reading');
    let label2_val = document.getElementById('vs-reading');
    label1_val.value = table1[parseInt(slider.value) - 1][0];
    label2_val.value = table1[parseInt(slider.value) - 1][1];
    pp.showdescription('Click on the Next button', 3);
    pp.addtorightpannel(first_btn, 3);
}
activity3();
//# sourceMappingURL=activity3.js.map