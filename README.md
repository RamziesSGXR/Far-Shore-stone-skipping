# Far Shore

A calm, first-person stone-skipping game. You flick a stone out over the water, and every place it touches becomes a ripple you can hop to. Walk out from a lake shore, across an open ocean, to a far shore, then turn back and do it again.

There are no words on screen: a start button, a sound button, and the water.

## Three ways to get it onto a phone

### 1. Play it live from GitHub (Android and iPhone)

Turn on GitHub Pages for this repository:

1. On GitHub, open **Settings**, then **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then **Save**.

After a minute or two the game is live at:

`https://ramziessgxr.github.io/Far-Shore-stone-skipping/`

### 2. Install it from that link (no app store)

The live page is an installable web app. Once installed it opens full screen from its own icon and works offline.

- **Android (Chrome):** open the link, tap the sound button, then the download arrow in the panel. Or use Chrome's menu and choose **Install app** or **Add to Home screen**.
- **iPhone (Safari):** open the link, tap **Share**, then **Add to Home Screen**. iPhones do not let a page offer its own install button, so the download arrow does not appear there.

### 3. A real Android app file (APK)

`.github/workflows/android.yml` builds an Android app on every push to `main` and attaches it to a release called **Latest Android build**. Open the repository's **Releases** page on an Android phone, download `far-shore.apk`, and open it to install. Android will ask you to allow installs from your browser the first time.

The first build succeeded. The APK itself has not been installed on a phone yet. If a later build fails, the **Actions** tab shows the step that failed.

Each build is signed with the same test key (`keystore/test-builds.keystore`), so a new download installs over the old one and keeps your place. That key is public in this repository, which is fine for test builds but must not be used for a store release.

### A real iPhone app

Apple only allows iPhone apps to be installed through the App Store or TestFlight, and building one needs a Mac with Xcode and a paid Apple Developer account. With those:

```
npm install
npm run add:ios
npm run ios
```

That opens the project in Xcode, where you choose your team and run it on a phone or archive it for TestFlight.

## Building the Android app yourself

Needs Node 22 or newer, JDK 21, and Android Studio.

```
npm install
npm run add:android     # creates android/ with icons and splash screens
npm run android         # copies the web app in and opens Android Studio
```

After changing the game, `npm run sync` copies the new web files into the native projects.

Before publishing to a store, change `appId` in `capacitor.config.json` from `com.farshore.app` to an ID you own. It cannot be changed after the first store release.

## How it is put together

| Path | What it is |
| --- | --- |
| `index.html` | The whole game: page, styles, shaders and script. |
| `three.min.js` | three.js r128 (MIT licence), kept in the repo so the game needs no network. |
| `manifest.webmanifest`, `sw.js`, `icons/` | What makes the live page installable and able to run offline. |
| `capacitor.config.json`, `package.json`, `scripts/` | The Capacitor wrapper that packages the same web app for Android and iOS. |
| `assets/` | Source images that the icon and splash screens are generated from. |
| `www/`, `android/`, `ios/` | Generated. Not kept in the repo. |

## Playing

- **Throw:** touch the stone at the bottom of the screen, drag, and flick upward. Let go while your finger is still moving.
  - Flick speed is the stone's speed.
  - Releasing lower on the screen throws flatter. Releasing higher lofts it farther.
  - A curve at the end of the flick adds spin, which keeps the stone stable and hooks its path.
- **Hop:** tap anywhere off the stone to hop to the next ripple. A slower, gentler press glides. Long gaps are crossed in a run of skims.
- **Look:** drag sideways anywhere off the stone.
- **Rest:** land a stone on a boat or island, or tap when one is close, to step onto it.
- **Sound:** the button in the corner opens three sliders: overall volume, chimes and bells, and water, wind and weather. The round arrow in the same panel starts the journey again; press it twice.

Your place on the crossing and your sound settings are saved on the device.

On a keyboard: Space throws or hops, Arrow Up always throws, Enter steps onto something close.

## What is in it

- **Skipping physics** modelled on the published stone-skipping experiments: a stone rebounds only above a minimum speed, that speed is lowest when the stone's face is tilted about 20 degrees to the water, it never rebounds past about 45 degrees, and spin is what holds the tilt steady.
- **Wind waves** that run downwind with long crests, and an ocean swell that lifts the water, the boats and you as it passes.
- **A crossing** with plain sand islands in the shallows near each shore and boats out at sea: skiffs, rafts, sloops, houseboats and lit fishing boats. Stepping aboard rings the ship's bell and lights the boat's lamps. Some have a cat.
- **Bell buoys** between boats, a lighthouse, cairn and fire on the far shore, and a fire on the home shore.
- **Weather and time:** dawn, day, dusk and night cycle as you go. Squalls bring heavy cloud, rain, sheet lightning and far-off thunder, and a rainbow afterwards when the sun is behind you.
- **Night skies:** stars, shooting stars, and northern lights far from land, all reflected in the water.
- **Company:** fish, birds, dolphins, flying fish, a turtle, glowing jellyfish at night, and now and then a whale.
- **Sound** synthesised in the page: chimes, splashes, wind, rain, thunder, bells and whale song.

## Tuning

Everything is in the one script inside `index.html`. The numbers most worth changing:

| Name | What it does |
| --- | --- |
| `CROSS` | Distance between the two shores, in metres. 4000 is roughly a 30 to 45 minute crossing. |
| `MAXHOP` | Longest single hop, in metres, before a gap becomes a run of skims. |
| `KEYS` | Sky, water and light colours for dawn, day, dusk and night. |
| `SW` | Wavelength, direction and weight of the two ocean swell trains. |
| `WAVES` | The short wind-driven waves. |
| `contact()` | The skip model: speed loss, restitution, tilt wobble and spin hook. |

## Known limits

- On iPhone, sound made by a web page is silenced by the ring/silent switch. A native iOS build can change that with an audio-session plugin; it is not set up yet.
- The Android APK builds on GitHub but has not been run on a device yet. The iOS project has not been built.
- Each kind of event (boat, animal, weather) has one form, and they repeat over a long session.
