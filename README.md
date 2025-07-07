<h1 style="text-align:center;"> Building a map of the whole history using Wikidata and SQLite</h1>

## [Demo](https://feverzsj.github.io/histmap/)

## Dataset

[Wikidata](https://www.wikidata.org/) is the largest structured open knowledge dataset on the web. It consists of [items](https://www.wikidata.org/wiki/Help:Items) (indexed by Qid) and [properties](https://www.wikidata.org/wiki/Help:Properties) (indexed by Pid). Knowledge about a item is represented via statements, whose basic structure is: Subject(item), Predicate(property) and Object(item or value). For example, one of Tim Berners-Lee([Q80](https://www.wikidata.org/wiki/Q80))'s employers([P108](https://www.wikidata.org/wiki/Property:P108)) was CERN([Q42944](https://www.wikidata.org/wiki/Q42944)).

 Since the items of interest are spatial temporal, they should have both location and date related properties:

 - coordinate([P625](https://www.wikidata.org/wiki/Property:P625)), location([P276](https://www.wikidata.org/wiki/Property:P276)), street([P669](https://www.wikidata.org/wiki/Property:P669)), admin([P131](https://www.wikidata.org/wiki/Property:P131)), juri([P1001](https://www.wikidata.org/wiki/Property:P1001)), country([P17](https://www.wikidata.org/wiki/Property:P17))
 - start time([P580](https://www.wikidata.org/wiki/Property:P580)), end time([P582](https://www.wikidata.org/wiki/Property:P582)), point in time([P585](https://www.wikidata.org/wiki/Property:P585))
 
 Items of no historical significance are ignored, mainly including static objects (like buildings and roads), recurring events (like sports and ceremonies) and etc. Most items' classes([P31](https://www.wikidata.org/wiki/Property:P31)) are also remapped to a limited set of classes to make them more manageable.

 The json [dump](https://dumps.wikimedia.org/wikidatawiki/entities/) ([doc](https://doc.wikimedia.org/Wikibase/master/php/docs_topics_json.html)) is chosen for import. Importing from gzip compressed dump takes more than 1.6 hours, as the main bottleneck is decompression. Converting the dump to zstd (level 6) decreases the time to less than 50 minutes on my potato PC (i3-3220, 8GB RAM, 7200RPM HDD).


## Database

Imported items are stored in a [rtree index](https://www.sqlite.org/rtree.html) inside a small SQLite database with each item's coordinate and date as indexed ranges. A rtree index is able to qurey all these ranges at once.

Date is stored as `YearMMDD`<sub>10</sub> in int32. Negative date represents BCE (before the common era). Zero is not used. To keep dates monotonically increase, negative dates of same year are reversed as `-Year(12-MM)(31-DD)`<sub>10</sub>.

The resulted databse is directly loaded into browser using [wasm](https://www.sqlite.org/wasm).


## Source code

Frontend realted source code is in this reposity.

Import related source code is located [here](https://github.com/feverzsj/dsk/tree/master/example/wiki_hist).
