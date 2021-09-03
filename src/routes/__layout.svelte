<script>
	import { browser } from '$app/env';
	import '../app.css';

	if (browser) {
		Promise.all([import('firebase/app'), import('firebase/analytics')]).then(
			([{ initializeApp }, { getAnalytics, logEvent }]) => {
				const app = initializeApp({
					apiKey: 'AIzaSyAOvJsv30R-sdRV1ekuU4uvJqOnUWJondI',
					authDomain: 'hololive-music.firebaseapp.com',
					projectId: 'hololive-music',
					storageBucket: 'hololive-music.appspot.com',
					messagingSenderId: '468454566898',
					appId: '1:468454566898:web:678f4b5a3b875d8cdc996b',
					measurementId: 'G-SYBPTKVGYL'
				});
				const analytics = getAnalytics(app);
				logEvent(analytics, 'page_view');
			}
		);
	}
</script>

<slot />
