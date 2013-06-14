'use strict';

mocha.setup('tdd');

var assert = chai.assert,
    expect = chai.expect,
    should = chai.should;

suite('player', function () {
    suite('getPlayerAttributes()', function () {

        this.beforeEach(function () {
            jQuery('#player').append('<div id="playerID" data-player="autoplay=true|width=640|height=360|fb=true|releaseURL=http://link.theplatform.com/s/btn/yIzwkL89PBdK?mbr=true|siteSection=myFWSiteSection"></div>');

            // add multiple players
            jQuery('#players')
                .append('<div class="player" data-player="autoplay=true|width=640|height=360|fb=true|releaseURL=http://link.theplatform.com/s/btn/c8_9hFRvZiQB?mbr=true|siteSection=myFWSiteSection"></div>')
                .append('<div class="player" data-player="autoplay=true|width=400|height=200|fb=true|releaseURL=http://link.theplatform.com/s/btn/tKi4ID3iI0Tm?mbr=true|siteSection=myFWSiteSection"></div>')
                .append('<div class="player" data-player="autoplay=true|width=720|height=480|fb=true|releaseURL=http://link.theplatform.com/s/btn/jivltGVCLTXU?mbr=true|siteSection=myFWSiteSection"></div>')
                .append('<div class="player" data-player="autoplay=true|width=640|height=360|fb=true|releaseURL=http://link.theplatform.com/s/btn/8rjdPiR1XR_3?mbr=true|siteSection=myFWSiteSection"></div>')
                .append('<div class="player" data-player="autoplay=true|width=640|height=360|fb=true|releaseURL=http://link.theplatform.com/s/btn/4EfeflYQCTPm?mbr=true|siteSection=myFWSiteSection"></div>');
        });

        this.afterEach(function () {
            jQuery('#player').empty();
            jQuery('#players').empty();
        });

        var expected = {
            autoplay: 'true',
            width: '640',
            height: '360',
            iframeHeight: '360', //gets added by getPlayerAttributes if not already provided
            iframeWidth: '640', //gets added by getPlayerAttributes if not already provided
            fb: 'true',
            releaseURL: 'http://link.theplatform.com/s/btn/yIzwkL89PBdK?mbr=true',
            siteSection: 'myFWSiteSection'
        };

        var noElementError = "What you passed to getPlayerAttributes() wasn't an element. It was likely something " +
            "like a jQuery object, but try using document.querySelector() or document.querySelectorAll() to get " +
            "the element that you need. We try to not to depend on jQuery where we don't have to.";

        test('converts data-player attributes pipe-separated kv pairs and adds iframeheight and iframewidth', function () {
            var elementAttributes = $f.player.__test__.getPlayerAttributes(document.querySelector('#playerID'));
            assert.deepEqual(elementAttributes, expected, 'getPlayerAttributes returned an object');
        });

        test('throws error when anything besides an HTML element is supplied', function () {
            assert.throws(function () {
                $f.player.__test__.getPlayerAttributes(jQuery('#playerID'));
            }, noElementError);
        });

        test('Throws an error when an array of elements is supplied', function () {
            assert.throws(function () {
                $f.player.__test__.getPlayerAttributes(document.querySelectorAll('.player'));
            }, noElementError);
        });
    });

//            suite('seekTo', function () {
//                test('Tries to seek before the OVP controller was available', function () {
//                    assert.throws(function () {
//                        $f.player.seekTo(3);
//                    }, "The expected controller doesn't exist or wasn't available at the time this was called.");
//                });
//
//                //sets up dummy pdk object for testing
//                window.$pdk = {
//                    controller: {
//                        seekTo: function () {},
//                        seek: function () {}
//                    }
//                }
//
//                test('Seeks to 3 seconds properly (assumes PDK existence)', function () {
//                    assert.strictEqual($f.player.seekTo(3), true);
//                });
//
//                test('Seeks to 0 seconds properly (assumes PDK existence)', function () {
//                    assert.strictEqual($f.player.seekTo(0), true);
//                });
//
//                test("Throws error when value supplied isn't a number", function () {
//                    assert.throws(function () {
//                        $f.player.seekTo();
//                    }, "The value supplied was not a valid number.");
//                });
//
//                test('Seeks to position provided as string', function () {
//                    assert.strictEqual($f.player.seekTo("10"), true);
//                });
//
//                test('Seeks to floating point number', function () {
//                    assert.strictEqual($f.player.seekTo(40.5), true);
//                });
//
//                test('Seeks to floating point number as a string', function () {
//                    assert.strictEqual($f.player.seekTo("12.384734"), true);
//                });
//
//                test('Returns false (and does nothing) with a negative number', function () {
//                    assert.strictEqual($f.player.seekTo(-2), false);
//                });
//
//                test('Returns false (and does nothing) with a negative number as a string', function () {
//                    assert.strictEqual($f.player.seekTo("-30"), false);
//                });
//
//                test('Seeks properly to a supplied time with many, many decimal places', function () {
//                    assert.strictEqual($f.player.seekTo(100.55234582394572328345723048957), true);
//                });
//
//                test("Seeks to a value longer than the video's length", function () {
//                    assert.strictEqual($f.player.seekTo(1000000000000), false);
//                });
//            });
});