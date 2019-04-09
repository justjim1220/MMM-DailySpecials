# MMM-DailySpecials

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

The module is based on the default compliment & MMM-kudos modules. MMM-DailySpecials displays 'special out of a set of predefined ones. Depending on the current day the used special set can be defined.

## Screenshots

![ScreenShot](https://github.com/justjim1220/MMM-DailySpecials/blob/master/Screenshot%20(43).png)

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-DailySpecials',
            position: "middle_center",
            config: {
                // OPTIONAL - See below for configurable options
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `daymap`         | A map which defines the start days of specials sets.
| `shrinkLimit`    | Length of special at which a smaller font is used to display it.
| `classes`        | *Optional* CSS classes used to display the kudo.
| `shrinkClasses`  | *Optional* CSS classes used to shrink the kudo.
| `updateInterval` | How often does the kudo have to change? (Milliseconds) <br><br> **for daily use `86400000` <br> **Default value:** `86400000` (24 hours or 1 day)
| `fadeSpeed`      | Speed of the update animation. (Milliseconds) <br><br> **Possible values:**`0` - `5000` <br> **Default value:** `500` (1/2 second)
| `specials`       | The list of specials. <br><br> **Possible values:** An object with some arrays - the names are defined in the values of the _hourmap object_ plus the default array `anytime`. See _specials configuration_ below. <br> **Default value:** See _specials configuration_ below.
| `remoteFile`     | External file from which to load the kudos <br><br> **Possible values:** Path to a JSON file containing kudos, configured as per the value of the _specials configuration_ (see below).<br> **Default value:** `null` (Does not load from file)


````javascript
config: {
  daymap: {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday"
},
    shrinkLimit: 35,
    special: {
        Sunday: [
            "$5 Lomg Island Iced Tea"
        ],
        Monday: [
            "$1.50 Shots"
        ],
        Tuesday: [
            "$2 Jello Shots"
        ],
        Wednesday: [
            "Ladies Night - Screaming Orgasm - $3"
        ],
        Thursday: [
            "Throwback Thursday - $1 draws!"
        ],
        Friday: [
            "Friday Fight Night - $4 Zombie"
        ],
        Saturday: [
            "$2 Can Beer"
        ]
    },
  updateInterval: 86400000, // 24 hours OR 1 day
  remoteFile: null,
  fadeSpeed: 500
}
````
