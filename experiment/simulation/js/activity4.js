let mean_d = 0;
let velocity;
let cal_velocity;
function activity4() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    // canvas1.removeEventListener('click', a3_mouseclick_left_btn);
    // canvas1.removeEventListener('click', a3_mouseclick_right_btn);
    canvas1.removeEventListener('mousedown', left_btn_down);
    canvas1.removeEventListener('mousedown', right_btn_down);
    canvas1.removeEventListener('mouseup', left_btn_up);
    canvas1.removeEventListener('mouseup', right_btn_up);
    pp.showtitle(`<p id="exp-title">Determination of ultrasonic waves velocity in liquid media<p>`, 3);
    let table1_col_headings = [
        'Sr No.',
        'Main Scale',
        'Vernier Scale',
        'Actual MSR (no of lines * value of one line)',
        'Total reading MSR + (VSR*LC)',
        'Check',
    ];
    let act4_verify_row = [
        [
            '1',
            `${table1[0][0]}`,
            `${table1[0][1]}`,
            `<input type='text' id='inp1' class='form-control'/>`,
            `<input type='text' id='inp2' class='form-control'/>`,
            `<input type='button' value='verify' class='btn btn-primary' onclick='verify_act4();' />`,
        ],
    ];
    let table_element = new Table(table1_col_headings, act4_verify_row);
    pp.addtoleftpannel(table_element.template);
    table_element.draw();
    calculate_mean();
    let right_panel_text = `
   <p class='discription_text'>Calculate the data for table</p>

    <div class='discription_text'>
    <p>Value of one line => <span style='font-weight: bold; color: blue;'>${val_1_line}</span></p>

    <br>

    <p>Least Count => <span style='font-weight: bold; color: blue;'>${least_count}</span></p>
    </div>
    `;
    pp.showdescription(right_panel_text, 3);
    var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight3'));
    bsOffcanvas.show();
}
function calculate_mean() {
    mean_d = 0;
    for (let i = 0; i < 19; i++) {
        mean_d += table1[i][4];
        // console.log(table1[][i]);
    }
    mean_d = mean_d / 19;
    // velocity = 2 * mean_d * selected_frequency * 10000;
    for (let i = 0; i < waves.length; i++) {
        if (waves[i].fluid == selected_fluid) {
            velocity = waves[i].velocity;
            break;
        }
    }
}
function verify_act4() {
    let val1 = (document.getElementById(`inp1`));
    let val2 = (document.getElementById(`inp2`));
    if (!verify_values(parseFloat(val1.value), table1[0][2])) {
        alert(`Please check actual MSR value`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), table1[0][3])) {
        alert(`Please check Total reading MSR + (VSR*LC) value`);
        return;
    }
    // alert('All Entered Values are correct!!');
    // pp.showdescription(
    // 	'All entered values are correct click on next to see data table',
    // 	3
    // );
    pp.showdescription(`<p class='discription_text'>All entered values are correct, click on next to see data table.</p>`, 3);
    pp.addtorightpannel(`<button id='panel1_btn' class='btn btn-primary' onclick='load_table();' style="bottom:12.5%">Next</button>`, 3);
    show_panel(3);
}
function act4_verify2() {
    let val1 = (document.getElementById(`mean-d`));
    let val2 = (document.getElementById(`velocity-inp`));
    cal_velocity = parseFloat(val2.value);
    console.log('mean_d = ', mean_d);
    console.log('velocity = ', velocity);
    if (!verify_values(parseFloat(val1.value), mean_d)) {
        alert(`Please check Mean d value`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), velocity)) {
        alert(`Please check Velocity of Ultrasonic Waves value`);
        return;
    }
    // alert('Successfully Verified!!');
    // pp.clearleftpannel();
    val1.value = mean_d.toFixed(4);
    val1.disabled = true;
    val2.value = velocity.toFixed(2);
    val2.disabled = true;
    document.getElementById('act4_last_btn').remove();
    // activity5();
    pp.showdescription(`<p class='discription_text'>Successfully Verified!!</p>`, 3);
    pp.addtorightpannel(`<button id='panel1_btn' class='btn btn-primary' onclick='activity5();' style="bottom:12.5%">Next</button>`, 3);
    show_panel(3);
}
function load_table() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    // document.getElementById('panel1_btn').remove();
    let heading_col = [
        'Sr No.',
        'Main Scale',
        'Vernier Scale',
        'Actual MSR (no of lines * value of one line)',
        'Total reading MSR + (VSR*LC)',
        "Differnce between Consecutive maxima 'd (cm)'",
    ];
    let data_table = [];
    for (let i = 0; i < table1.length; i++) {
        let data = [];
        data[0] = i + 1;
        for (let j = 0; j < table1[i].length; j++) {
            if (j == 0 || j == 1) {
                data.push(table1[i][j]);
                continue;
            }
            data.push(table1[i][j].toFixed(4));
        }
        data_table.push(data);
    }
    let table = new Table3(heading_col, data_table);
    pp.addtoleftpannel(table.template);
    table.draw();
    let right_panel_text = `
        <div class='discription_text'>
        <h4>Calculate and Verify the below values</h4>

        <br>

        <p>Mean d</p>
        <input type="text" id="mean-d">

        <br><br>

        <p>Velocity of Ultrasonic Waves, V = &lambda; * F</p>
        <input type="text" id='velocity-inp'>

        </div>
        <br><br>
        
        <button id='act4_last_btn' class='btn btn-primary' onclick='act4_verify2();' style="position: absolute;
        bottom: 12.5%;">Verify</button>
    `;
    pp.showtitle(`<p id="exp-title">Determination of ultrasonic waves velocity in liquid media<p>`, 3);
    pp.showdescription(right_panel_text, 3);
    // show_panel(3);
}
// activity4();
//# sourceMappingURL=activity4.js.map