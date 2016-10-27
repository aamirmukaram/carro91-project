'use strict';
/**
 * Service for restaurant revenues
 */
app.factory('restaurantCtrlService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
    var totalRevenues = {},
        totalCovers = {};
    $rootScope.totalRevenues = totalRevenues;
    $rootScope.totalCovers = totalCovers;

    var revenuesExists = function (filter, period, restaurant_id) {
        return totalRevenues[restaurant_id] && totalRevenues[restaurant_id][filter] && totalRevenues[restaurant_id][filter][period];

    };
    var coversExists = function (filter, period, restaurant_id) {
        return totalCovers[restaurant_id] && totalCovers[restaurant_id][filter] && totalCovers[restaurant_id][filter][period];
    };


    var restaurant_iframes = {
        iframe_with_button: {
            nightlyFeedback: {
                1: {
                    action: 'Current',
                    value: 1
                },
                2: {
                    action: 'Current',
                    value: 2
                },
                3: {
                    action: 'Current',
                    value: 3
                },
                4: {
                    action: 'Current',
                    value: 4
                },
                5: {
                    action: 'Current',
                    value: 5
                },
                6: {
                    action: 'Current',
                    value: 6
                },
                7: {
                    action: 'Current',
                    value: 7
                },
                8: {
                    action: 'Current',
                    value: 8
                },
                9: {
                    action: 'Current',
                    value: 9
                },
                10: {
                    action: 'Current',
                    value: 10
                },
                11: {
                    action: 'Current',
                    value: 11
                },
                12: {
                    action: 'Current',
                    value: 12
                },
                13: {
                    action: 'Current',
                    value: 13
                },
                14: {
                    action: 'Current',
                    value: 14
                },
                15: {
                    action: 'Current',
                    value: 15
                },
                16: {
                    action: 'Current',
                    value: 16
                },
                17: {
                    action: 'Current',
                    value: 17
                },
                18: {
                    action: 'Current',
                    value: 18
                },
                19: {
                    action: 'Current',
                    value: 19
                },
                20: {
                    action: 'Current',
                    value: 20
                },
                21: {
                    action: 'Current',
                    value: 21
                },
                22: {
                    action: 'Current',
                    value: 22
                },
                23: {
                    action: 'Current',
                    value: 23
                },
                24: {
                    action: 'Current',
                    value: 24
                },
                25: {
                    action: 'Current',
                    value: 25
                },
                26: {
                    action: 'Current',
                    value: 26
                },
                27: {
                    action: 'Current',
                    value: 27
                },
                28: {
                    action: 'Current',
                    value: 28
                },
                29: {
                    action: 'Current',
                    value: 29
                },
                30: {
                    action: 'Current',
                    value: 30
                },
                31: {
                    action: 'Current',
                    value: 31
                },
                32: {
                    action: 'Current',
                    value: 32
                },
                33: {
                    action: 'Current',
                    value: 33
                },
                34: {
                    action: 'Current',
                    value: 34
                }


            },
            salesMix: {
                1: {
                    action: 'SM_SH',
                    value: 1
                },
                2: {
                    action: 'SM_SH',
                    value: 2
                },
                3: {
                    action: 'SM_SH',
                    value: 3
                },
                4: {
                    action: 'SM_SH',
                    value: 4
                },
                5: {
                    action: 'SM_NYI',
                    value: 5
                },
                6: {
                    action: 'SM_NYI',
                    value: 6
                },
                7: {
                    action: 'SM_SH',
                    value: 7
                },
                8: {
                    action: 'SM_NYI',
                    value: 8
                },
                9: {
                    action: 'SM_SH',
                    value: 9
                },
                10: {
                    action: 'SM_SH',
                    value: 10
                },
                11: {
                    action: 'SM_NYI',
                    value: 11
                },
                12: {
                    action: 'SM_SH',
                    value: 12
                },
                13: {
                    action: 'SM_NYI',
                    value: 13
                },
                14: {
                    action: 'SM_NYI',
                    value: 14
                },
                15: {
                    action: 'SM_NYI',
                    value: 15
                },
                16: {
                    action: 'SM_NYI',
                    value: 16
                },
                17: {
                    action: 'SM_WSJ',
                    value: 17
                },
                18: {
                    action: 'SM_NYI',
                    value: 18
                },
                19: {
                    action: 'SM_NYI',
                    value: 19
                },
                20: {
                    action: 'SM_SH',
                    value: 20
                },
                21: {
                    action: 'SM_SH',
                    value: 21
                },
                22: {
                    action: 'SM_WSJ',
                    value: 22
                },
                23: {
                    action: 'SM_SH',
                    value: 23
                },
                24: {
                    action: 'SM_CH',
                    value: 24
                },
                25: {
                    action: 'SM_NYI',
                    value: 25
                },
                26: {
                    action: 'SM_SH',
                    value: 26
                },
                27: {
                    action: 'SM_SH',
                    value: 27
                },
                28: {
                    action: 'SM_BAR',
                    value: 28
                },
                29: {
                    action: 'SM_BAR',
                    value: 29
                },
                30: {
                    action: 'SM_SH',
                    value: 30
                },
                31: {
                    action: 'SM_SH',
                    value: 31
                },
                32: {
                    action: 'SM_BAR',
                    value: 32
                },
                33: {
                    action: 'SM_SH',
                    value: 33
                },
                34: {
                    action: 'SM_SH',
                    value: 34
                }

            }
        },
        iframe_with_form: {
            nightlyFeedback: {
                2016: {
                    1: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1H0cKRBDI6MpIpKPeh36wZI8m8x-NjNYdEjXhDs49dWI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    2: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1conYqtGXivh3fmtn01UK0wtN2ZNz4nIkJ8QOwSTbeow/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    3: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1cchcU6QfnQX_5tZT4JhFDgGYE66jK07mM5D3bMTylSE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    4: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1iF7vpwkC6fhhMUErCEAJuzu3gSwuNFKJBpyh-eNyfuM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    5: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/16rYV_Ecdw7ssifDI87F5y-LvPRLwZY2M5VDMBOA-ZGw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    6: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1tVZP_JdCLZpJQGRCIH2uoqyPrzUj2zC19EmoNK-njGE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    7: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1GttcoEjGG76AATe0OWWRMHRUB_BbQZ-FUm1ctUCIdq0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    8: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1EeZbQxUGUzXZjvPI_7SIIq7bsCCqQ_Phx2wwMfhYxDw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    9: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1E_FhvWVBA5RrQIgVDtofgB05TJFrUKqT-SV5wiwNVI8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    10: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jy7DUWqRqWcS9QONBvraqmE_6tID3QsmNyGaYxPNe_s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    11: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1MqUhXIa2qBPx-xL7RuhRQBpZsI9tjil2J5YwAheR1CQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    12: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1GBaAwh-SvpI3zMpEtdhNEX9-CWj9bbTckyZow0n_5Uk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    13: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1lZ8kOLVbcGSuyaB8cedgrAV0-6AToxslIyhQ8En6phE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    14: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/16RHBKTGQbJX_JNJ_7RA9_g3yL2IUg9NuFzsCWD9YH6M/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    15: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1RrXVIhSCyYh-TQP-o0cJstkOg_UsUbkhC2mVgGDYPg4/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    16: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1w-Gfcd_WCiUfE8YFlWhA0Bx_gVO_C9cq7lcmL9kyYKY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    17: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1IVcEgGYxLByrikV4qxNZsuSGmXmMWXOcvEvRWwg4Owg/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    18: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ymrAOsv06sBbL8x7aHzcpAB5s9eIpOPuHJwg_Jd52-8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    19: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1K0bgAEwTlVe4_VYxF-n0YQDeqY_6KtTLU5r8L_ekSEM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    20: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jMl6jaKN089_Uy7VcluriYsBW8RrrWJ_G2MB0uG0b0s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    21: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1twfB4sf0q7SwENtBzF2CUQW06jOFw7N9OaPb9Hk-3ak/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    22: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1IxHFefQc0vJPxCfUWnGSuPUteocNyy8Q7xv58Qbjj-8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    23: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ebtJFurHCl2DHrttcJHaG5cBnnCH_qox-Axtam_j3Jc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    24: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1khbCUIK6hrLWUcjYKwkDPOyz1kH_DjP6WuIVmwy47-s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    25: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1G_h_rFOsatXgjKKxTCXTLV4dNXDyI_ZhpNU_xhaEpvc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    26: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1p-FTnY3qAy1QGJumOrozMROsxe-zdm4mGH-rtrSDpcY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    27: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1_F2Ds2-IHQN9isbjydRF96sIyv3J9gQ-8GEm6aiiH7Q/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    28: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1L14RVQWMMOY_eJC1hkxyPwLYr97SfHaiOgMDUILOp5A/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    29: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    30: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1zPfCt3Z4bM_pbE4LaNjQcTij8qIJq1dSQerB0zSQUqA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    31: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1JCmCmONSHaR-xr3TvOik_7SycXjPeS5qMaEJ9884wYE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    32: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1vbpUD2471G9uLftM5Wgp79_Byu46WTHjaeTi5bqo7ag/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    33: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1Ka02xA1VeT4lXfExMGcnIRcksKMU9s3vgZM2CV4rYwo/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    34: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ImXBK9aLIT0Vh6e2uj4f9cJJGV-S2YR7tL2D-mkU6L0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    }
                },
                2015: {
                    1: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/15Isyh47kj3DWFR2qMXdTNFdSMOuj9cnvWrw9TqDJWoY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    2: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/15S7tfsanLrsAVVjKcycVZuz3C6kHdSvzzqlCghp457U/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    3: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1Uqq9X0D9v7LcLwCsqcBM9H1vynBLy1I17tPLe9SbmxU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    4: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ujWCW5O4VCwaiM6uJFSvgltPFGaCvUdezmefRSmRkLk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    5: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/12Jo9UnZdWCXB5kPpKkpNpzeFY2MXypsiNVD4AQvLOR4/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    6: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1fV5JKuxwegx6CVhwc9YV7SqtZGpkNN6IJYasUlEOWKs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    7: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1-jDvIddXS6PzzkcVu-R1BFVKY9PQaPd0DKUvmHYB3ew/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    8: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/17JU_wl8iLRyYYz4DzHYahJnaH7v2fddtyfTiwlJEdmY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    9: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1Ib-WvyyCQ0wlc7SeK-lX8sKOBLyMPncJ7Vlw_TOn_rs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    10: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1WXgvVsjaMmBko496L62jNBlToIeWqU8qlSMo0lVO-ZQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    11: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1pBszrBs5GvHIi-UDYRsOUgs9UzRItGFiNd0cvtT5HcI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    12: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1I-_Ej0JZTvN_njUpFRcY5WFV4WGLvIF1lY_CkCw0Fl8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    13: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1z6shDSjABFUlMqL30p9i4Qfe51mP-Hcbq0VNpG7D02Y/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    14: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1QayHW9kQdLDO2cEHX9xGxfNotHt6nHzBu-9ODNacqdA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    15: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1OnLlkCbZhVW5v8yC2ybSIarAuZU24g8s88jqgT0sCgk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    16: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/14E8h5QMrino1hXtFOvu_MSUf4lDcYB5_bDQmjkawHoE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    17: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/19IyL9Y0nv3fx-NDiP6cWkD9npuxP5f_piQ01sIiC1CE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    18: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/19IyL9Y0nv3fx-NDiP6cWkD9npuxP5f_piQ01sIiC1CE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    19: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/19IyL9Y0nv3fx-NDiP6cWkD9npuxP5f_piQ01sIiC1CE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    20: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/18gUhvGq4QbS4ftDYm4IPdrcCCzd7QrjaAKjXAKqe6Sw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    21: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1fPg5GDVWgwe7lcfknDXYMbO0H1bRWaFcbLx60A0GMyI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    22: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jgACHuG6XjwDHbDzFs-psvdZfE5LDJfcAhM76Yas93Q/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    23: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1zD6DXO7xqTsXVcW9lJ4Dy9-jM-TMsG4ya5K5cpF5x5I/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    24: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1BLSKEDU8HvGuH6fNTj1psNnohtNPX8zfSJCRiAmrpM0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    25: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1iyf_jPCLf9jVz5odKqwip3F1iO_8uDa3imct0tiPIe4/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    26: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1vcybCg6EbS3gT6iJz2H1j0M8HbPBu2GCO_RREyh46as/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    27: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1MaYMMIeZ-1r4gKYUiSqbjTwR0N7crUNdDPBeghvhkKk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    }
                }
            },
            adjustment: {
                    1: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1nX8_exHYSnkIxSVZJoXw2cBN6XxT29i6R2iIfPABZ8w/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    2: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1Cf-5cj-_UeBFfqjmMjr28fw0OlY6mkjF54xhKoGZ2kk/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    3: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1M4Mhn-kGykTiJcF_UyOmeHb5vXHqseewssiUByaqO_M/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    4: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/167mzLX7IMMNCyp2t4dRnPrOhSJoSq-v7UQX35o1mPL0/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    5: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1xq0xoAQ80nSmx8Lt6VOlNJjq06x0N5q9WMh0T9PVbhI/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    6: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1KIz-R-LxVDtYAyr9uuj5Fgs8etaG01VB5Pvhxzf_XfA/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    7: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1A7vlFJUyIBEMz2haQxiCM1GQ5acdyY_SvaZEI0ofoE0/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    8: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1cspq6GxKAMTdfqy2fVfdtsWbUIIWR5ZYY36eUxOJoqs/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    9: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1ggzQUfrwiQb7YCXO-XSOO8TZuGmuLNYC4M3h7iG9MGA/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    10: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1_an83Zz424xssIa_YiKlal2bk95NIddYpTRWspqS0jo/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    11: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1kFXKq5CK6FfDXOUaFbEvp53LLixxZfF02VGeoyGX1yM/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    12: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1-IrVcn_8SdHqVCspXn0Sownjufo72h0wFz0VB4AFb_4/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    13: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1G2nw6mNh0qumpUZj2gf7_QI8eyLPKAhD4Q4YpGs1tY8/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    14: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1DJxu910kAxJ0mmvKd1z6Jiog9XH2o6ptLk6tEpKKRgA/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    15: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1oCNVZ8MIfmw-NBkMfo6hKx9tt92Apx4Zt5diRODyiHA/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    16: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1NeyzcK5PZm_5QxxzxmZsuRQ2gVvHok_9lBSNvQtfpIA/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    17: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/10r66RsVwlTYz-w169a96mGpKfsEp7doqR2yHjPIrlmY/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    18: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1112Qf5Q7uACCN2YJ_0Ok1ygXYIopqa_R53ua4VgHZQk/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    19: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1w9NChnXbXEkZlBLCrcB6XHVZNRjpcP3zlB2qiZRICm4/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    20: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1yTv1yx_IOo5NSLmxIp-69tibVgR2ACxk9oi90lRguSw/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    21: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1AUI8h8ZFYW50207NHfgbGeY9l9gI6uabsXyP5sI6xVU/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    22: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1LPIJif2Qwqv3JKFUaT7Xhed6pZYD0tP1b7BOggUpDjQ/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    23: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1LcRIs7m4uDJoB-bYKDrknVp2b-rPj5QWGqtmwACmvwk/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    24: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1R3k6Fo0AJPBrLARHgboKncSidMi1yFlWwAvP1rJNudA/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    25: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1Odu6sZMN-Pg0q3jgI4ruIs8vYWBE943dGKhmImu_zmE/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    26: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1BP6n8yKlhMTeyUIO16-2Uh-1zrm4qRr95d5eWOBeaP8/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    27: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1bmuXvBfIntrz3NpeO4CS65cK2McQNHlycwyernUNmkw/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    28: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1-5o6OjaJPsNT2A9-fIQXLs2EY5TSRVZQU18kAs_s-3c/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    29: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1Z5S_dV_fS1HBg_-R8X3OatIddx6BVHVEx3CEjBSNf9Q/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    30: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1LC0za0D-aDRZ3Gs_MjVcNxCQBh-J_ig27kzm2zQQAm4/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    31: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/1ncDPLieG_AFlH33a8XDnYBLed8qx8TUIwhwzB94wLgU/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    32: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/HERE/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    33: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/17SdoPfo5pVATasZh3WszHRUI3oMPDtCpThCVpkr6oA1/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    },
                    34: {
                        iframe: '<iframe src="https://docs.google.com/forms/d/17UQHqbPxXZn5TqnDU_nU6u3gwcVrqv62f5riE8w3H/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0"></iframe></iframe>'
                    }

            },
            salesMix: {
                1: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                2015: {
                    5: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1-DILnHxZK1FxklrmnvaCtpm-2zAQAX8SPqgGmh0Qqr0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    6: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1SQPf5Y7rYo-aRnPXXe0eun8WJ24oUEH91SvIv4IUiiA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    8: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1HaKoJw8A3VnPu8rpCgjJbPbQR3wQG4Syimz5BkHj6SY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    11: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1oUQ4ZwNv7TMODfTNo2OnSV1xJPX1CPzFwM9zZxzgAvU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    13: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1X2J3TjYKb0zyb400eT5rtC-VmlKa8naXkoObxExPFT8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    14: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1C7VGk9kO74zj6CSrAN3FpDqvCpx2oZoQUmB4XxYJ5Ig/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    15: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/17Z6V7dz77zQ6Nh5Cj9uj9Pg7YHrd0viqyHQlqq-EXMs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    16: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/18ucLD5OuEHf6dA5bGpf1Tj4OYOBpV3PMB9jp_iwuBDc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    18: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1JEv4ZILbvT-Vl-5KJu5bGTyesC29MotGP2sBVqEcwjI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    19: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1LN43MGG2SjdxaPCLsgJERmC3TkCwss1bfSWrBBiBGuA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    25: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1yKCyrA_mTa8Fy1m_5h30O7YqOndvrFWvJ7PNiUwrPXY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    }
                }
            }
        },
        iframe_only: {
            invoice: {
                1: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQUzdaRnRORl9QT2M#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                2: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQUExRNnY5V0xBc2c#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                3: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQU2VrQXBJcFlmWlE#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                4: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYTE0bjlDNlZsemc#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                5: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNVF0cnIwVnNLTDA#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                6: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcmhKMGpJV2R3NWM#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                7: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTHNzanplRF9feWM#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                8: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTFFhTmQxdEo2MVk#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                9: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQaGYyTTZ2WnB0b0E#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                10: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQbFVMUzRWZnp2R3c#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                11: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWUNacG9ZQUdsMG8#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                12: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQdktBVUhvRzB6aW8#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                13: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTEdKMFdmdVZDZEU#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                14: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQX1lCS013akNmU1E#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                15: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYmE3WnpqdnBQVjg#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                16: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQVXRGWms2NG1kN2c#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                17: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQc1hRRENfZnJONFk#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                18: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQVk43TTZfZ1JPaTg#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                19: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWXJWZE1zRjNybk0#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                20: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQR0FXZkJLcC1sTm8#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                21: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYzRNUmJULXd0RG8#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                22: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=x0Bxb_-zitIdWQWEtOcHZVc0JuUEk#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                23: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQb1M4WWxTVXcycTA#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                24: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQenpNZFRqR2ZwRXc#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                25: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYWM2SG1kc29WMTg#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                26: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQY3FrSDdsdWNGVUE#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                27: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQR0hVS1A5cWllN1E#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                28: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQampGVHh2aTNlMXc#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                29: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWFpXUHpjbHZHRHc#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                30: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQQ21Oa1M5VDBVS0E#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                31: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNmdSM0cxbHh6RWM#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                32: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=HERE#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                33: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYUtBakR4UlpwZFU#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                34: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQSk5vbFBGVFVBYTg#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                }
            },
            audit: {
                1: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcURpRGQyUnBZQ1E#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                2: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQR3RaNFRpd25VQXM#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                3: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQR3RaNFRpd25VQXM#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                4: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQdEY2VkhRTlQ0d3M#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                5: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQMndtaUV6S0RKSEE#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                6: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQUWI5bnJkUHpEN1k#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                7: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQclJyZUlXSmFVUnM#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                8: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQeWNFRFR4SmhJdGM#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                9: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQMXJ5V2dvUGg5OUE#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                10: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcVNKdWxmNGlrZkE#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                11: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNUJIMzNXa3BVdUk#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                12: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNlVRMk11M0Jubkk#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                13: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQSXBWTnI5eXNGb2M#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                14: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQZng5cHhDcUYyZ0U#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                15: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQN01FVHllWXFpWDg#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                16: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQMXlqd2ZpeFl3cHM#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                17: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQN2Zucl9hRXpzeDA#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                18: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcXBpZXRPYXFjTEk#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                19: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQVGI5MnQzMF85Q1U#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                20: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQMUVuQ2hlRzNmb1U#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                21: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcXNSMjNGOHBRYTQ#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                22: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNGdUNVpLMUtFanM#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                23: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQS2MtdzVPRFNZWTQ#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                24: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQVXZnejRrcHFaYzA#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                25: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQS2JvWFJhanItb2s#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                26: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQLXNBMWItck5obHc#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                27: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQd2R2M3l3bU1lZlU#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                28: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQSHVkVWtEdUhBajQ#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                29: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQeEhSb2Fmc3Z1dms#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                30: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQZldTeV80X1E0Wms#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                31: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQb1VfYndwbFB6T28#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                32: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQZUVMTnJVRTg0dVE#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                33: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQZ2doelRxLVNvelk#grid" width="100%" height="500" frameborder="0"></iframe>'
                },
                34: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQc2xTbHZiWlFvUzg#grid" width="100%" height="500" frameborder="0"></iframe>'
                }
            },
            digitalPerformance: {
                1: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ZOha5EtAYSGriZ65pHY-zGeHsJfT5EUaopXwrX3quUg/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                2: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                }
            },
            GPTracker: {
                1: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                2: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                }
            },
            mysteryGuestReports: {
                1: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcWdrTm1TdDh6alE#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                2: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQem5nNTgtQm1xUkE#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                3: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQdFI3UW02UlZrU2s#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                4: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQMHZrTDhXelBzT0E#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                5: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQa1l6QnVwbER0dzQ#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                6: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTmhRRDRLRXo0ZlU#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                7: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWGctSEY2N3B6TXc#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                8: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQbmtrQmRqaExrVEk#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                9: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQYkxyd2FJUnJDRUU#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                10: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQY1pMMzdfN2U2Sk0#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                11: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQbWFpdC1Ud0NaNTg#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                12: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQdHJ2VVhEMm5zUkU#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                13: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQSTBCUktEQ21jWlU#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                14: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQRGtsNUF4LWc3Z0E#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                15: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQeV95X1AxcnNNcUE#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                16: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTzI5bXo1TDlfb1E#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                17: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNkpTVWllM0Z5eW8#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                18: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWHZFd2ZHcWsybUk#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                19: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQN1NsQ0diS002eGc#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                20: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQaDRkbEJoQ2c4TjA#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                21: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWmdBeWNmODY2M3c#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                22: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQVExXSlhwd282ZWc#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                23: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQLTlINVBvMDQ0WU0#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                24: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQcFdEV01CMmJqSGM#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                25: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQd2RjUzZBQ1R5VXM#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                26: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQWml5OWpuQV93dzQ#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                27: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQbWhwRFNaVzM3Yzg#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                28: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNm9OWEdLMV9NQjg#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                29: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQeUtxRFN4ZFJJZ2s#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                30: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQbVVJNVNNaE5lcXM#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                31: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQTDMxRzhGMkp5TDQ#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                32: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=HERE#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                33: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQVmtQN2JYRUl1MkU#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                },
                34: {
                    iframe: '<iframe src="https://drive.google.com/embeddedfolderview?id=0Bxb_-zitIdWQNlNkbHB1Q2xTTlU#grid" width="100%" height="500" frameborder="0"></iframe></iframe>'
                }
            },
            tripAdvisor: {
                1: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/12JUoS90dzwK3be9LgrKkV9YCKqz86w0ruAGd_2Lzh-M/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                2: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/12JUoS90dzwK3be9LgrKkV9YCKqz86w0ruAGd_2Lzh-M/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                3: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1-9618pWE7o3RqklgFjw587a6ODpAleav1qZ5lE26cAs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                4: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1-9618pWE7o3RqklgFjw587a6ODpAleav1qZ5lE26cAs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                5: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1-9618pWE7o3RqklgFjw587a6ODpAleav1qZ5lE26cAs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                6: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1-9618pWE7o3RqklgFjw587a6ODpAleav1qZ5lE26cAs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                7: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1-9618pWE7o3RqklgFjw587a6ODpAleav1qZ5lE26cAs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                8: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1oPMao0ZE_bggkwAxM0DdmGVfYAbKvu1HOKlx4sEr-rw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                9: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1qIn0OPojGoDxyvyxve-8rGszfIMBW5WKCcluUUxudms/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                10: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1miiUMbmPb7zUFBFYAtytfhsKfPh3vzRGt236be2ryyc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                11: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ujIOTsOngMODdA6T5vlUiNAOFJDycYaO01SxEJGDZBE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                12: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1LH7hvPBnxOb9TjamyMrNnfSMC6i0oC8QTbcPF3ipxcM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                13: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1N9EwyCBxV1LjMd0VpcBPa_hH9CjCJ7XaZDtP2nfgCno/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                14: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1pl5m7xIz7JIda_iNygarpRRAjUqfCBhnGGCMSE268P0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                15: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1X8hmhuufrCGuSHv7Vyfx35rlpb9BNTtsbtQEc0YHb2I/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                16: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1SxIAkhh0wIMOcxtDMGr_J5wOZJZR6l4GNUCx0AibmDQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                17: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1dzCuLHzDbfTG7kNHxQdzZaUmkL-Ud_E1ivCRTB9CUBU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                18: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1gc1oANkDhHv3WrkixYIJeBFkA0gFiMuGCZExdnWWppg/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                19: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1cdJ_C_wEfDuqKK7MzhdRiC2trJpxKi38U0LEkCNBpvM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                20: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1DI9RtiKmvNORYBoMJV86BlFln80-xaFkSFjh47wvDEA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                21: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1d2IztXmRisfMoEbsC88A1aKdYESl-rGpBqgeDO1RmlM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                22: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1TGRRXJj8E9GLgNFeXlxudDZsSn41lLodqVmexIlbUkI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                23: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/12yKclYfQUF8EBTaDVkOOnuReY7rZ40OwUqAsh8tmVXE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                24: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1Mwp9RffLAm2khk5TfS-7WmGoBRbXyLGbsGnqR3yPNio/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                25: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/12hGr5GTfS63nyxjwJYPrfu_eZFZ6R89Ff9VUyrcswBY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                26: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1i322exYNoY-KveEXy6VP8hH1DCRWld8BNftihdXZXHE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                27: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/15vBoSjH2YezmLnrpuTzB2_wSjkG1u36PLo6GVsZC-9E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                28: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1FHX4jD5mBr_fc0yb2bP1zuSWOGuZaKnZNn5M1H2dCEY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                29: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1qLyqbrQ6vlwwmNfuGxZlGYpbgbFNPjjqfAWZR-F8M-k/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                30: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1_i9mYEd5EICo8BecavN8xD6uhc9LiNTzBwo9wP6Neas/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                31: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1DKARbPAbsnSPimGgLYnC1I807lVqGqjwyq1iZrk5VLY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                32: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d//pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                33: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d//pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                },
                34: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d//pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                }
            },
            users: {
                1: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=720437863&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                2: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=2102118761&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                3: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1548866658&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                4: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=907293677&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                5: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=608858136&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                6: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1061265520&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                7: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=2143513117&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                8: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=629735966&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                9: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1495922687&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                10: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1711528980&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                11: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=2056379215&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                12: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=2144414325&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                13: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=276171114&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                14: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=880536203&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                15: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=782269486&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                16: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1628932459&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                17: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1398596296&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                18: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1704249694&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                19: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=647244747&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                20: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1990164552&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                21: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1649072565&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                22: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1404406230&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                23: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1466403879&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                24: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1779311378&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                25: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1451848675&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                26: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=237674891&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                27: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1067621018&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                28: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1140594381&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                29: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=2114860685&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                30: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=555787278&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                31: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=838866186&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                32: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=HERE&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                33: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=1975795029&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                },
                34: {
                    iframe: '<iframe src="https://docs.google.com/spreadsheets/d/11fMGyuABjIQ8iAT8W0GeoRCXCjq9iUfc6_jgrsvZaNA/pubhtml?gid=638134263&amp;single=true&amp;widget=true&amp;headers=false" width="100%" height="340" frameborder="0"></iframe>'
                }
            }
        },
        iframe_with_year: {
            compliance: {
                2016: {
                    1: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    2: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    }
                },
                2015: {
                    1: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    2: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    }
                }
            },
            nightlyFeedback: {
                2016: {
                    1: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1H0cKRBDI6MpIpKPeh36wZI8m8x-NjNYdEjXhDs49dWI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    2: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1conYqtGXivh3fmtn01UK0wtN2ZNz4nIkJ8QOwSTbeow/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    3: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1cchcU6QfnQX_5tZT4JhFDgGYE66jK07mM5D3bMTylSE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    4: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1iF7vpwkC6fhhMUErCEAJuzu3gSwuNFKJBpyh-eNyfuM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    5: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/16rYV_Ecdw7ssifDI87F5y-LvPRLwZY2M5VDMBOA-ZGw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    6: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1tVZP_JdCLZpJQGRCIH2uoqyPrzUj2zC19EmoNK-njGE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    7: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1GttcoEjGG76AATe0OWWRMHRUB_BbQZ-FUm1ctUCIdq0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    8: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1EeZbQxUGUzXZjvPI_7SIIq7bsCCqQ_Phx2wwMfhYxDw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    9: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1E_FhvWVBA5RrQIgVDtofgB05TJFrUKqT-SV5wiwNVI8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    10: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jy7DUWqRqWcS9QONBvraqmE_6tID3QsmNyGaYxPNe_s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    11: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1MqUhXIa2qBPx-xL7RuhRQBpZsI9tjil2J5YwAheR1CQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    12: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1GBaAwh-SvpI3zMpEtdhNEX9-CWj9bbTckyZow0n_5Uk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    13: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1lZ8kOLVbcGSuyaB8cedgrAV0-6AToxslIyhQ8En6phE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    14: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/16RHBKTGQbJX_JNJ_7RA9_g3yL2IUg9NuFzsCWD9YH6M/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    15: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1RrXVIhSCyYh-TQP-o0cJstkOg_UsUbkhC2mVgGDYPg4/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    16: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1w-Gfcd_WCiUfE8YFlWhA0Bx_gVO_C9cq7lcmL9kyYKY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    17: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1IVcEgGYxLByrikV4qxNZsuSGmXmMWXOcvEvRWwg4Owg/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    18: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ymrAOsv06sBbL8x7aHzcpAB5s9eIpOPuHJwg_Jd52-8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    19: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1K0bgAEwTlVe4_VYxF-n0YQDeqY_6KtTLU5r8L_ekSEM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    20: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jMl6jaKN089_Uy7VcluriYsBW8RrrWJ_G2MB0uG0b0s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    21: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1twfB4sf0q7SwENtBzF2CUQW06jOFw7N9OaPb9Hk-3ak/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    22: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1IxHFefQc0vJPxCfUWnGSuPUteocNyy8Q7xv58Qbjj-8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    23: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ebtJFurHCl2DHrttcJHaG5cBnnCH_qox-Axtam_j3Jc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    24: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1khbCUIK6hrLWUcjYKwkDPOyz1kH_DjP6WuIVmwy47-s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    25: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1G_h_rFOsatXgjKKxTCXTLV4dNXDyI_ZhpNU_xhaEpvc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    26: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1p-FTnY3qAy1QGJumOrozMROsxe-zdm4mGH-rtrSDpcY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    27: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1_F2Ds2-IHQN9isbjydRF96sIyv3J9gQ-8GEm6aiiH7Q/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    28: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1L14RVQWMMOY_eJC1hkxyPwLYr97SfHaiOgMDUILOp5A/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    29: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jqNVESNrtG8VmXZOHsYK2xWO8Xw7BiAmT4W2-calq5E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    30: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1zPfCt3Z4bM_pbE4LaNjQcTij8qIJq1dSQerB0zSQUqA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    31: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1JCmCmONSHaR-xr3TvOik_7SycXjPeS5qMaEJ9884wYE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    32: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1vbpUD2471G9uLftM5Wgp79_Byu46WTHjaeTi5bqo7ag/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    33: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1Ka02xA1VeT4lXfExMGcnIRcksKMU9s3vgZM2CV4rYwo/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    34: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1ImXBK9aLIT0Vh6e2uj4f9cJJGV-S2YR7tL2D-mkU6L0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    }
                },
                2015: {
                    1: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1-hnTVBy4zpZ1O8AkXnjmOmUUzDMWgpJ1161hR9K75MI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    2: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1oltPakNqVXLNwNtpN-Jsf3B_ntkFhdCliOtESiAP6Z0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    3: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1BKl1pPqbiQMK2cIQUPTY_fQvrkVdSCHMgAgR7OTZD_w/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    4: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1wZjwmrpZv0Kg9uuiQPmvWt_Aarv80uMuDKpBkhwn9vE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    5: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1dmVFgNyMdaQwv5lobiWusWSFOiaIAOZdHgaeMufZ9dU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    6: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1EruwvYY5phIUtOxC110pfyWnt7sg9Y0bxabpkArUXM4/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    7: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1-jDvIddXS6PzzkcVu-R1BFVKY9PQaPd0DKUvmHYB3ew/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    8: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1dcVisqcz1dMEEbam3-cGocxEHu5k_rEFf888RvsGi_M/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    9: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/17f2wSKYm7EIlX5leVnVcq6gEqaMsgK1kEWeETfx60xg/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    10: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1J5wpR08gUTiWTt3wl7xAavUTEd4jJnxeKUDmJJn3r9E/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    11: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1LFEYHuqkOl-t1UxQrB2bZ_giJtvvnJ6tt2o_Z9mlZ0I/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    12: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1kVzrKagmclMfR95k8PUwsdiCAONB8DW4qG_nD2maZbc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    13: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1KZUivnhZ5IIEwI_LNPylYGyAy48t9_sRhZ6c_UQYwCQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    14: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/10_yCvpiUHCZtoiu0UOo7dsdKLSoyrvKO3B0vqMQT_Aw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    15: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/13x_3LMzAtDkcUmg42OPUYXx7otwgmM-v6nZvIKiOjOQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    16: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1IrGaJfCvgvB3pwPv-t7T32Df5CMRhX-s4eeOnMWmDpk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    17: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1NprV2EUDxbD7QHiEfqPsbpU-uVAu-SnuC2bs63iQ__k/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    18: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1jkJUnI5akWRXWyo1VLKr0J9IdCBNaZxy2l3NpPM5c1w/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    19: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1OspvSbgKBq5-nmgKDfyvJbX8U76wH0-kj9tdas4xYqY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    20: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1uMdZL6F5gSqt4oqayWn1we02oeoT4NP8KEdOaP1572s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    21: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1W9yCueJERPr-DnTGkLAolJiTVrjs3qNDx2r6CnRHBkc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    22: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/12k6YywvwHTPneqcTr7Y47GKLNpgyt8xWPY1LpiHYbZ8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    23: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1Zwj4-nJyZc2hyNM22f7Z83Nu_9u5EdC2pmx8AoHSSvQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    24: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1tscegTer_gZtULlqKkrdw6C4kooShK67HjqqaevkU6I/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    25: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1Bk1ijdd-ajmx0x18LCwF-gCaC-Ty2eMlB4unTOgIrfQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    26: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1R1cTXNzbyY7akcLjApG0i2cIVufT0i9ylhv-t1IAYpU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    },
                    27: {
                        iframe: '<iframe src="https://docs.google.com/spreadsheets/d/1pHsNqRu5vPMCvb_yP7KWeSWMsr6jY1HwXSQsGhrh4H4/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe>'
                    }
                }
            },
            salesMix: {
                2016: {
                    1: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/12cpxmFc-0ZMQRe_nItu-vDyC4T0HFRV-o_PuUOpsOnI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    2: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1RXzLJ1R7ZZ7wX8fg90OBuoX3LJiHfayTImGLD7zpxaI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    3: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/13Kk7M5HzTGEnfbE-2bYfSC-e2CP7Zzp-6amwHZ9Rm-M/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    4: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1r_K4sLVAEcgx1WtCcnAOQfZbyYLZEV--VGPO5jJpxzU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    5: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1kmR-3E3indW2XG09jKS9x5IMkCmO8_xbQqA7qs9awYg/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d//pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    6: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1a_ArWqCOwvi7aU_kWjX2AOHt9y4_6qnC5O9McnGcCNs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1Tk0rCJKkqjt34aFRycBem277Gka4Ne6jIuRNpPXWMgs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    7: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1fiHDe9TBgQeidEu0-YeRFQNYSEmEPx9cp4cGwlW_ap8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    8: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1e1dSWLxqBlkbLpY0MADa1geCLi8c_nqw8zVQGzCXiE8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1KcSyEnHSIXefhAIqGj6yh7V9P1_hiSXArTeEf791QbA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    9: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1JyIhTNxJuUAoEHxaT49U869EPssefB8gDH4Kn0bz-0I/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    10: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1sSYTydqD4wLKJxl9rna-JuYpJ1Se4iDKZK9gzTzY3vo/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    11: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1fWN1wLDkXuzYDHEISEWiORpsrnuIwYlZ5I3XGJJpvNE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1J2BW1gdSrHKYIlxzS1DNi0ruL2y116oKoLlFQIRnZ-I/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    12: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1CQFiOzXpxRCCA6PX0cIkrCCZJ2qXbtwnX03lJeV0oPc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    13: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1HLzc0H7ffza4UsuwUivPzGIwphH2jb302B3Un2Ukb5Y/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1BAw7WEdzNKnmThCSoIz-eEe7Q7WpeOJoikXIw0aePGk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    14: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1cvQjGfIX4Pq7rXWujF4mJ5To0Ig6pL7S_mepWqREdQM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1OSLV5tZrm3BbhSWjhJh2t2L9A-CcebSO9atyWffQ0AI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    15: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1DzzJbwB3eC7wtnbzKx8jASub1yh-6x4Ed7IBtHEYBkI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1Tfz49pPtM0jnspqA9p30GU4hXR5ELgSGXGu1vWvTEFU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    16: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1_c6-8oH7kvLUx82YHBlMofaeib_1H4doP2eB3HxPWBQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1k3o-coqiVvN9UoXRTt4mHTSvwf00V2mfw2u4js9b0eA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    17: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1vPQi-10Q-VHqHcVWvNMn9rtZ-q6ZRnA-CskCLp-X0CA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    18: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1iZY2_IgbA3C_Nx_1XUhHasSc9ZA2rTpEVypf_0T2a88/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1m9Z9bLyfnKotymTSRLWg-Ts-ik76lkgLf84vogPZO_0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    19: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1V-jvueZySYcXRyAw60eeu1h4oXJzNkfxaTb2imwmo30/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1Rex8yfMpzXsr0AsJ0Gd65lfdGORSmvHpGNB_U11d1ME/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    20: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1lbYHWaf_bFNPMvtIMgghvMjemtGStb4GzceHkEEie0o/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    21: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1Xvj8m5o8pow35w29E4GHBxb9S2dOXI_W1W0hPbUGCFw/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    22: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1OhzMGYUa1T7XRUi3WL9FyALG5noXysOFTC2wYW84n2Q/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    23: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1QkP7A_TTFsDL7wTzkk3h91ZVVt1nyupkCLgyQxRSk-s/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    24: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1R3aVcdYCFzMl9GPFSU2EIuOW9lfyhbfIHwN1a2OaiOo/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    25: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1DB1UBV6948EPlG-C1n8qWvMMl7o0HoaMgAjpbsP1Bfk/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1p3wkOavt9rgktmFpbMeKxL-hhPDOQlaX2KxkdRi3IyM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    26: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1tkP6vKwKgmUgMs6ICTUGW070liDPsodczgpsqpjw-D0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    27: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1EdedOcxXXiaK3GC9Ixwgkk7kDMP8VnltB2-fGLe42KI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    28: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1krSCBAYU4uyfCeORoo_BeTPul8QVI3MmKoxlRRuTlzM/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    29: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1l5hven8--F-wzTdU6j1DCCVCA2d9wsVdwAVA-WwDZGs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    30: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1PO-b-I_FCxKEmwQ77GcpyUSIsnTcpU85D7WBJfRwmIU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    31: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1zFWJKkGtkafeeOQA94PbVEfgO7nfLjf6QfN06kgOJNQ/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    32: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d//pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    33: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1fuvEqFw77IOfqG0F1xLClVe_ZSaeJtghj1QPn5DYPsA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/12TgwNyVDeqCtMlAnym-F7MiNU8gvuJbjUI9IlpviATY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    34: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/HERE/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div><div><iframe src="https://docs.google.com/spreadsheets/d/1OBslNZ3nQ_VmBQSuzDW2n96W4Kibxy7hRK7AlrApEfU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    }
                },
                2015: {
                    5: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1-DILnHxZK1FxklrmnvaCtpm-2zAQAX8SPqgGmh0Qqr0/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    6: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1SQPf5Y7rYo-aRnPXXe0eun8WJ24oUEH91SvIv4IUiiA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    8: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1HaKoJw8A3VnPu8rpCgjJbPbQR3wQG4Syimz5BkHj6SY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    11: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1oUQ4ZwNv7TMODfTNo2OnSV1xJPX1CPzFwM9zZxzgAvU/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    13: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1X2J3TjYKb0zyb400eT5rtC-VmlKa8naXkoObxExPFT8/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    14: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1C7VGk9kO74zj6CSrAN3FpDqvCpx2oZoQUmB4XxYJ5Ig/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    15: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/17Z6V7dz77zQ6Nh5Cj9uj9Pg7YHrd0viqyHQlqq-EXMs/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    16: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/18ucLD5OuEHf6dA5bGpf1Tj4OYOBpV3PMB9jp_iwuBDc/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    18: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1JEv4ZILbvT-Vl-5KJu5bGTyesC29MotGP2sBVqEcwjI/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    19: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1LN43MGG2SjdxaPCLsgJERmC3TkCwss1bfSWrBBiBGuA/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    },
                    25: {
                        iframe: '<div><iframe src="https://docs.google.com/spreadsheets/d/1yKCyrA_mTa8Fy1m_5h30O7YqOndvrFWvJ7PNiUwrPXY/pubhtml?widget=true&amp;headers=false" width="100%" height="600" frameborder="0"></iframe></div>'
                    }
                }
            }
        }
    };



    var restaurant_nightly_feedback_forms = {
        1: {
            date: true,
            lunchCoversStartDay: true,
            dinnerCoversStartDay: true,
            afternoonTeaCover: true,
            brunchCovers: true,
            lunchCoversWalkIns: true,
            dinnerCoversWalkIns: true,
            residentDiners: true,
            lunchCoversTotal: true,
            dinnerCoversTotal: true,
            roomServiceCovers: true,
            lunchFoodRevenues: true,
            dinnerFoodRevenue: true,
            barFoodRevenue: true,
            afternoonTeaRevenue: true,
            lunchLiquorRevenue: true,
            dinnerLiquorRevenue: true,
            barLiquorRevenue: true,
            commentarySales: true,
            commentaryPayroll: true,
            lunchCoversNoShow: true,
            commentaryMaintenanceIssues: true,
            commentaryPeople: true,
            commentaryProduct: true,
            commentaryPersonName: true,
            commentaryEmail: true,
            commentaryMarketing: true,
            dinnerCoversNoShow: true,
            inHouseGuests: true

        },
        2: {
            date: true,
            lunchCoversStartDay: true,
            dinnerCoversStartDay: true,
            afternoonTeaCover: true,
            brunchCovers: true,
            lunchCoversWalkIns: true,
            dinnerCoversWalkIns: true,
            residentDiners: true,
            lunchCoversTotal: true,
            dinnerCoversTotal: true,
            roomServiceCovers: true,
            lunchFoodRevenues: true,
            dinnerFoodRevenue: true,
            barFoodRevenue: true,
            afternoonTeaRevenue: true,
            lunchLiquorRevenue: true,
            dinnerLiquorRevenue: true,
            barLiquorRevenue: true,
            commentarySales: true,
            commentaryPayroll: true,
            lunchCoversNoShow: true,
            commentaryMaintenanceIssues: true,
            commentaryPeople: true,
            commentaryProduct: true,
            commentaryPersonName: true,
            commentaryEmail: true,
            commentaryMarketing: true,
            dinnerCoversNoShow: true,
            inHouseGuests: true

        }

    };

    var marketing_iframes = {};


    return {
        fetchTotalRevenues: function (params, doRefresh) {
            var deferred = $q.defer();
            doRefresh = doRefresh || false;
            params = params || null;
            if (doRefresh || !revenuesExists(params.filter, params.period, params.restaurant_id)) {

                $http({
                    url: $rootScope.pathToBackend + "restaurant/revenues/" + params.filter + "/get.php",
                    method: "GET",
                    params: {
                        restaurant_id: params.restaurant_id,
                        period: params.period
                    }
                }).success((function (params) {
                        return function (data) {
                            fetchRevenuesComplete(data, params);
                        }
                    })(params))
                    .catch(fetchRevenuesFailed);

            }
            else {
                deferred.resolve(totalRevenues[params.restaurant_id][params.filter][params.period]);
                return deferred.promise;
            }

            function fetchRevenuesComplete(response, params) {
                if (!totalRevenues[params.restaurant_id]) {
                    totalRevenues[params.restaurant_id] = {};
                }
                if (!totalRevenues[params.restaurant_id][params.filter]) {
                    totalRevenues[params.restaurant_id][params.filter] = {};
                }
                if (!totalRevenues[params.restaurant_id][params.filter][params.period]) {
                    totalRevenues[params.restaurant_id][params.filter][params.period] = {};
                }

                angular.copy(response.data, totalRevenues[params.restaurant_id][params.filter][params.period]);
                deferred.resolve(totalRevenues[params.restaurant_id][params.filter][params.period]);
            }

            function fetchRevenuesFailed() {
                deferred.reject();
            }

            return deferred.promise;
        },
        fetchTotalCovers: function (params, doRefresh) {
            var deferred = $q.defer();
            doRefresh = doRefresh || false;
            params = params || null;
            if (doRefresh || !coversExists(params.filter, params.period, params.restaurant_id)) {

                $http({
                    url: $rootScope.pathToBackend + "restaurant/covers/" + params.filter + "/get.php",
                    method: "GET",
                    params: {
                        restaurant_id: params.restaurant_id,
                        period: params.period
                    }
                }).success((function (params) {
                        return function (data) {
                            fetchCoversComplete(data, params);
                        }
                    })(params))
                    .catch(fetchCoversFailed);

            }
            else {
                deferred.resolve(totalCovers[params.restaurant_id][params.filter][params.period]);
                return deferred.promise;
            }

            function fetchCoversComplete(response, params) {

                if (!totalCovers[params.restaurant_id]) {
                    totalCovers[params.restaurant_id] = {};
                }
                if (!totalCovers[params.restaurant_id][params.filter]) {
                    totalCovers[params.restaurant_id][params.filter] = {};
                }
                if (!totalCovers[params.restaurant_id][params.filter][params.period]) {
                    totalCovers[params.restaurant_id][params.filter][params.period] = {};
                }

                angular.copy(response.data, totalCovers[params.restaurant_id][params.filter][params.period]);
                deferred.resolve(totalCovers[params.restaurant_id][params.filter][params.period]);


            }

            function fetchCoversFailed() {
                deferred.reject();
            }

            return deferred.promise;
        },
        fetchDigitalPerformance: function (params) {
            var deferred = $q.defer();

            function fetchDigitalPerformanceComplete(resp) {
                deferred.resolve(resp.data);
            }

            function fetchDigitalPerformanceFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "restaurant/digital-performance/" + params.filter + "/get.php",
                method: "GET",
                params: {
                    restaurant_id: params.restaurant_id,
                    period: params.period
                }
            }).success(fetchDigitalPerformanceComplete)
                .catch(fetchDigitalPerformanceFailed);

            return deferred.promise;
        },
        fetchTripAdvisor: function (params) {
            var deferred = $q.defer();

            function fetchTripAdvisorComplete(resp) {
                deferred.resolve(resp.data);
            }

            function fetchTripAdvisorFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "restaurant/trip-advisor/" + params.filter + "/get.php",
                method: "GET",
                params: {
                    restaurant_id: params.restaurant_id,
                    period: params.period
                }
            }).success(fetchTripAdvisorComplete)
                .catch(fetchTripAdvisorFailed);

            return deferred.promise;
        },
        fetchBookatable: function (params) {
            var deferred = $q.defer();

            function fetchBookatableComplete(resp) {
                deferred.resolve(resp.data);
            }

            function fetchBookatableFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "restaurant/bookatable/" + params.filter + "/get.php",
                method: "GET",
                params: {
                    restaurant_id: params.restaurant_id,
                    period: params.period
                }
            }).success(fetchBookatableComplete)
                .catch(fetchBookatableFailed);

            return deferred.promise;
        },
        fetchBookingMade: function (params) {
            var deferred = $q.defer();

            function fetchBookingMadeComplete(resp) {
                deferred.resolve(resp.data);
            }

            function fetchBookingMadeFailed() {
                deferred.reject();
            }

            $http({
                url: $rootScope.pathToBackend + "restaurant/booking-made/" + params.filter + "/get.php",
                method: "GET",
                params: {
                    restaurant_id: params.restaurant_id,
                    period: params.period
                }
            }).success(fetchBookingMadeComplete)
                .catch(fetchBookingMadeFailed);

            return deferred.promise;
        },
        restaurantRevenueCoverResponseYearPadding: function (data) {

            var new_labels = angular.copy(data.labels);
            var new_data = angular.copy(data.data);
            var months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            var counter = 0;
            for (var x = 0; x < data.labels.length; x++) {
                if (data.labels[counter] !== months[x]) {
                    new_labels.splice(x, 0, months[x]);
                    new_data.splice(x, 0, '0');
                }
                else {
                    counter = counter + 1;
                }
            }

            data.labels = new_labels;
            data.data = new_data;

            return data;
        },
        restaurantRevenueCoverResponseMonthPadding: function (data) {

            var new_labels = angular.copy(data.labels);
            var new_data = angular.copy(data.data);
            var weeks = [
                'Week 1',
                'Week 2',
                'Week 3',
                'Week 4',
                'Week 5',
                'Week 6'
            ];

            var counter = 0;
            for (var x = 0; x < data.labels.length; x++) {
                if (data.labels[counter] !== weeks[x]) {
                    new_labels.splice(x, 0, weeks[x]);
                    new_data.splice(x, 0, '0');
                }
                else {
                    counter = counter + 1;
                }
            }

            data.labels = new_labels;
            data.data = new_data;

            return data;
        },
        restaurant_iframes: restaurant_iframes,
        restaurant_nightly_feedback_forms: restaurant_nightly_feedback_forms,
        restaurant_nightly_feedback_forms_post: function (data) {
            return $http({
                url: $rootScope.pathToBackend + "restaurant/form/nightly-feedback/post.php",
                method: "POST",
                data: data
            })

        }
    }
}]);