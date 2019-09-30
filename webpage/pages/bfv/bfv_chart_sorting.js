

function getWeaponsSubcat(weaponName){
    return weaponSubCats["_" + weaponName.replace(/ |\/|-/g,"")];
}

function initializeSorts(){
    $("#sortRPM").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareRPMs);
        printWeapons();
    });

    $("#sortName").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareNames);
        printWeapons();
    });

    $("#sortBulletSpeed").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareBulletSpeeds);
        printWeapons();
    });

    $("#sortMagSize").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareMagSizes);
        printWeapons();
    });

    $("#sortMaxDamage").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareMaxDamages);
        printWeapons();
    });

    $("#sortInitVertRecoil").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareInitVertRecoil);
        printWeapons();
    });

    $("#sortVertRecoil").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareVertRecoil);
        printWeapons();
    });

    $("#sortHorRecoil").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareHorRecoil);
        printWeapons();
    });

    $("#sortDeployTime").click(function(){
        $("#actionMenu").menu("collapse");
        weaponStatsArray.sort(compareDeployTimes);
        printWeapons();
    });
}

function compareRPMs(a, b){
    if (a.BRoF > b.BRoF){
        return -1;
    }
    if (b.BRoF > a.BRoF){
        return 1;
    }
    return 0;
}

function compareNames(a, b){
    if (a.WeapShowName < b.WeapShowName){
        return -1;
    }
    if (b.WeapShowName < a.WeapShowName){
        return 1;
    }
    return 0;
}


function compareBulletSpeeds(a, b){
    if (a.InitialSpeed > b.InitialSpeed){
        return -1;
    }
    if (b.InitialSpeed > a.InitialSpeed){
        return 1;
    }
    return 0;
}


function compareMagSizes(a, b){
    if (a.MagSize > b.MagSize){
        return -1;
    }
    if (b.MagSize > a.MagSize){
        return 1;
    }
    return 0;
}


function compareMaxDamages(a, b){
    if (a.Damages[0] > b.Damages[0]){
        return -1;
    }
    if (b.Damages[0] > a.Damages[0]){
        return 1;
    }
    return 0;
}

function compareInitVertRecoil(a, b){
    if (a.ADSStandRecoilInitialUp < b.ADSStandRecoilInitialUp){
        return -1;
    }
    if (b.ADSStandRecoilInitialUp < a.ADSStandRecoilInitialUp){
        return 1;
    }
    return 0;
}

function compareVertRecoil(a, b){
    if (a.ADSStandRecoilUp < b.ADSStandRecoilUp){
        return -1;
    }
    if (b.ADSStandRecoilUp < a.ADSStandRecoilUp){
        return 1;
    }
    return 0;
}

function compareHorRecoil(a, b){
    if (a.ADSStandRecoilLeft < b.ADSStandRecoilLeft){
        return -1;
    }
    if (b.ADSStandRecoilLeft < a.ADSStandRecoilLeft){
        return 1;
    }
    return 0;
}

function compareDeployTimes(a, b){
    if (a.DeployTime < b.DeployTime){
        return -1;
    }
    if (b.DeployTime < a.DeployTime){
        return 1;
    }
    return 0;
}


$( function() {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<span>" )
            .addClass( "custom-combobox" )
            .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
            value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
            .appendTo( this.wrapper )
            .val( value )
            .attr( "title", "" )
            .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
            .autocomplete({
                delay: 0,
                minLength: 0,
                source: $.proxy( this, "_source" )
            })
            .tooltip({
                classes: {
                    "ui-tooltip": "ui-state-highlight"
                }
            });

            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
            wasOpen = false;

            $( "<a>" )
            .attr( "tabIndex", -1 )
            .attr( "title", "Show All Items" )
            .tooltip()
            .appendTo( this.wrapper )
            .button({
                icons: {
                    primary: "ui-icon-triangle-1-s"
                },
                text: false
            })
            .removeClass( "ui-corner-all" )
            .addClass( "custom-combobox-toggle ui-corner-right" )
            .on( "mousedown", function() {
                wasOpen = input.autocomplete( "widget" ).is( ":visible" );
            })
            .on( "click", function() {
                input.trigger( "focus" );

                // Close if already visible
                if ( wasOpen ) {
                    return;
                }

                // Pass empty string as value to search for, displaying all results
                input.autocomplete( "search", "" );
            });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                return {
                    label: text,
                    value: text,
                    option: this
                };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
            valueLowerCase = value.toLowerCase(),
            valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if ( valid ) {
                return;
            }

            // Remove invalid value
            this.input
            .val( "" )
            .attr( "title", value + " didn't match any item" )
            .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        },

        refresh: function () {
            selected = this.element.children(":selected");
            this.input.val(selected.text());
        },

        select: function (event, ui) {
            ui.item.option.selected = true;
            self._trigger("selected", event, {
                item: ui.item.option
            });
            select.trigger("change");
        },

        change: function (event, ui) {
            if (!ui.item) {
                var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                    valid = false;
                select.children("option").each(function () {
                    if ($(this).text().match(matcher)) {
                        this.selected = valid = true;
                        return false;
                    };
                });
                if (!valid) {
                    // remove invalid value, as it didn't match anything
                    $(this).val("");
                    select.val("");
                    input.data("autocomplete").term = "";
                    return false;
                };
            };
        }
    });

    $("#shortcutCombobox").combobox({
        select: function (event, ui) {
            $("." + this.value.replace(/ |\//g,""))[0].scrollIntoView({
              behavior: 'smooth'
            });
        }
    });
} );