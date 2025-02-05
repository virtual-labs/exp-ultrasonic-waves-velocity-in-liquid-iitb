var first_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity4();" style="bottom:12.5%" >Next</button>`;
let canvas1;
let canvas2;
let canvas3;
let canvas4;
let context1;
let context2;
let context3;
let context4;
let scene1;
let right_btn;
let left_btn;
let range = 0;
var arw;
var scale_1;
var scale_2;
var small_scale_1;
var small_scale_2;
var main_scale;
var vernier_scale;
var small_vernier_scale;
var left_cir;
var right_cir;
var click = 0;
let clicks_ar = [];
let check_cir;
// let fac_y = 0.23914101646385108;
// let small_fac_y = 0.04220104166666667;
// let fac_x = 8.356191839656406;
var left_hold_id;
var right_hold_id;
// let dial_setup = [
// 	//x,y,stang
// 	[470, 216, 325],
// 	[476, 227, 355],
// 	[487, 233, 25],
// 	[501, 233, 60],
// 	[511, 226, 89],
// 	[516.5, 217, 114],
// ];
let all_canvas = `
<canvas id="mycanvas1">

</canvas>

<canvas style="position: absolute; left:48.85vw; top:7.5vw;  " id="mycanvas2">

</canvas>
<canvas style="position: absolute; left:62vw; top: 1.5vw; border:0.25vw solid black;" id="mycanvas3">

</canvas>
<canvas style="position: absolute; left:64.4vw; top: 18.5vw; " id="mycanvas4">

</canvas>
`;
let all_inputs = `
<div style="position:absolute">

<div>
    <label for="" style=" font-size:1.1vw;position:absolute; top:15vw; left:13vw; width:10vw;" >Select Fluid</label>
    <Select onchange='set_fluid();' id='fluid-dd' class="form-select" style="font-size:1.1vw; position:absolute; left:12.5vw; top:17vw; width:10vw;">
        <option value="">--Select--</option>
    </Select>
</div>



<div>
    <label for="" style="font-size:1.1vw; position:absolute; top:15vw; left: 27vw; width: 10vw;">Select Frequency</label>
    <Select disabled onchange='set_frequency();' id='freq-dd' class="form-select" style="font-size:1.1vw; position:absolute; left:26.5vw; top:17vw; width:10vw;">
        <option value="">--Select--</option>
    </Select>
</div>

    </div>
`;
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle(`<p id="exp-title">Determination of ultrasonic waves velocity in liquid media<p>`, 3);
    pp.showdescription(`<p class='discription_text'>Select Fluid</p>`, 3);
    show_panel(3);
    pp.addtoleftpannel(all_inputs);
    pp.addtoleftpannel(all_canvas);
    canvas1 = document.getElementById('mycanvas1');
    canvas2 = document.getElementById('mycanvas2');
    canvas3 = document.getElementById('mycanvas3');
    canvas4 = document.getElementById('mycanvas4');
    // canvas1.style.border = '1px solid blue';
    // canvas2.style.border = '1px solid red';
    context1 = canvas1.getContext('2d');
    context2 = canvas2.getContext('2d');
    context3 = canvas3.getContext('2d');
    context4 = canvas4.getContext('2d');
    // add rect and scene
    canvas1.style.cursor = 'crosshair';
    rect = canvas1.getBoundingClientRect();
    scene1 = new Scene_Canvas(canvas1);
    right_btn = new Chemistry.Polygon(new Chemistry.Point(1060, 510), 20, 3, canvas1);
    right_btn.color = 'red';
    left_btn = new Chemistry.Polygon(new Chemistry.Point(943, 510), 20, 3, canvas1);
    left_btn.color = 'green';
    left_btn.stang = 60;
    left_cir = new Chemistry.Virtual_circle(new Chemistry.Point(943, 510), 20, canvas1);
    // left_cir.color = 'white';
    right_cir = new Chemistry.Virtual_circle(new Chemistry.Point(1060, 510), 20, canvas1);
    // right_cir.color = 'white';
    scene1.addcanvas(canvas2);
    scene1.addcanvas(canvas3);
    scene1.addcanvas(canvas4);
    scene1.add(left_cir);
    scene1.add(right_cir);
    scene1.add(left_btn);
    scene1.add(right_btn);
    window.onload = a3_windowresize;
    window.onresize = a3_windowresize;
    a3_windowresize();
    load_images();
    load_fluid();
}
function a3_windowresize() {
    //canvas size
    a3_canvas_size();
    //canvas mapping
    a3_canvas_mapping();
    //draw scene
    scene1.draw();
}
function a3_canvas_size() {
    canvas1.width = window.innerWidth * 0.91;
    canvas1.height = ((canvas1.width * 1080.0) / 1920) * 0.85;
    lscale = canvas1.width / 1920.0;
    canvas2.width = window.innerWidth * 0.017;
    canvas2.height = window.innerWidth * 0.139;
    // canvas3.width = window.innerWidth * 0.09;
    // canvas3.height = window.innerWidth * 0.09;
    canvas3.width = window.innerWidth * 0.09;
    canvas3.height = window.innerWidth * 0.42;
    canvas4.width = window.innerWidth * 0.046;
    canvas4.height = window.innerWidth * 0.224;
    document.getElementById('leftpannel').style.height =
        canvas1.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
}
function a3_canvas_mapping() {
    context1.translate(0, canvas1.height);
    context1.scale(1, -1);
    context2.translate(0, canvas2.height);
    context2.scale(1, -1);
    context3.translate(0, canvas3.height);
    context3.scale(1, -1);
    context4.translate(0, canvas4.height);
    context4.scale(1, -1);
}
function load_images() {
    var sq = new Chemistry.Custome_image(ammeter, new Chemistry.Point(600, 250), 621, 326, canvas1);
    scene1.add(sq);
    arw = new Chemistry.Custome_image(arrow, new Chemistry.Point(470, 216), 45, 50, canvas1);
    arw.stang = 325;
    scene1.add(arw);
    var sq = new Chemistry.Custome_image(generator, new Chemistry.Point(1000, 350), 188, 532, canvas1);
    scene1.add(sq);
    small_vernier_scale = new Chemistry.Custome_image(screw, new Chemistry.Point(1002, 574), 43, 171, canvas1);
    scene1.add(small_vernier_scale);
    small_scale_1 = new Chemistry.Custome_image(scale_hd, new Chemistry.Point(-36, 15), 396 * 0.25, 108 * 0.25, canvas2);
    scene1.add(small_scale_1);
    small_scale_2 = new Chemistry.Custome_image(scale_hd, new Chemistry.Point(60, 15), 396 * 0.25, 108 * 0.25, canvas2);
    scene1.add(small_scale_2);
    main_scale = new Chemistry.Custome_image(scale_main, new Chemistry.Point(95, 140), 219 * 0.75, 795 * 0.75, canvas3);
    scene1.add(main_scale);
    vernier_scale = new Chemistry.Custome_image(scale_vernier, new Chemistry.Point(93, 300), 171 * 0.71, 681 * 0.71, canvas3);
    scene1.add(vernier_scale);
    scale_1 = new Chemistry.Custome_image(scale_hd, new Chemistry.Point(-134.5, 45), 396 * 0.8, 108 * 0.8, canvas4);
    scene1.add(scale_1);
    scale_2 = new Chemistry.Custome_image(scale_hd, new Chemistry.Point(169.5, 45), 396 * 0.8, 108 * 0.8, canvas4);
    scene1.add(scale_2);
    var line = new Chemistry.Rectangle(0, 50, new Chemistry.Point(75, 5), canvas3);
    scene1.add(line);
    check_cir = new Chemistry.Circle(new Chemistry.Point(1550, 500), 20, canvas1);
    check_cir.color = 'red';
    scene1.add(check_cir);
    var txt = new Chemistry.Geo_Text('Indicator', new Chemistry.Point(1580, 485), canvas1);
    txt.font = '40 Arial';
    scene1.add(txt);
}
function load_fluid() {
    let fluid_sel = (document.getElementById('fluid-dd'));
    fluid_sel.innerHTML = `<option value=''>--Select--</option>`;
    for (let i = 0; i < data.length; i++) {
        fluid_sel.innerHTML += `<option value='${data[i].fluid}'>${data[i].fluid}</option>`;
    }
}
function set_fluid() {
    // canvas1.addEventListener('click', set_frequency);
    let fluid_sel = (document.getElementById('fluid-dd'));
    let freq_sel = (document.getElementById('freq-dd'));
    if (fluid_sel.value) {
        freq_sel.innerHTML = `<option value=''>--Select--</option>`;
        selected_fluid = fluid_sel.value;
        for (let i = 1; i <= 5; i++) {
            freq_sel.innerHTML += `<option value='${i}'>${i} MHz</option>`;
        }
        freq_sel.disabled = false;
        pp.showdescription(`<p class='discription_text'>Select Frequency</p>`, 3);
        show_panel(3);
    }
    else {
        freq_sel.disabled = true;
        pp.showdescription(`<p class='discription_text'>Select Fluid</p>`, 3);
        show_panel(3);
    }
    set_table1();
    calculate_table1();
}
function set_frequency() {
    let freq = (document.getElementById('freq-dd'));
    console.log('set freq invoked');
    if (freq.value == '') {
        pp.showdescription(`<p class='discription_text'>Select Frequency</p>`, 3);
        show_panel(3);
        return;
    }
    console.log('freq= ', freq.value);
    pp.showdescription(`<p class='discription_text'>Take main scale and vernier scale reading.</p>

   <br>

   <p class='discription_text'>Note the reading when indicator truns green.</p>
   <br>
   <p class='discription_text'>Use left and right button beside RF Generator to rotate vernier scale. Click & hold the button for fast rotation.</p>`, 3);
    show_panel(3);
    selected_frequency = parseInt(freq.value);
    // canvas1.addEventListener('click', () => a3_mouseclick_left_btn);
    canvas1.addEventListener('mousedown', left_btn_down);
    canvas1.addEventListener('mouseup', left_btn_up);
    canvas1.addEventListener('touchstart', left_touch_start);
    canvas1.addEventListener('touchend', left_touch_end);
    // console.log('selected_freq', selected_freq);
    set_table1();
    calculate_table1();
    clicks_ar = [];
    clicks_ar = table1.map((data) => 50 * data[0] + data[1]);
    console.log('table', table1);
}
//for button hold
function left_btn_down(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas1.height - (e.clientY - rect.y)) / lscale);
    let fluid = document.getElementById('fluid-dd');
    console.log('left hold invoked');
    if (left_cir.isinside(new Chemistry.Point(x, y))) {
        if (fluid.value != '' && selected_frequency > 0) {
            // canvas1.removeEventListener('click', set_frequency);
            console.log('left button clicked');
            left_hold_id = setInterval(() => {
                // canvas1.addEventListener(
                // 	'click',
                // 	() => a3_mouseclick_right_btn
                // );
                canvas1.addEventListener('mousedown', right_btn_down);
                canvas1.addEventListener('mouseup', right_btn_up);
                right_btn.color = 'green';
                //for scale 1 in zoomed view
                let x1 = scale_1.stpt.x;
                let y1 = scale_1.stpt.y;
                //for scale 2 in zoomed view
                let x2 = scale_2.stpt.x;
                let y2 = scale_2.stpt.y;
                //for vernier scale in zoomed view
                let x_ver = vernier_scale.stpt.x;
                let y_ver = vernier_scale.stpt.y;
                //for scale 1 in zoomed out view
                let small_x1 = small_scale_1.stpt.x;
                let small_y1 = small_scale_1.stpt.y;
                //for scale 2 in zoomed out view
                let small_x2 = small_scale_2.stpt.x;
                let small_y2 = small_scale_2.stpt.y;
                //for vernier scale in zoomed out view
                let small_x_ver = small_vernier_scale.stpt.x;
                let small_y_ver = small_vernier_scale.stpt.y;
                if (y_ver >= 648) {
                    // canvas1.removeEventListener(
                    // 	'click',
                    // 	a3_mouseclick_left_btn
                    // );
                    canvas1.removeEventListener('mousedown', left_btn_down);
                    canvas1.removeEventListener('mouseup', left_btn_up);
                    if (left_btn.color == 'red')
                        return;
                    left_btn.color = 'red';
                    left_btn.draw();
                    clearInterval(left_hold_id);
                    return;
                }
                click++;
                console.log('click', click);
                console.log('y1', y1);
                x1 -= 6.08;
                y1 += 0.174;
                x2 -= 6.08;
                y2 += 0.174;
                y_ver += 0.174;
                small_x1 -= 0.72;
                small_y1 += 0.058;
                small_x2 -= 0.72;
                small_y2 += 0.058;
                small_y_ver += 0.058;
                console.log('y1', y1);
                if (small_x1 <= -84) {
                    small_x1 = small_x2 + 96;
                }
                else if (small_x2 <= -84) {
                    small_x2 = small_x1 + 96;
                }
                if (x1 <= -286.5) {
                    x1 = x2 + 304;
                }
                else if (x2 <= -286.5) {
                    x2 = x1 + 304;
                }
                console.log('ver_y', y_ver);
                small_scale_1.stpt = new Chemistry.Point(small_x1, small_y1);
                small_scale_2.stpt = new Chemistry.Point(small_x2, small_y2);
                small_vernier_scale.stpt = new Chemistry.Point(small_x_ver, small_y_ver);
                scale_1.stpt = new Chemistry.Point(x1, y1);
                scale_2.stpt = new Chemistry.Point(x2, y2);
                vernier_scale.stpt = new Chemistry.Point(x_ver, y_ver);
                if (clicks_ar.indexOf(click) != -1) {
                    check_cir.color = 'green';
                }
                else if (check_cir.color != 'red') {
                    check_cir.color = 'red';
                }
                scene1.draw();
                move_to_activity4();
            }, 200);
        }
    }
}
function left_touch_start(e) {
    let x = Math.round((e.touches[0].clientX - rect.x) / lscale);
    let y = Math.round((canvas1.height - (e.touches[0].clientY - rect.y)) / lscale);
    let fluid = document.getElementById('fluid-dd');
    console.log('left touch invoked');
    if (left_cir.isinside(new Chemistry.Point(x, y))) {
        if (fluid.value != '' && selected_frequency > 0) {
            // canvas1.removeEventListener('click', set_frequency);
            console.log('inside left touch');
            left_hold_id = setInterval(() => {
                canvas1.addEventListener('touchstart', right_touch_start);
                canvas1.addEventListener('touchend', right_touch_end);
                right_btn.color = 'green';
                //for scale 1 in zoomed view
                let x1 = scale_1.stpt.x;
                let y1 = scale_1.stpt.y;
                //for scale 2 in zoomed view
                let x2 = scale_2.stpt.x;
                let y2 = scale_2.stpt.y;
                //for vernier scale in zoomed view
                let x_ver = vernier_scale.stpt.x;
                let y_ver = vernier_scale.stpt.y;
                //for scale 1 in zoomed out view
                let small_x1 = small_scale_1.stpt.x;
                let small_y1 = small_scale_1.stpt.y;
                //for scale 2 in zoomed out view
                let small_x2 = small_scale_2.stpt.x;
                let small_y2 = small_scale_2.stpt.y;
                //for vernier scale in zoomed out view
                let small_x_ver = small_vernier_scale.stpt.x;
                let small_y_ver = small_vernier_scale.stpt.y;
                if (y_ver >= 648) {
                    canvas1.removeEventListener('touchstart', left_touch_start);
                    canvas1.removeEventListener('touchend', left_touch_end);
                    if (left_btn.color == 'red')
                        return;
                    left_btn.color = 'red';
                    left_btn.draw();
                    clearInterval(left_hold_id);
                    return;
                }
                click++;
                console.log('click', click);
                console.log('y1', y1);
                x1 -= 6.08;
                y1 += 0.174;
                x2 -= 6.08;
                y2 += 0.174;
                y_ver += 0.174;
                small_x1 -= 0.72;
                small_y1 += 0.058;
                small_x2 -= 0.72;
                small_y2 += 0.058;
                small_y_ver += 0.058;
                console.log('y1', y1);
                if (small_x1 <= -84) {
                    small_x1 = small_x2 + 96;
                }
                else if (small_x2 <= -84) {
                    small_x2 = small_x1 + 96;
                }
                if (x1 <= -286.5) {
                    x1 = x2 + 304;
                }
                else if (x2 <= -286.5) {
                    x2 = x1 + 304;
                }
                console.log('ver_y', y_ver);
                small_scale_1.stpt = new Chemistry.Point(small_x1, small_y1);
                small_scale_2.stpt = new Chemistry.Point(small_x2, small_y2);
                small_vernier_scale.stpt = new Chemistry.Point(small_x_ver, small_y_ver);
                scale_1.stpt = new Chemistry.Point(x1, y1);
                scale_2.stpt = new Chemistry.Point(x2, y2);
                vernier_scale.stpt = new Chemistry.Point(x_ver, y_ver);
                if (clicks_ar.indexOf(click) != -1) {
                    check_cir.color = 'green';
                }
                else if (check_cir.color != 'red') {
                    check_cir.color = 'red';
                }
                scene1.draw();
                move_to_activity4();
            }, 200);
        }
    }
}
function left_btn_up() {
    clearInterval(left_hold_id);
}
function left_touch_end() {
    clearInterval(left_hold_id);
}
function right_btn_down(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas1.height - (e.clientY - rect.y)) / lscale);
    let fluid = document.getElementById('fluid-dd');
    if (right_cir.isinside(new Chemistry.Point(x, y))) {
        if (fluid.value != '' && selected_frequency > 0) {
            console.log('right button clicked');
            right_hold_id = setInterval(() => {
                // canvas1.addEventListener(
                // 	'click',
                // 	() => a3_mouseclick_left_btn
                // );
                canvas1.addEventListener('mousedown', left_btn_down);
                canvas1.addEventListener('mouseup', left_btn_up);
                left_btn.color = 'green';
                //for scale 1 in zoomed view
                let x1 = scale_1.stpt.x;
                let y1 = scale_1.stpt.y;
                //for scale 2 in zoomed view
                let x2 = scale_2.stpt.x;
                let y2 = scale_2.stpt.y;
                //for vernier scale in zoomed view
                let x_ver = vernier_scale.stpt.x;
                let y_ver = vernier_scale.stpt.y;
                //for scale 1 in zoomed out view
                let small_x1 = small_scale_1.stpt.x;
                let small_y1 = small_scale_1.stpt.y;
                //for scale 2 in zoomed out view
                let small_x2 = small_scale_2.stpt.x;
                let small_y2 = small_scale_2.stpt.y;
                //for vernier scale in zoomed out view
                let small_x_ver = small_vernier_scale.stpt.x;
                let small_y_ver = small_vernier_scale.stpt.y;
                if (y_ver <= 300) {
                    // canvas1.removeEventListener(
                    // 	'click',
                    // 	a3_mouseclick_right_btn
                    // );
                    canvas1.removeEventListener('mousedown', right_btn_down);
                    canvas1.removeEventListener('mouseup', right_btn_up);
                    if (right_btn.color == 'red')
                        return;
                    right_btn.color = 'red';
                    right_btn.draw();
                    clearInterval(right_hold_id);
                    return;
                }
                click--;
                console.log('click', click);
                x1 += 6.08;
                y1 -= 0.174;
                x2 += 6.08;
                y2 -= 0.174;
                y_ver -= 0.174;
                small_x1 += 0.72;
                small_y1 -= 0.058;
                small_x2 += 0.72;
                small_y2 -= 0.058;
                small_y_ver -= 0.058;
                if (small_x2 >= 108) {
                    small_x2 = small_x1 - 96;
                }
                else if (small_x1 >= 108) {
                    small_x1 = small_x1 - 96;
                }
                if (x2 >= 321.5) {
                    x2 = x1 - 304;
                }
                else if (x1 >= 321.5) {
                    x1 = x2 - 304;
                }
                console.log('ver_y', y_ver);
                small_scale_1.stpt = new Chemistry.Point(small_x1, small_y1);
                small_scale_2.stpt = new Chemistry.Point(small_x2, small_y2);
                small_vernier_scale.stpt = new Chemistry.Point(small_x_ver, small_y_ver);
                scale_1.stpt = new Chemistry.Point(x1, y1);
                scale_2.stpt = new Chemistry.Point(x2, y2);
                vernier_scale.stpt = new Chemistry.Point(x_ver, y_ver);
                if (clicks_ar.indexOf(click) != -1) {
                    check_cir.color = 'green';
                }
                else if (check_cir.color != 'red') {
                    check_cir.color = 'red';
                }
                scene1.draw();
                move_to_activity4();
            }, 200);
        }
    }
}
function right_touch_start(e) {
    let x = Math.round((e.touches[0].clientX - rect.x) / lscale);
    let y = Math.round((canvas1.height - (e.touches[0].clientY - rect.y)) / lscale);
    let fluid = document.getElementById('fluid-dd');
    if (right_cir.isinside(new Chemistry.Point(x, y))) {
        if (fluid.value != '' && selected_frequency > 0) {
            console.log('right touch clicked');
            right_hold_id = setInterval(() => {
                canvas1.addEventListener('touchstart', left_touch_start);
                canvas1.addEventListener('touchend', left_touch_end);
                left_btn.color = 'green';
                //for scale 1 in zoomed view
                let x1 = scale_1.stpt.x;
                let y1 = scale_1.stpt.y;
                //for scale 2 in zoomed view
                let x2 = scale_2.stpt.x;
                let y2 = scale_2.stpt.y;
                //for vernier scale in zoomed view
                let x_ver = vernier_scale.stpt.x;
                let y_ver = vernier_scale.stpt.y;
                //for scale 1 in zoomed out view
                let small_x1 = small_scale_1.stpt.x;
                let small_y1 = small_scale_1.stpt.y;
                //for scale 2 in zoomed out view
                let small_x2 = small_scale_2.stpt.x;
                let small_y2 = small_scale_2.stpt.y;
                //for vernier scale in zoomed out view
                let small_x_ver = small_vernier_scale.stpt.x;
                let small_y_ver = small_vernier_scale.stpt.y;
                if (y_ver <= 300) {
                    canvas1.removeEventListener('touchstart', right_touch_start);
                    canvas1.removeEventListener('touchend', right_touch_end);
                    if (right_btn.color == 'red')
                        return;
                    right_btn.color = 'red';
                    right_btn.draw();
                    clearInterval(right_hold_id);
                    return;
                }
                click--;
                console.log('click', click);
                x1 += 6.08;
                y1 -= 0.174;
                x2 += 6.08;
                y2 -= 0.174;
                y_ver -= 0.174;
                small_x1 += 0.72;
                small_y1 -= 0.058;
                small_x2 += 0.72;
                small_y2 -= 0.058;
                small_y_ver -= 0.058;
                if (small_x2 >= 108) {
                    small_x2 = small_x1 - 96;
                }
                else if (small_x1 >= 108) {
                    small_x1 = small_x1 - 96;
                }
                if (x2 >= 321.5) {
                    x2 = x1 - 304;
                }
                else if (x1 >= 321.5) {
                    x1 = x2 - 304;
                }
                console.log('ver_y', y_ver);
                small_scale_1.stpt = new Chemistry.Point(small_x1, small_y1);
                small_scale_2.stpt = new Chemistry.Point(small_x2, small_y2);
                small_vernier_scale.stpt = new Chemistry.Point(small_x_ver, small_y_ver);
                scale_1.stpt = new Chemistry.Point(x1, y1);
                scale_2.stpt = new Chemistry.Point(x2, y2);
                vernier_scale.stpt = new Chemistry.Point(x_ver, y_ver);
                if (clicks_ar.indexOf(click) != -1) {
                    check_cir.color = 'green';
                }
                else if (check_cir.color != 'red') {
                    check_cir.color = 'red';
                }
                scene1.draw();
                move_to_activity4();
            }, 200);
        }
    }
}
function right_btn_up() {
    clearInterval(right_hold_id);
}
function right_touch_end() {
    clearInterval(right_hold_id);
}
function move_to_activity4() {
    pp.showdescription(`<p class='discription_text'>Note the reading when indicator truns green.</p>
      <br>
      <p class='discription_text'>After taking main scale and vernier scale reading, click on the Next button.</p>`, 3);
    pp.addtorightpannel(first_btn, 3);
}
// activity3();
//# sourceMappingURL=activity3.js.map