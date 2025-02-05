function activity5() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle(`<p id="exp-title">Determination of ultrasonic waves velocity in liquid media<p>`, 3);
    // show_panel(3);
    let left_panel_text = `
   <div id="band-gap-text">

    <h3>The experimental value of velocity of ultrasonic waves in ${selected_fluid} = <span style="color: blue;">${cal_velocity}</span> m/sec</h3>   

    </div>
    <br>

   <h3>Velocity of ultrasonic waves in ${selected_fluid} = <span style="color: blue;">${velocity}</span> m/sec</h3>

   <br>

   <div>

     <h3>Is calculated velocity greater than standard velocity?</h3>

     <label for="radio-1">Yes</label>
     <input id='radio-1' style="display: inline; width: 10%;" type="radio" name="ans">

     <br>

     <label for="radio-2">No</label>
     <input id='radio-2' style="display: inline; width: 10%;" type="radio" name="ans">

     <button class="btn btn-primary" type='button' onclick='compare_velocity();' style="position:absolute; left:47vw; top:40vw;">Submit</button>
     </div>
   `;
    pp.addtoleftpannel(left_panel_text);
}
function compare_velocity() {
    let ra1 = (document.getElementById('radio-1'));
    let ra2 = (document.getElementById('radio-2'));
    let ans;
    if (cal_velocity > velocity) {
        ans = true;
    }
    else {
        ans = false;
    }
    if (ra1.checked && ans) {
        alert('Correct Answer!!');
    }
    else if (ra2.checked && !ans) {
        alert('Correct Answer!!');
    }
    else {
        alert('Your Answer is incorrect, please the values again.');
    }
    console.log(ra1.checked);
    console.log(ra2.checked);
}
//# sourceMappingURL=activity5.js.map