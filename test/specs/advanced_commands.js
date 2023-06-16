describe("Advanced commands", () => {
	beforeEach(async () => {
		await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard");

		// URL for 'waitUntil' test:
		//await browser.url("https://ej2.syncfusion.com/react/demos/progress-bar/semi-circular/");

		// URL for 'perform actions' test:
		// await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/calendar");
	});

	/**
	 * execute()
	 */

	it("execute() command with parameters", async () => {
		const doctor = await $("a[href='#/doctor-details/5']");
		await browser.execute(function (doctor) {
			doctor.style.border = "red solid 2px";
		}, doctor);
		await browser.pause(3000);
	});


	/**
	 * executeAsync()
	 */

	it("executeAsync() command with parameters", async () => {
		const doctor = await $("a[href='#/doctor-details/5']");
		await browser.executeAsync(function (doctor, done) {
			setTimeout(() => {
				doctor.style.border = "red solid 2px";
				done();
			}, 2000);
		}, doctor);
		await browser.pause(3000);
	});


	/**
	 * waitUntil()
	 */

	it("waitUntil() command", async () => {
		await $("#reLoad").click();
		await browser.waitUntil(
			async () => (await $("#point1").getText()) === "100%",
			{
				timeout: 5000, // if set to '1000' (1 second) will throw an error "Not loaded."
				interval: 600,
				timeoutMsg: "Not loaded."
			}
		);
	});


	/**
	 * setCookies()
	 */

	it("setCookies() command", async () => {
		await browser.pause(5000);
		await browser.setCookies([
			{
				name: "customCookie",
				value: "42",
			},
		]);
		await browser.pause(10000);
	});


	/**
	 * getCookies()
	 */

	it("getCookies() command", async () => {
		await browser.setCookies([
			{
				name: "customCookie",
				value: "42",
			}
		]);
		const cookie = await browser.getCookies(["customCookie"]);
		console.log("cookie value: ");
		console.dir(cookie);
		// Output:
		// [
	    //    {
		//      domain: 'ej2.syncfusion.com',
		//      httpOnly: false,
		//      name: 'customCookie',
		//      path: '/',
		//      sameSite: 'Lax',
		//      secure: true,
		//      value: '42'
		//    }
		// ]
	});


	/**
	 * deleteCookies()
	 */

	it("deleteCookies() command", async () => {
		await browser.setCookies([
			{
				name: "customCookie",
				value: "42",
			}
		]);
		await browser.pause(10000);
		await browser.deleteCookies(["customCookie"]);
		await browser.pause(10000);
	});


	/**
	 * local/session storage
	 */

	it("local/session storage", async () => {
		const key = "localStorageKey";
		const value = "localStorageValue";
		
		await browser.execute(function (key, value) {
		  window.localStorage.setItem(key, value);
		}, key, value);
		
		const readValue = await browser.execute(function (key) {
		  return window.localStorage.getItem(key);
		}, key);
	});


	/**
	 * Actions:
	 * - doubleClick()
	 * - dragAndDrop()
	 * - moveTo()
	 */

	it("mouse move", async () => {
		const row = await $("div.e-responsive-header table[role=grid] tbody tr:first-child");
		await row.moveTo();
		await browser.pause(5000);
	});

	it("perform actions", async () => {
		const slot1 = await $("[data-date='1596319200000']");
		const slot2 = await $("[data-date='1596405600000']");
		const SHIFT = "\uE008";
		await slot1.click();
		await browser.performActions([
			{
				type: "key",
				id: "keyboard",
				actions: [
					{
						type: "keyDown",
						value: SHIFT
					},
				],
			},
		]);
		await slot2.click();
		await browser.pause(500);
		await browser.performActions([
			{
				type: "key",
				id: "keyboard",
				actions: [
					{
						type: "keyUp",
						value: SHIFT
					},
				],
			},
		]);
		await browser.releaseActions();
		await browser.pause(5000);
	});


	/**
	 * getAtribute - attribute is a value set in HTML document
	 * getProperty - property is a value of DOM (Domain Object Model)
	 */

	it("getAttribute() command", async () => {
		const element = await $("a[href='#/doctor-details/5']");
		const href = await element.getAttribute("href");
		console.log(href); // #/doctor-details/5
	});

	it("getProperty() command", async () => {
		const element = await $("a[href='#/doctor-details/5']");
		const href = await element.getProperty("href");
		console.log(href); // https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/doctor-details/5
	});

});