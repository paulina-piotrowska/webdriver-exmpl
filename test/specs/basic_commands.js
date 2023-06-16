describe("Basic commands", () => {
	beforeEach(async () => {
		await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard");
	});

	/**
	* $ - is a short way to call the findElement command
	* in order to fetch a single element on the page similar
	* to the $ command from the browser scope.
	* The difference when calling it from an element scope is that
	* the driver will look within the children of that element.
	* If the element is not found on the page, the command will throw an Error.
	*/

	it("$ command", async () => {
		const baseElement = await $(".specialist-display");
		const childrenElement = await baseElement.$("#Specialist_1");
		childrenElement.click();
		// OR
		const element = await $(".specialist-display").$("Specialist_1");
		console.log(element);
	});


	/**
	* $$ - short way to call the findElement command
	* in order to fetch a multiple elements that will be returned as an array of elements.
	* The difference when calling it from an element scope is that the driver will look within the children of that element.
	* If the element is not found on th epage, the command will return an empty array.
	*
	*/

	it.only("$$ command", async () => {
		const baseElement = await $(".dock");
		const childrenElements = await baseElement.$$(".sidebar-item");
		console.log(childrenElements);
		// OR
		const elements = await $(".dock").$$(".sidebar-item");
		confirm.log(elements);
	});


	/**
	* click - scrolls to and then click at the center of selected element.
	* This method have optional object parameter 'options', that consists of parameters which allow to configure method:
	* - options.button (Number) - which mouse button should be clicked [0, "left", 1, "middle", 2, "right"]
	* - options.x (Number) - the number of horizontal pixels from the center of an element
	* - options.y (Number) - the number of vertical pixels from the center of an element
	*/

	it("click command", async () => {
		await $(".specialist-display").click();

		await $(".specialist-display").click({
			button: "2",
			x: 20,
			y: 3
		});
	});


	/**
	* setValue - clears value of an element and sends a new value (sequence of key strokes) to it.
	* Value could be a string, number or an array of strings and numbers.
	*/

	it.only("setValue command", async () => {
		const doctorsButton = await $("div[routerLink='/doctors']");
		const addNewDoctorButton = await $(".specialization-types button.e-control");
		const doctorNameInput = await $("#Name input");
		await doctorsButton.click();
		await addNewDoctorButton.click();

		await doctorNameInput.setValue("John Doe");

		await browser.pause(5000);
	});


	/**
	 * addValue - adds a value to an element (not clears it before).
	 * Value could ne a string, number or an array of string and numbers.
	 */

	it.only("addValue command", async () => {
		const doctorsButton = await $("div[routerLink='/doctors']");
		const addNewDoctorButton = await $(".specialization-types button.e-control");
		const doctorNameInput = await $("#Name input");
		await doctorsButton.click();
		await addNewDoctorButton.click();

		await doctorNameInput.setValue("John Doe");
		await doctorNameInput.addValue(" Test");

		await browser.pause(5000);
	});


	/**
	 * isDisplayed returns true if the selected DOM-element is displayed.
	 * But WDIO will not wait for the element to exist to execute this command.
	 */

	it.only("isDisplayed command", async () => {
		const doctorsButton = await $("div[routerLink='/doctors']");
		const doctorNameInput = await $("#Name input");
		console.log(await doctorsButton.isDisplayed()); // true
		console.log(await doctorNameInput.isDisplayed()); // false
	});


	/**
	 * isExisting returns true if element exists in the DOM,
	 * even if the element is not visible on the page.
	 */

	it.only("isExisting command", async () => {
		const addNewDoctorDialog = $(".new-doctor-dialog");
		console.log(await addNewDoctorDialog.isDisplayed());
		console.log(await addNewDoctorDialog.isExisting());
	});


	/**
	 * waitForDisplayed - waits for an element for the provided amount of milliseconds to be displayed or not.
	 * If the element was not found within provided timeout, then the error is thrown.
	 * This method has optional object parameter 'options', that consists of the following items:
	 * Parameters (Options):
	 * - options.timeout (optional) (Number) - time in ms (default: 500)
	 * - options.reverse (optional) (Boolean) - if true it waits for the opposite (default: false)
	 * - options.timeoutMsg (optional) (String) - if exists it overrides the default error message
	 * - options.interval (optional) (Number) - interval between checks (default: waitforInterval)
	 */

	it.only("waitForDisplayed command", async () => {
		const doctorsButton = await $("div[routerLink='/doctors']");

		await doctorsButton.waitForDisplayed();
		await doctorsButton.waitForDisplayed({
			timeout: 1000,
			reverse: true,
			timeoutMsg: "Sorry, the element is not displayed.",
			interval: 50
		});
	});


	/**
	 * waitForExist - waits for an element for the provided amount of milliseconds to be present or not.
	 * If the element was not found within provided timeout, then the error is thrown.
	 * This method has optional object parameter 'options', that consists of the following items:
	 * Parameter (Options):
	 * - options.timeout (optional) (Number) - time in ms (default: 500)
	 * - options.reverse (optional) (Boolean) - if true it waits for the opposite (default: false)
	 * - options.timeoutMsg (optional) (String) - if exists it overrides the default error message
	 * - options.interval (optional) (Number) - interval between checks (default: waitforInterval)
	 */

	it.only("waitForExist command", async () => {
		const doctorsButton = await $("div[routerLink='/doctors']");

		await doctorsButton4.waitForExist();
		await doctorsButton.waitForExist({
			timeout: 1000,
			reverse: true,
			timeoutMsg: "Sorry, the element is not present.",
			interval: 50
		});
	});

});