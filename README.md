# MMM-DailySpecials

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

The module is based on the default compliment & MMM-kudos modules. MMM-DailySpecials displays _special_ out of a set of predefined ones. Depending on the current day the used special set can be defined.

## Screenshots

![ScreenShot](https://github.com/justjim1220/MMM-DailySpecials/blob/master/Screenshot%20(43).png)

## Installing this module:

$ cd MagicMirror<br>
$ cd modules<br>
$ git clone https://github.com/justjim1220/MMM-DailySpecials.git<br>
$ cd MMM-DailySpecials<br>
$ npm i<br>


## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
    modules: [
        {
            disabled: false,
            module: "MMM-DailySpecials",
            header: "Today's Drink Special...",
            position: "middle_center",
            config: {
                startOfDay: (2, 0, 0, 0), // starts the day at 2:00 am
                endOfDay: (1, 59, 59, 999), // ends the day at 1:59 am
                shrinkLimit: 50, // to limit number of characters 
                updateInterval: 86400000, // 24 hours OR 1 day
                remoteFile: null, // to use a JSON file for your specials list IE: _DailySpecials.json_
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
            }
        },
```

## Configuration options

| Option           | Description
|----------------- |------------
| `startOfDay`     | set the time to start the day at a certain time. <br><br> **Possible values:** `SEE BELOW FOR VALUES` <br> **Default Value:** `(0,0,0,0)`
| `endOfDay`       | set the time to end the day at a certain time. <br><br> **Possible values:** `SEE BELOW FOR CHART` <br> **Default Value:** `(23,59,59,999)`
| `daymap`         | A map which defines the start days of specials sets.
| `shrinkLimit`    | Length of special at which a smaller font is used to display it.
| `classes`        | *Optional* CSS classes used to display the kudo.
| `shrinkClasses`  | *Optional* CSS classes used to shrink the kudo.
| `updateInterval` | How often does the specials have to change? (Milliseconds) <br><br> **for daily use `86400000` <br> **Default value:** `86400000` (24 hours or 1 day)
| `fadeSpeed`      | Speed of the update animation. (Milliseconds) <br><br> **Possible values:**`0` - `5000` <br> **Default value:** `500` (1/2 second)
| `specials`       | The list of specials. <br><br> **Possible values:** An object with some arrays - the names are defined in the values of the _daymap object_ plus the default array `special`. See _specials configuration_ below. <br> **Default value:** See _specials configuration_ below.
| `remoteFile`     | External file from which to load the specials. <br><br> **Possible values:** Path to a JSON file containing specials, configured as per the value of the _specials configuration_.<br> **Default value:** `null` (Does not load from file)

**startOfDay/endOfDay possible values:**
Must be set as 4 numbers in () separated by commas, IE: `startOfDay: (8,30,0,0)` will start the day at 8:30 am.<br>
Must have a corresponding end time, IE: `endOfDay: (7,29,59,999)` will end the day at 7:29:59:999 am.<br>
Values: first number represents the `hour (0-23)`, second number represents the `minutes (0-59)`, third number represents the `seconds (0-59)`, the fourth number represents the `milliseconds (0-999)`.
