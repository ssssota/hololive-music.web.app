<script>
	import { browser } from '$app/env';
	import { initializeApp } from 'firebase/app';
	import { getAnalytics, logEvent } from 'firebase/analytics';
	import '../app.css';

	if (browser) {
		const firebaseConfig = {
			apiKey: 'AIzaSyAOvJsv30R-sdRV1ekuU4uvJqOnUWJondI',
			authDomain: 'hololive-music.firebaseapp.com',
			projectId: 'hololive-music',
			storageBucket: 'hololive-music.appspot.com',
			messagingSenderId: '468454566898',
			appId: '1:468454566898:web:678f4b5a3b875d8cdc996b',
			measurementId: 'G-SYBPTKVGYL'
		};

		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
		logEvent(analytics, 'page_view');
	}
</script>

<slot />
