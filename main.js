function saveValue(k, v)
{
    localStorage.setItem(k, JSON.stringify(v));
}

function restoreValue(k, def = null)
{
    const v = localStorage.getItem(k);
    return (v !== null) ? JSON.parse(v) : def;
}


webix.ui({
    view: 'window',
    id: 'splash',
    head: false,
    position: 'center',
    modal: true,  
    body:{
        view:'align', align:'middle,center',
        body:{ view:'button', label:'Loading...'}
    }
}).show();


(async function(){

let sqlite3;
let db;
let tsQuery;
let map;

await Promise.all([
    (async function()
    {
        sqlite3 = await sqlite3InitModule();
        db = new sqlite3.oo1.DB();

        const buf = await fetch('wiki_hist.sqlite').then(res => res.arrayBuffer());
        const p = sqlite3.wasm.allocFromTypedArray(buf);

        const rc = sqlite3.capi.sqlite3_deserialize(
            db.pointer, 'main', p, buf.byteLength, buf.byteLength,
            sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE
            // | sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE
        );

        db.checkRc(rc);

        tsQuery = db.prepare('SELECT * FROM items WHERE minX <= $maxX AND maxX >= $minX'
                                                + ' AND minY <= $maxY AND maxY >= $minY'
                                                + ' AND minT <  $maxT AND maxT >= $minT'
                                                + ' LIMIT $limit');
    })(),
    (async function()
    {
        maplibregl.setRTLTextPlugin(
            'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js',
            true // Lazy load the plugin
        );

        map = new maplibregl.Map
        ({
            container: 'map',
            //style: 'https://demotiles.maplibre.org/style.json',
            style: 'https://tiles.openfreemap.org/styles/liberty',
            //style: 'https://tiles.openfreemap.org/styles/positron',
            //style: 'https://tiles.openfreemap.org/styles/bright',
            //style: 'https://tiles.versatiles.org/assets/styles/colorful/style.json',
            //style: 'https://www.openhistoricalmap.org/map-styles/main/main.json',
            center: restoreValue('center', [66.26883, 28.49021]),
            zoom: restoreValue('zoom', 2.3)
        });

        await map.once('load');

        map.addControl(new maplibregl.NavigationControl(), 'top-right');
        map.addControl(new maplibregl.GlobeControl(), 'top-right');
        map.addControl(new maplibregl.ScaleControl());

        const imgCfg = {
            others: 'img/others.png',
            ball: 'img/ball.png',
            shooting: 'img/shooting.png',
            mass_shooting: 'img/mass_shooting.png',
            robbery: 'img/robbery.png',
            bridge_failure: 'img/bridge_failure.png',
            airstrike: 'img/airstrike.png',
            battle: 'img/battle.png',
            siege: 'img/siege.png',
            concert: 'img/concert.png',
            conflict: 'img/conflict.png',
            aviation_accident: 'img/aviation_accident.png',
            aviation_incident: 'img/aviation_incident.png',
            earthquake: 'img/earthquake.png',
            occurrence: 'img/occurrence.png',
            massacre: 'img/massacre.png',
            nuclear_explosion: 'img/nuclear_explosion.png',
            disease_outbreak: 'img/disease_outbreak.png',
            homicide: 'img/homicide.png',
            naval_battle: 'img/naval_battle.png',
            war: 'img/war.png',
            military_operation: 'img/military_operation.png',
            train_wreck: 'img/train_wreck.png',
            murder: 'img/murder.png',
            event: 'img/event.png',
            demonstration: 'img/demonstration.png',
            convention: 'img/convention.png',
            treaty: 'img/treaty.png',
            terrorist_attack: 'img/terrorist_attack.png',
            research: 'img/research.png',
            military_campaign: 'img/military_campaign.png',
            rebellion: 'img/rebellion.png',
            riot: 'img/riot.png',
            protest: 'img/protest.png',
            voting: 'img/voting.png',
            expedition: 'img/expedition.png',
            wildfire: 'img/wildfire.png',
            bomb_attack: 'img/bomb_attack.png',
            witch_trial: 'img/witch_trial.png',
            archaeological_culture: 'img/archaeological_culture.png',
            archaeological_period: 'img/archaeological_period.png',
            archaeological_site: 'img/archaeological_site.png',
            lake_: 'img/lake.png',
            volcanic_eruption: 'img/volcanic_eruption.png',
            flood: 'img/flood.png',
            disappearance: 'img/disappearance.png',
            arson: 'img/arson.png',
            explosion: 'img/explosion.png',
            structural_failure: 'img/structural_failure.png',
            suicide_attack: 'img/suicide_attack.png',
            car_bombing: 'img/car_bombing.png',
            raid: 'img/raid.png',
            conquest: 'img/conquest.png',
            invasion: 'img/invasion.png',
            historical_country: 'img/historical_country.png',
            historical_period: 'img/historical_period.png',
            glacier: 'img/glacier.png',
            archaeological_artefact: 'img/archaeological_artefact.png',
            revolution: 'img/revolution.png',
            tsunami: 'img/tsunami.png',
            civil_war: 'img/civil_war.png',
            human_settlement: 'img/human_settlement.png',
            synod: 'img/synod.png',
            coup: 'img/coup.png',
            incident: 'img/incident.png',
            papal_election: 'img/papal_election.png',
            attack: 'img/attack.png',
            scandal: 'img/scandal.png',
            corruption_scandal: 'img/corruption_scandal.png',
            fire: 'img/fire.png',
            marian_apparition: 'img/marian_apparition.png',
            genocide: 'img/genocide.png',
            discovery: 'img/discovery.png',
            meteorite: 'img/meteorite.png',
            plague: 'img/plague.png',
            motorsport: 'img/motorsport.png',
            death: 'img/death.png',
            meeting: 'img/meeting.png',
            congress: 'img/congress.png',
            strike: 'img/strike.png',
            famine: 'img/famine.png',
            landslide: 'img/landslide.png',
            temple: 'img/temple.png',
            military_occupation: 'img/military_occupation.png',
            monument_: 'img/monument.png',
            bombardment: 'img/bombardment.png',
            painting: 'img/painting.png',
            palace: 'img/palace.png',
            assassination: 'img/assassination.png',
            coronation: 'img/coronation.png',
            summit: 'img/summit.png',
            independence_war: 'img/independence_war.png',
            inauguration: 'img/inauguration.png',
            oration: 'img/oration.png',
            disaster: 'img/disaster.png',
            chronicle: 'img/chronicle.png',
            crisis: 'img/crisis.png',
            wedding: 'img/wedding.png',
            horse_racing: 'img/horse_racing.png',
            kidnapping: 'img/kidnapping.png',
            international_incident: 'img/international_incident.png',
            duel: 'img/duel.png',
            lynching: 'img/lynching.png',
            gold_rush: 'img/gold_rush.png',
            debate: 'img/debate.png',
            trial: 'img/trial.png',
            chateau: 'img/chateau.png',
            shipwrecking: 'img/shipwrecking.png',
            arrest: 'img/arrest.png',
            political_murder: 'img/political_murder.png',
            fountain: 'img/fountain.png',
            worldexpo: 'img/worldexpo.png',
            square_: 'img/square.png',
            mining_accident: 'img/mining_accident.png',
            stampede: 'img/stampede.png',
            avalanche: 'img/avalanche.png',
            election: 'img/election.png',
            legal_case: 'img/legal_case.png',
            industrial_disaster: 'img/industrial_disaster.png',
            suicide: 'img/suicide.png',
            bank_robbery: 'img/bank_robbery.png',
            fortification: 'img/fortification.png',
            ceremony: 'img/ceremony.png',
            concentration_camp: 'img/concentration_camp.png',
            prison_escape: 'img/prison_escape.png',
            typhoon: 'img/typhoon.png',
            war_crime: 'img/war_crime.png',
            funeral: 'img/funeral.png',
            aircraft_hijacking: 'img/aircraft_hijacking.png',
            criminal_case: 'img/criminal_case.png',
            ufo: 'img/ufo.png',
            tornado: 'img/tornado.png',
            drought: 'img/drought.png',
            guerrilla_warfare: 'img/guerrilla_warfare.png',
            nuclear_accident: 'img/nuclear_accident.png',
            party_conference: 'img/party_conference.png',
            blockade: 'img/blockade.png',
            theft: 'img/theft.png',
            agreement: 'img/agreement.png',
            cyclone: 'img/cyclone.png',
            refugee_camp: 'img/refugee_camp.png',
            oil_spill: 'img/oil_spill.png',
            accident: 'img/accident.png',
            police_operation: 'img/police_operation.png',
            power_outage: 'img/power_outage.png',
            sexual_assult: 'img/sexual_assult.png',
            hurricane: 'img/hurricane.png',
            gale: 'img/gale.png',
            ice_storm: 'img/ice_storm.png',
            olympic_games: 'img/olympic_games.png',
            vehicle_ramming: 'img/vehicle_ramming.png',
            assault: 'img/assault.png',
            drone_attack: 'img/drone_attack.png',
            military_exercise: 'img/military_exercise.png',
            ancient_olympic_games: 'img/ancient_olympic_games.png',
            tribe: 'img/tribe.png',
            legislature: 'img/legislature.png',
            diplomatic_visit: 'img/diplomatic_visit.png',
            missile_strike: 'img/missile_strike.png',
            financial_risk: 'img/financial_risk.png',
            transport_accident: 'img/transport_accident.png',
        };

        const keys = Object.keys(imgCfg);

        const imgs = await Promise.all(Object.values(imgCfg).map((v) => map.loadImage(v)));

        for(let i = 0; i < keys.length; ++i)
        {
            map.addImage(keys[i], imgs[i].data);
        }

        map.addSource('items', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        map.addLayer({
            'id': 'items',
            'type': 'symbol',
            'source': 'items',
            'layout': {
                'icon-image': [
                    'match', ['number', ['get', 'class']],
                    178561, 'battle',
                    188055, 'siege',
                    182832, 'concert',
                    180684, 'conflict',
                    744913, 'aviation_accident',
                    3149875, 'aviation_incident',
                    7944, 'earthquake',
                    3199915, 'massacre',
                    2656967, 'nuclear_explosion',
                    210112, 'nuclear_explosion',
                    3241045, 'disease_outbreak',
                    478515, 'ball',
                    2252077, 'shooting',
                    21480300, 'mass_shooting',
                    53706, 'robbery',
                    11620651, 'bridge_failure',
                    2380335, 'airstrike',
                    1190554, 'occurrence',
                    149086, 'homicide',
                    1261499, 'naval_battle',
                    198, 'war',
                    645883, 'military_operation',
                    1078765, 'train_wreck',
                    132821, 'murder',
                    1656682, 'event',
                    175331, 'demonstration',
                    625994, 'convention',
                    131569, 'treaty',
                    2223653, 'terrorist_attack',
                    42240, 'research',
                    831663, 'military_campaign',
                    124734, 'rebellion',
                    124757, 'riot',
                    273120, 'protest',
                    40231, 'election',
                    2401485, 'expedition',
                    169950, 'wildfire',
                    891854, 'bomb_attack',
                    19902850, 'witch_trial',
                    465299, 'archaeological_culture',
                    15401633, 'archaeological_period',
                    839954, 'archaeological_site',
                    23397, 'lake_',
                    7692360, 'volcanic_eruption',
                    8068, 'flood',
                    3030513, 'disappearance',
                    327541, 'arson',
                    179057, 'explosion',
                    1309431, 'structural_failure',
                    217327, 'suicide_attack',
                    25917154, 'car_bombing',
                    10931, 'revolution',
                    476807, 'raid',
                    1361229, 'conquest',
                    467011, 'invasion',
                    3024240, 'historical_country',
                    11514315, 'historical_period',
                    35666, 'glacier',
                    220659, 'archaeological_artefact',
                    8070, 'tsunami',
                    8465, 'civil_war',
                    486972, 'human_settlement',
                    111161, 'synod',
                    45382, 'coup',
                    12890393, 'incident',
                    29102902, 'papal_election',
                    1174599, 'attack',
                    192909, 'scandal',
                    18343076, 'corruption_scandal',
                    3196, 'fire',
                    507850, 'marian_apparition',
                    41397, 'genocide',
                    12772819, 'discovery',
                    60186, 'meteorite',
                    1516910, 'plague',
                    5367, 'motorsport',
                    4, 'death',
                    2761147, 'meeting',
                    2495862, 'congress',
                    49776, 'strike',
                    168247, 'famine',
                    167903, 'landslide',
                    188686, 'military_occupation',
                    44539, 'temple',
                    4989906, 'monument_',
                    678146, 'bombardment',
                    3305213, 'painting',
                    16560, 'palace',
                    3882219, 'assassination',
                    209715, 'coronation',
                    1072326, 'summit',
                    21994376, 'independence_war',
                    1417098, 'inauguration',
                    861911, 'oration',
                    3839081, 'disaster',
                    18340514, 'chronicle',
                    381072, 'crisis',
                    49836, 'wedding',
                    187916, 'horse_racing',
                    3001412, 'horse_racing',
                    318296, 'kidnapping',
                    1227249, 'international_incident',
                    191503, 'duel',
                    486775, 'lynching',
                    273182, 'gold_rush',
                    179875, 'debate',
                    8016240, 'trial',
                    751876, 'chateau',
                    906512, 'shipwrecking',
                    1403016, 'arrest',
                    1139665, 'political_murder',
                    483453, 'fountain',
                    172754, 'worldexpo',
                    174782, 'square_',
                    1550225, 'mining_accident',
                    2165983, 'stampede',
                    7935, 'avalanche',
                    189760, 'voting',
                    2334719, 'legal_case',
                    68800046, 'industrial_disaster',
                    112298281, 'worldexpo',
                    10737, 'suicide',
                    806824, 'bank_robbery',
                    57821, 'fortification',
                    2627975, 'ceremony',
                    152081, 'concentration_camp',
                    598041, 'prison_escape',
                    140588, 'typhoon',
                    135010, 'war_crime',
                    201676, 'funeral',
                    898712, 'aircraft_hijacking',
                    16738832, 'criminal_case',
                    421, 'ufo',
                    8081, 'tornado',
                    43059, 'drought',
                    80895, 'guerrilla_warfare',
                    1620824, 'nuclear_accident',
                    2288051, 'party_conference',
                    273976, 'blockade',
                    2727213, 'theft',
                    321839, 'agreement',
                    79602, 'cyclone',
                    11822042, 'transport_accident',
                    622499, 'refugee_camp',
                    220187, 'oil_spill',
                    171558, 'accident',
                    1707496, 'police_operation',
                    828827, 'power_outage',
                    673281, 'sexual_assult',
                    34439356, 'hurricane',
                    2144546, 'gale',
                    304958, 'ice_storm',
                    5389, 'olympic_games',
                    25893885, 'vehicle_ramming',
                    365680, 'assault',
                    30588142, 'drone_attack',
                    357104, 'military_exercise',
                    188468, 'ancient_olympic_games',
                    133311, 'tribe',
                    11204, 'legislature',
                    11430552, 'diplomatic_visit',
                    111034471, 'missile_strike',
                    1337875, 'financial_risk',
                    
                    'others'
                ],
                'icon-overlap': 'always',
                'icon-size': 0.4 // scale
            }
        });
    })(),
]);


function toDateRangeStr(minT, maxT)
{
    const toDateStr = function(v)
    {
        let t = Math.abs(v);

        let y = Math.trunc(t / 10000);
        let m = Math.trunc((t -= y * 10000) / 100);
        let d = t - m * 100;

        if(v < 0)
        {
            m = 12 - m;
            d = 31 - d;
        }

        return `${y}${m ? '.' + m : ''}${d ? '.' + d : ''}${v < 0 ? 'BC' : ''}`;
    }

    const beg = toDateStr(minT);

    if(minT === maxT)
    {
        return beg;
    }
    
    const end = toDateStr(maxT);

    return beg + '-' + end;
}

function genItemList(features)
{
    let html = '';
    let i = 0;
    for(const { properties: props } of features)
    {
        html += `<p>${++i}. <a href="https://www.wikidata.org/wiki/Q${props.id}" target="_blank">${props.title}</a> ${toDateRangeStr(props.minT, props.maxT)}</p>`;
    }

    return html;
}


let popupPersisted = false;

const popup = new maplibregl.Popup({
    closeOnClick: true,
}).setMaxWidth('326px');

const tip = new maplibregl.Popup({
    closeButton: false,
}).setMaxWidth('326px');

popup.on('open', () =>
{
    popupPersisted = true;
    tip.remove();
});

popup.on('close', () =>
{
    popupPersisted = false;
});

map.on('click', 'items', (e) =>
{
    popup.setLngLat(e.lngLat).setHTML(genItemList(e.features)).addTo(map);
});

map.on('mousemove', 'items', (e) =>
{
    if(! popupPersisted)
    {
        map.getCanvas().style.cursor = 'pointer';
        tip.setLngLat(e.lngLat).setHTML(genItemList(e.features)).addTo(map);
    }
});

map.on('mouseleave', 'items', () =>
{
    if(! popupPersisted)
    {
        map.getCanvas().style.cursor = '';
        tip.remove();
    }
});



map.on('moveend', updateItems);


function validateAndUpdateItems()
{
    if(this.getParentView().getParentView().validate())
    {
        updateItems();
        popup.remove();
    }
}

$$('splash').close();

webix.ui({
    id: 'ctrlPanel',
    view: 'window',
    head: false,
    width: 426,
    body: {
        type: 'clean',
        view: 'form',
        elements: [
            {
                //type: 'space',
                //margin: 6,
                cols: [
                    {
                        view: 'text',
                        id: 'date',
                        name: 'date',
                        label: 'Date',
                        labelAlign: 'center',
                        labelPosition: 'top',
                        value: restoreValue('date', '2025 3'),
                        on: {
                            onEnter: validateAndUpdateItems
                        }
                    },
                    {
                        view: 'counter',
                        id: 'durDays',
                        label: 'Duration Days',
                        labelAlign: 'center',
                        value: restoreValue('durDays', 100),
                        min: 1,
                        //max: 366,
                        labelPosition: 'top',
                        on: {
                            onChange: validateAndUpdateItems
                        }
                    },
                    {
                        view: 'counter',
                        id: 'limit',
                        label: 'Limit',
                        labelAlign: 'center',
                        value: restoreValue('limit', 1500),
                        min: 1,
                        step: 50,
                        labelPosition: 'top',
                        on: {
                            onChange: validateAndUpdateItems
                        }
                    }
                ]
            },
            {
                cols: [
                    {
                        view: 'button',
                        value: 'Prev Dur',
                        click: function()
                        {
                            if(this.getParentView().getParentView().validate())
                            {
                                const[beg, end, ny, nm, nd, y, m, d] = parseDates();
                                if(y)
                                {
                                    $$('date').setValue(`${y} ${m} ${d}`);
                                    updateItems();
                                    popup.remove();
                                }
                            }
                        }
                    },
                    {
                        view: 'button',
                        value: 'Next Dur',
                        click: function()
                        {
                            if(this.getParentView().getParentView().validate())
                            {
                                const [beg, end, y, m, d, py, pm, pd] = parseDates();
                                if(y)
                                {
                                    $$('date').setValue(`${y} ${m} ${d}`);
                                    updateItems();
                                    popup.remove();
                                }
                            }
                        }
                    },
                    {
                        view: 'button',
                        maxWidth: 66,
                        value: 'Go',
                        click: validateAndUpdateItems
                    },
                    {
                        view: 'button',
                        type: 'icon',
                        icon: 'mdi mdi-help-circle-outline',
                        maxWidth: 28,
                        click: function()
                        {
                            $$('manual').show();
                        }
                    }
                ]
            }
        ],
        rules: {
            'date': function()
            {
                return !!parseDates()[0];
            },
        }
    },
    position: function (state)
    {
        state.top = state.maxHeight - state.height - 40;
        state.left = 30;
    }
}).show();

webix.ui({
    view:'window', 
    head: false,
    width: 30,
    body:{
        view:'toggle',
        type:'icon',
        icon:'mdi mdi-cogs',
        value: true,
        on:{
            onChange: function(v)
            {
                if(v) $$('ctrlPanel').show();
                else  $$('ctrlPanel').hide();
            }
        }
    },
    position: function (state)
    {
        state.top = state.maxHeight - state.height - 40;
        state.left = 0;
    },
}).show();

webix.ui({
    view: 'window',
    id: 'manual',
    head: 'Manual',
    width: 500,
    height: 410,
    move: true,
    close: true,
    resize: true,
    position: 'center',
    hidden: ! restoreValue('firstTime', true),
    body: {
        rows: [
            {
                template: `
                    <ul>
                    <li>Enter the <strong>Date</strong> like:<ul>
                    <li>1996 -&gt; year</li>
                    <li>1996 1 -&gt; year month</li>
                    <li>1996 1 26 -&gt; year month day</li>
                    <li>-1996 -&gt; negative year for BCE date.</li>
                    </ul>
                    </li>
                    <li>Enter or adjust the <strong>Duration Days</strong> for date duration.</li>
                    <li>Enter or adjust the <strong>Limit</strong> of total items shown on the screen.</li>
                    <li>When in any input box, press enter or <strong>Go</strong> to jump to the date duration.</li>
                    <li>Click <strong>Prev Dur</strong>/<strong>Next Dur</strong> to jump to the previous/next date duration.</li>
                    <li>Hover on the markers on the map to show the list of items under the cursor and their date ranges.</li>
                    <li>Click on the markers to persist the list. Click the close button or anywhere on the map to close the list.</li>
                    <li>Click on the links in the list to jump to the corresponding Wikidata pages.</li>
                    <li>Click <span class='mdi mdi-cogs'></span> to show/hide the control panel.</li>
                    <li>Click <span class='mdi mdi-help-circle-outline'></span> to open this manual window.</li>
                    </ul>
                `
            },
            {
                cols: [
                    {},
                    { view: "button", label: "Close", click: function(){ $$('manual').hide(); } },
                    {}
                ]
            }
        ]
    }
});
    
saveValue('firstTime', false);

function parseDates()
{
    let[year, month = 1, day = 1] = $$('date').getValue().match(/-?\d+/g).map(Number);

    month = Math.abs(month);
    day = Math.abs(day);

    if(!year || month > 12 || day > 31)
    {
        return [];
    }

    const tolong = (val) => (val >= 0 ? Math.floor(val) : Math.ceil(val));

    let y = ((year < 0) ? (year + 1) : (year));
    let m = ((month > 2) ? (month + 1) : (--y, month + 13));

    let n = tolong(Math.floor(365.25 * y) + Math.floor(30.6001 * m) + day + 1720995);

    if(day + 31 * (month + 12 * year) >= 14 + 31 * (10 + 12 * 1582))
    {
        let a = tolong(0.01 * y);
        n += 2 - a + tolong(0.25 * a);
    }

    const from_jdn = function(n)
    {
        if(n > 2299160)
        {
            let a = tolong(((n - 1867216) - 0.25) / 36524.25);
            n += 1 + a - tolong(0.25 * a);
        }

        let b = n + 1524;
        let c = tolong(6680 + ((b - 2439870) - 122.1) / 365.25);
        let d = tolong(365 * c + 0.25 * c);
        let e = tolong((b - d) / 30.6001);

        let jy = c - 4715;
        let jm = e - 1;
        let jd = b - d - tolong(30.6001 * e);

        if(jm > 12) jm -= 12;
        if(jm > 2) --jy;
        if(jy <= 0) --jy;

        if(jm === 0) jm = 1;
        if(jd === 0) jd = 1;

        jm = Math.abs(jm);
        jd = Math.abs(jd);
            
        if(jm > 12 || jd > 31)
        {
            return [];
        }

        return [jy, jm, jd];
    };

    const [ny, nm, nd] = from_jdn(n + $$('durDays').getValue());

    if(! ny)
    {
        return [];
    }

    const to_int = function(y, m, d)
    {
        if(y >= 0) return y * 10000 + m * 100 + d;
        else       return y * 10000 - (12 - m) * 100 - (31 - d);
    }

    const beg = to_int(year, month, day);
    const end = to_int(ny, nm, nd)

    const [py, pm, pd] = from_jdn(n - $$('durDays').getValue());

    if(py) return [beg, end, ny, nm, nd, py, pm, pd];
    else   return [beg, end, ny, nm, nd];
}


window.addEventListener('beforeunload', function()
{
    saveValue('center', map.getCenter());
    saveValue('zoom', map.getZoom());
    saveValue('date', $$('date').getValue());
    saveValue('durDays', $$('durDays').getValue());
    saveValue('limit', $$('limit').getValue());
});


function normalizeLongitude(lon)
{
    return (lon % 360 + 540) % 360 - 180
}

//var updateTimer = new SingleShootTimer(updateItems);
function updateItems()
{
    //popup.remove();

    const itemsData = {
        type: 'FeatureCollection',
        features: []
    };

    const [beg, end] = parseDates();
    if(! beg)
    {
        map.getSource('items').setData(itemsData);
        return;
    }

    let limit = $$('limit').getValue();
    if(! limit || limit < 1)
    {
        limit = 1500;
    }

    let [[minX, minY], [maxX, maxY]] = map.getBounds().toArray();
    let bounds;

    if(maxX - minX >= 360)
    {
        bounds = [[-180, minY, 180, maxY]];
    }
    else
    {
        minX = normalizeLongitude(minX);
        maxX = normalizeLongitude(maxX);

        if(minX > maxX)
        {
            bounds = [[minX, minY, 180, maxY], [-180, minY, maxX, maxY]];
        }
        else
        {
            bounds = [[minX, minY, maxX, maxY]];
        }
    }

    for(const[minX, minY, maxX, maxY] of bounds)
    {
        tsQuery.bind({
            $minX: minX * 1e7, $minY: minY * 1e7,
            $maxX: maxX * 1e7, $maxY: maxY * 1e7,
            $minT: beg, $maxT: end,
            $limit: limit
        });

        while(tsQuery.step())
        {
            const f = tsQuery.get({});

            itemsData.features.push({
                type: 'Feature',
                properties: {
                    id: f.id,
                    title: f.title,
                    minT : f.minT,
                    maxT: f.maxT,
                    class: f.class
                },
                geometry: {
                    type: 'Point',
                    coordinates: [f.minX / 1e7, f.minY / 1e7]
                }
            });

            --limit;
        }

        tsQuery.reset();

        if(limit < 1)
        {
            break;
        }
    }

    map.getSource('items').setData(itemsData);
}

updateItems();


})(); // (async function(){
