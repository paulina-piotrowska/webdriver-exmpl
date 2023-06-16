describe("Test suite", () => {

	it("First test", async () => {
		await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard");
		const pageTitle = await browser.getTitle();

		expect(pageTitle).toEqual("Appointment Planner - Syncfusion Angular Components Showcase App");
	});

	it("Second test", async () => {
		// click on "Doctors button"
		await $("div.doctors").click();
		// click on "Add New Doctor" button
		await $("//button[text()='Add New Doctor']").click();
		// fill in "Doctor Name" field
		await $("input[name='Name']").setValue("John Doe");
		// click "Save button":
		await $("//button[text()='Save']").click();

		// validate error message
		const emailError = await $("label#Email-info");
		expect(await emailError.getText()).toEqual("Enter valid email");
	});


	it("Third test", async () => {
		// close the "New Doctor" window
		await $("span[class='e-btn-icon e-icon-dlg-close e-icons']").click();
		// click on "Patients" button
		await $("div.patients").click();
		// click into "Search Patient" search field
		await $("input[id='schedule_searchbar']").setValue("Laura");
		// click on "Laura" search result
		await $("//span[@class='patient-name']").click();

		// validate if Patient Name is "Laura"
		const patientName = await $("//span[text()='Laura']");
		expect(await patientName.getText()).toEqual("Laura");
	});

	it("Fourth test", async () => {
		// click "Edit" button
		await $("//button[text()='Edit']").click();
		// update "Email" field
		await $("input[name='Email']").setValue("laura902@mail.com");
		// click on "Save" button
		await $("//button[@class='e-control e-btn e-lib e-normal e-primary']").click();
		// click "Laura" search result again
		await $("//span[@class='patient-name']").click();

		// validate "Email" field has been updated
		const email = await $("span[id='Email']");
		expect(await email.getText()).toEqual("laura902@mail.com");
	});

	it("Test no 5 (basic commands)", async () => {
		// click "Delete" button
		await $("//button[text()='Delete']").click();

		// validate if popup is displayed
		const popup = await $("ejs-dialog[header='Patient Details']");
		console.log(await popup.isDisplayed()); // true

		// validate if "Add New Patient" button is existing and displayed
		const addNewPatientBtn = await $("//button[@class='e-control e-btn e-lib e-normal add-details e-primary']");
		console.log(await addNewPatientBtn.isExisting()); // true
		console.log(await addNewPatientBtn.isDisplayed()); // true

		// validate if "Add New Doctor" button is existing and displayed
		const addNewDoctorBtn = await $("//button[text()='Add New Doctor']");
		console.log(await addNewDoctorBtn.isExisting()); //false
		console.log(await addNewDoctorBtn.isDisplayed()); // false
	});

	it("Test no 6 (basic commands)", async () => {
		// click "Cancel" button
		await $("//button[text()='Cancel']");

		// go to the Dashboard page
		await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard");

		// wait for "Dashboard" button to display before clicking
		const dashboardBtn = await $("div.dashboard");
		await dashboardBtn.waitForDisplayed();

		// click "Patients" button
		await dashboardBtn.click();
	});

	it("Test no 7 (basic commands)", async () => {
		// click "Book Appointments" link
		await $("div[routerLink='/calendar']").click();

		// double click on a slot in calndar
		await $("[data-date='1596351600000']").doubleClick();

		// fill in "PATIENT NAME" field
		await $("input[id='PatientName']").addValue("Laura");

		// click "Save" button
		await $("//button[@class='e-control e-btn e-lib e-primary e-event-save e-flat']").click();

		//validate error message
		const symptomError = await $("label#Symptoms-info");
		expect(await symptomError.getText()).toEqual("Please enter disease Symptoms");
	});

	it("Test no 8 (basic commands)", async () => {
		// click on "+" icon
		await $("//span[@class='e-btn-icon e-icons e-add-icon']");

		// wait for the "New Patient" window to be displayed
		const patientNameField = await $("input[name='Name']");

		// await patientNameField.waitForDisplayed();
		await patientNameField.waitForDisplayed({
			timeout: 1000,
			reverse: true,
			timeoutMsg: 'Sorry, "Patient Name" field is not displayed.',
			interval: 50
		});

		// click "Cancel" button
		await $("//button[text()='Cancel']");

		// fill in "Symptoms" field
		await $("//textarea[@name='Symptoms']").addValue("headache");

		// click "Save" button
		await $("//button[@class='e-control e-btn e-lib e-primary e-event-save e-flat']").click();

		// validate new appointment has been added to the calendar
		const newAppointment = await $("//div[@class='e-subject']");
		expect(await newAppointment.getText()).toEqual("Laura");
	});

	it("Test no 9 (advanced commands)", async () => {
		// execute()
		const dashboardButton = await $("div.dashboard");
		// add red frame border to "Dashboard" button
		await browser.execute(function (dashboardButton) {
			dashboardButton.style.border = "red solid 2px";
		}, dashboardButton);
		await browser.pause(1000);

		// waitUntil() 
		await $("div.dashboard").click();
		await browser.waitUntil(
			async () => (await $("//span[@class='day-event-count']").getText()) === "4",
			{
				timeout: 5000,
				interval: 600,
				timeoutMsg: "Not loaded."
			}
		);

		// browser actions - moveTo()
		const row = await $("//td[@aria-label='Milka column header Name']");
		await row.moveTo();
		await browser.pause(2000);
	});
});