let mean_d = 0;
let velocity;
function activity4() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle('Determination of ultrasonic waves velocity in liquid media', 3);
    let table1_col_headings = ['Sr No.', 'Main Scale', 'Vernier Scale', 'Actual MSR (no of lines * value of one line)', 'Total reading MSR + (VSR*LC)', "Differnce between Consecutive maxima 'd (cm)'", "Check"];
    let act4_verify_row = [['1', `${table1[0][0]}`, `${table1[0][1]}`, `<input type='text' id='inp1' class='form-control'/>`, `<input type='text' id='inp2' class='form-control'/>`, `<input type='text' id='inp3' class='form-control'/>`, `<input type='button' value='verify' class='btn btn-primary' onclick='verify_act4();' />`]];
    let table_element = new Table(table1_col_headings, act4_verify_row);
    pp.addtoleftpannel(table_element.template);
    table_element.draw();
    calculate_mean();
    let right_panel_text = `
    <div>
    <p>Value of one line => <span style='font-weight: bold; color: blue;'>${val_1_line}</span></p>

    <br>

    <p>Least Count => <span style='font-weight: bold; color: blue;'>${least_count}</span></p>
    </div>
    `;
    pp.showdescription(right_panel_text, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasRight3"));
    bsOffcanvas.show();
}
function calculate_mean() {
    mean_d = 0;
    for (let i = 0; i < 19; i++) {
        mean_d += table1[i][4];
        // console.log(table1[][i]);
    }
    mean_d = mean_d / 19;
    velocity = 2 * mean_d * selected_frequency * 10000;
}
function verify_act4() {
    let val1 = document.getElementById(`inp1`);
    let val2 = document.getElementById(`inp2`);
    let val3 = document.getElementById(`inp3`);
    if (!verify_values(parseFloat(val1.value), table1[0][2])) {
        alert(`please check actual MSR value`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), table1[0][3])) {
        alert(`please check Total reading MSR + (VSR*LC) value`);
        return;
    }
    if (!verify_values(parseFloat(val3.value), table1[0][4])) {
        alert(`please check Differnce between Consecutive maxima 'd' value`);
        return;
    }
    alert('All Entered Values are correct!!');
    let right_panel_text = `
        <h4>Calculate and Verify the below values</h4>

        <br>

        <p>Mean d</p>
        <input type="text" id="mean-d">

        <br><br>

        <p>Velocity of Ultrasonic Waves, V = &lambda; * F</p>
        <input type="text" id='velocity-inp'>

        <br><br>

        <button id='act4_last_btn' class='btn btn-primary' onclick='act4_verify2();'>Verify</button>
    `;
    pp.showdescription(right_panel_text, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasRight3"));
    bsOffcanvas.show();
}
function act4_verify2() {
    let val1 = document.getElementById(`mean-d`);
    let val2 = document.getElementById(`velocity-inp`);
    if (!verify_values(parseFloat(val1.value), mean_d)) {
        alert(`please check actual MSR value`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), velocity)) {
        alert(`please check Total reading MSR + (VSR*LC) value`);
        return;
    }
    alert('Successfully Verified!!');
    pp.clearleftpannel();
    val1.value = mean_d.toFixed(4);
    val1.disabled = true;
    val2.value = velocity.toFixed(2);
    val2.disabled = true;
    document.getElementById('act4_last_btn').remove();
}
//# sourceMappingURL=activity4.js.map