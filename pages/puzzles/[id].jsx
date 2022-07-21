/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useFetch } from "../../lib/fetcher";
import { useRouter } from 'next/router';

export default function Puzzle({}) {
    const router = useRouter();
    if (!router.isFallback && !router.query.id) {
        return (<div></div>);
    }

    const scoresResponse = useFetch(`/api/scores?id=${router.query.id}`);
    const globalScoresResponse = useFetch(`/api/global-scores?id=${router.query.id}`);

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [aUpChecked, setAUpChecked] = useState(false);
    const [aLeftChecked, setALeftChecked] = useState(true);
    const [bUpChecked, setBUpChecked] = useState(true);
    const [bCenterChecked, setBcenterChecked] = useState(false);
    const [cUpChecked, setCUpChecked] = useState(false);
    const [cRightChecked, setCRightChecked] = useState(true);
    const [dMiddleChecked, setDMiddleChecked] = useState(false);
    const [dLeftChecked, setDLeftChecked] = useState(false);
    const [eMiddleChecked, setEMiddleChecked] = useState(false);
    const [eCenterChecked, setECenterChecked] = useState(true);
    const [fMiddleChecked, setFMiddleChecked] = useState(true);
    const [fRightChecked, setFRightChecked] = useState(false);
    const [gDownChecked, setGDownChecked] = useState(false);
    const [gLeftChecked, setGleftChecked] = useState(false);
    const [hDownChecked, setHDownhecked] = useState(true);
    const [hCenterChecked, setHCenterhecked] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
        }, 10);
        } else if (!running) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    const winner = aUpChecked &&
        aLeftChecked &&
        bCenterChecked &&
        bUpChecked &&
        cUpChecked &&
        cRightChecked &&
        dMiddleChecked &&
        dLeftChecked &&
        dMiddleChecked &&
        eMiddleChecked &&
        eCenterChecked &&
        fMiddleChecked &&
        fRightChecked &&
        gDownChecked &&
        gLeftChecked &&
        hCenterChecked &&
        hDownChecked

    if (winner) {
        setRunning(false)
    }

    return (
        <>
        {router.isFallback ? (
        <div>Loading…</div>
        ) : (
            <>
                <div className="stopwatch">
                    <div className="numbers">
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                    </div>
                </div>
                <input type="checkbox" id="cheat" />
                <input type="radio" id="cage" name="image" defaultChecked={true} />

                <input type="radio" id="a-up" name="a-vertical" onChange={() => { setAUpChecked(!aUpChecked) }}/>
                <input type="radio" id="a-middle" name="a-vertical" defaultChecked={true} />
                <input type="radio" id="a-down" name="a-vertical" />
                <input type="radio" id="a-left" name="a-horazontal" defaultChecked={true} onChange={() => { setALeftChecked(!aLeftChecked) }} />
                <input type="radio" id="a-center" name="a-horazontal" />
                <input type="radio" id="a-right" name="a-horazontal" />
                <input type="radio" id="b-up" name="b-vertical" defaultChecked={true} onChange={() => { setBUpChecked(!bUpChecked) }} />
                <input type="radio" id="b-middle" name="b-vertical" />
                <input type="radio" id="b-down" name="b-vertical" />
                <input type="radio" id="b-left" name="b-horazontal" defaultChecked={true} />
                <input type="radio" id="b-center" name="b-horazontal" onChange={() => { setBcenterChecked(!bCenterChecked) }}/>
                <input type="radio" id="b-right" name="b-horazontal" />
                <input type="radio" id="c-up" name="c-vertical" onChange={() => { setCUpChecked(!cUpChecked) }} />
                <input type="radio" id="c-middle" name="c-vertical" defaultChecked={true} />
                <input type="radio" id="c-down" name="c-vertical" />
                <input type="radio" id="c-left" name="c-horazontal" />
                <input type="radio" id="c-center" name="c-horazontal" />
                <input type="radio" id="c-right" name="c-horazontal" defaultChecked={true} onChange={() => { setCRightChecked(!cRightChecked) }} />
                <input type="radio" id="d-up" name="d-vertical" defaultChecked={true} />
                <input type="radio" id="d-middle" name="d-vertical" onChange={() => { setDMiddleChecked(!dMiddleChecked) }} />
                <input type="radio" id="d-down" name="d-vertical" />
                <input type="radio" id="d-left" name="d-horazontal" onChange={() => { setDLeftChecked(!dLeftChecked) }} />
                <input type="radio" id="d-center" name="d-horazontal" defaultChecked={true} />
                <input type="radio" id="d-right" name="d-horazontal" />
                <input type="radio" id="e-up" name="e-vertical" />
                <input type="radio" id="e-middle" name="e-vertical" onChange={() => { setEMiddleChecked(!eMiddleChecked) }}/>
                <input type="radio" id="e-down" name="e-vertical" defaultChecked={true} />
                <input type="radio" id="e-left" name="e-horazontal" />
                <input type="radio" id="e-center" name="e-horazontal" defaultChecked={true} onChange={() => { setECenterChecked(!eCenterChecked) }} />
                <input type="radio" id="e-right" name="e-horazontal" />
                <input type="radio" id="f-up" name="f-vertical" />
                <input type="radio" id="f-middle" name="f-vertical" defaultChecked={true} onChange={() => { setFMiddleChecked(!fMiddleChecked) }} />
                <input type="radio" id="f-down" name="f-vertical" />
                <input type="radio" id="f-left" name="f-horazontal" />
                <input type="radio" id="f-center" name="f-horazontal" defaultChecked={true} />
                <input type="radio" id="f-right" name="f-horazontal" defaultChecked={true} onChange={() => { setFRightChecked(!fRightChecked) }} />
                <input type="radio" id="g-up" name="g-vertical" defaultChecked={true} />
                <input type="radio" id="g-middle" name="g-vertical" />
                <input type="radio" id="g-down" name="g-vertical" onChange={() => { setGDownChecked(!gDownChecked) }} />
                <input type="radio" id="g-left" name="g-horazontal" onChange={() => { setGleftChecked(!gLeftChecked) }} />
                <input type="radio" id="g-center" name="g-horazontal" />
                <input type="radio" id="g-right" name="g-horazontal" defaultChecked={true} />
                <input type="radio" id="h-up" name="h-vertical" />
                <input type="radio" id="h-middle" name="h-vertical" />
                <input type="radio" id="h-down" name="h-vertical" defaultChecked={true} onChange={() => { setHDownhecked(!hDownChecked) }}  />
                <input type="radio" id="h-left" name="h-horazontal" defaultChecked={true} />
                <input type="radio" id="h-center" name="h-horazontal" onChange={() => { setHCenterhecked(!hCenterChecked) }}  />
                <input type="radio" id="h-right" name="h-horazontal" />

                <div className="highscore-box global-score">
                    <h4>Top global</h4>
                    {globalScoresResponse.data.length > 0 ?
                    (<div className='score-table'>
                        <div className="score-table-header">
                            <div>Name</div>
                            <div>Time</div>
                        </div>
                        <div className="score-table-body">
                            {
                                globalScoresResponse.data.map((score) => {
                                    return (
                                        <div className="score-table-body-row" key={score.name}>
                                            <div className="score-table-body-cell">
                                                {score.name}
                                            </div>
                                            <div className="score-table-body-cell">
                                                {score.time}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>)
                    : (<div>Without data</div>)}
                </div>
                <div className="board" onClick={() => { setRunning(true) }}>
                    <div className="peice-a">
                        <label htmlFor="a-up"></label>
                        <label htmlFor="a-middle"></label>
                        <label htmlFor="a-down"></label>
                        <label htmlFor="a-left"></label>
                        <label htmlFor="a-center"></label>
                        <label htmlFor="a-right"></label>
                    </div>
                    <div className="peice-b">
                        <label htmlFor="b-up"></label>
                        <label htmlFor="b-middle"></label>
                        <label htmlFor="b-down"></label>
                        <label htmlFor="b-left"></label>
                        <label htmlFor="b-center"></label>
                        <label htmlFor="b-right"></label>
                    </div>
                    <div className="peice-c">
                        <label htmlFor="c-up"></label>
                        <label htmlFor="c-middle"></label>
                        <label htmlFor="c-down"></label>
                        <label htmlFor="c-left"></label>
                        <label htmlFor="c-center"></label>
                        <label htmlFor="c-right"></label>
                    </div>
                    <div className="peice-d">
                        <label htmlFor="d-up"></label>
                        <label htmlFor="d-middle"></label>
                        <label htmlFor="d-down"></label>
                        <label htmlFor="d-left"></label>
                        <label htmlFor="d-center"></label>
                        <label htmlFor="d-right"></label>
                    </div>
                    <div className="peice-e">
                        <label htmlFor="e-up"></label>
                        <label htmlFor="e-middle"></label>
                        <label htmlFor="e-down"></label>
                        <label htmlFor="e-left"></label>
                        <label htmlFor="e-center"></label>
                        <label htmlFor="e-right"></label>
                    </div>
                    <div className="peice-f">
                        <label htmlFor="f-up"></label>
                        <label htmlFor="f-middle"></label>
                        <label htmlFor="f-down"></label>
                        <label htmlFor="f-left"></label>
                        <label htmlFor="f-center"></label>
                        <label htmlFor="f-right"></label>
                    </div>
                    <div className="peice-g">
                        <label htmlFor="g-up"></label>
                        <label htmlFor="g-middle"></label>
                        <label htmlFor="g-down"></label>
                        <label htmlFor="g-left"></label>
                        <label htmlFor="g-center"></label>
                        <label htmlFor="g-right"></label>
                    </div>
                    <div className="peice-h">
                        <label htmlFor="h-up"></label>
                        <label htmlFor="h-middle"></label>
                        <label htmlFor="h-down"></label>
                        <label htmlFor="h-left"></label>
                        <label htmlFor="h-center"></label>
                        <label htmlFor="h-right"></label>
                    </div>
                    <div className="peice-a img"></div>
                    <div className="peice-b img"></div>
                    <div className="peice-c img"></div>
                    <div className="peice-d img"></div>
                    <div className="peice-e img"></div>
                    <div className="peice-f img"></div>
                    <div className="peice-g img"></div>
                    <div className="peice-h img"></div>
                </div>
                <div className="highscore-box score">
                    <h4>Top in nft</h4>
                    {scoresResponse.data.length > 0 ?
                    (<div className='score-table'>
                        <div className="score-table-header">
                            <div>Name</div>
                            <div>Time</div>
                        </div>
                        <div className="score-table-body">
                            {
                                scoresResponse.data.map((score) => {
                                    return (
                                        <div className="score-table-body-row" key={score.name}>
                                            <div className="score-table-body-cell">
                                                {score.name}
                                            </div>
                                            <div className="score-table-body-cell">
                                                {score.time}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>)
                    : (<div>Without data</div>)}

                </div>
                <div className="winner">WINNER!</div>
            </>
            )}

        <style jsx>{`
            input[type="radio"]{
                display:none;
            }
            #cheat{
                position:absolute;
                bottom:0;
                right:0;
                visibility: none;
            }
            #cheat:checked ~ input[type="radio"]{
                display:block;
            }
            #cheat:checked ~ input[type="radio"]::after{
                content:attr(id);
                color:#fff;
                display:block;
                padding-left:1em;
                width:30em;
            }
            #a-up,#a-left,#b-up,#b-center,#c-up,#c-right,#d-middle,#d-left,#e-middle,#e-center,
            #f-middle,#f-right,#g-down,#g-left,#h-down,#h-center{
                outline:2px solid red;
            }
            .board{
                font-size:1vmin;
                outline:2em solid #333;
                width:60em;
                height:60em;
                position:absolute;
                left:calc(50% - 30em);
                top:calc(50% - 30em);
                overflow:hidden;
            }
            .peice-a, .peice-b, .peice-c, .peice-d, .peice-e, .peice-f, .peice-g, .peice-h{
                --x:20em;
                position:absolute;
                width:20em;
                height:20em;
                transform:translate(var(--x),var(--y));
                transition:transform .5s;
            }
            .peice-a.img, .peice-b.img, .peice-c.img, .peice-d.img, .peice-e.img, .peice-f.img, .peice-g.img, .peice-h.img{
                background-size:60em 60em;
                border-radius:2em;
                box-shadow:inset 0 0 0em .2em #eee,
                inset 1em 1em 1em #eee5,
                inset -1em -1em 1em #0005;
                box-sizing:box-border;
            }
            .peice-a.img{
                background-position:top left;
            }
            .peice-b.img{
                background-position:top center;
            }
            .peice-c.img{
                background-position:top right;
            }
            .peice-d.img{
                background-position:center left;
            }
            .peice-e.img{
                background-position:center center;
            }
            .peice-f.img{
                background-position:center right;
            }
            .peice-g.img{
                background-position:bottom left;
            }
            .peice-h.img{
                background-position:bottom center;
            }
            .peice-a label, .peice-b label, .peice-c label, .peice-d label, .peice-e label, .peice-f label, .peice-g label, .peice-h label{
                display:block;
                width: 13em;
                height: 13em;
                position:absolute;
                transform:rotate(45deg);
                background:#444;
            }
            .peice-a label:hover, .peice-b label:hover, .peice-c label:hover, .peice-d label:hover, .peice-e label:hover, .peice-f label:hover, .peice-g label:hover, .peice-h label:hover{
                background:#666;
                outline:.5em solid #111;
            }
            .peice-a label[for$="up"], .peice-b label[for$="up"], .peice-c label[for$="up"], .peice-d label[for$="up"], .peice-e label[for$="up"], .peice-f label[for$="up"], .peice-g label[for$="up"], .peice-h label[for$="up"]{
                top: -6em;
                left:3.5em;
            }
            .peice-a label[for$="middle"], .peice-b label[for$="middle"], .peice-c label[for$="middle"], .peice-d label[for$="middle"], .peice-e label[for$="middle"], .peice-f label[for$="middle"], .peice-g label[for$="middle"], .peice-h label[for$="middle"]{
                display:none;
                z-index:5;
                left:3.5em;
            }
            .peice-a label[for$="down"], .peice-b label[for$="down"], .peice-c label[for$="down"], .peice-d label[for$="down"], .peice-e label[for$="down"], .peice-f label[for$="down"], .peice-g label[for$="down"], .peice-h label[for$="down"]{
                bottom: -6em;
                left:3.5em;
            }
            .peice-a label[for$="left"], .peice-b label[for$="left"], .peice-c label[for$="left"], .peice-d label[for$="left"], .peice-e label[for$="left"], .peice-f label[for$="left"], .peice-g label[for$="left"], .peice-h label[for$="left"]{
                left: -6em;
                top:3.5em;
            }
            .peice-a label[for$="center"], .peice-b label[for$="center"], .peice-c label[for$="center"], .peice-d label[for$="center"], .peice-e label[for$="center"], .peice-f label[for$="center"], .peice-g label[for$="center"], .peice-h label[for$="center"]{
                display:none;
                z-index:5;
                top:3.5em;
            }
            .peice-a label[for$="right"], .peice-b label[for$="right"], .peice-c label[for$="right"], .peice-d label[for$="right"], .peice-e label[for$="right"], .peice-f label[for$="right"], .peice-g label[for$="right"], .peice-h label[for$="right"]{
                right: -6em;
                top:3.5em;
            }

            #a-up:checked ~* [for="a-middle"],
            #b-up:checked ~* [for="b-middle"],
            #c-up:checked ~* [for="c-middle"],
            #d-up:checked ~* [for="d-middle"],
            #e-up:checked ~* [for="e-middle"],
            #f-up:checked ~* [for="f-middle"],
            #g-up:checked ~* [for="g-middle"],
            #h-up:checked ~* [for="h-middle"]{
                display:block;
                transform:translate(0,13em) rotate(45deg);
            }
            #a-down:checked ~* [for="a-middle"],
            #b-down:checked ~* [for="b-middle"],
            #c-down:checked ~* [for="c-middle"],
            #d-down:checked ~* [for="d-middle"],
            #e-down:checked ~* [for="e-middle"],
            #f-down:checked ~* [for="f-middle"],
            #g-down:checked ~* [for="g-middle"],
            #h-down:checked ~* [for="h-middle"]{
                display:block;
                transform:translate(0,-6em) rotate(45deg);
            }
            #a-left:checked ~* [for="a-center"],
            #b-left:checked ~* [for="b-center"],
            #c-left:checked ~* [for="c-center"],
            #d-left:checked ~* [for="d-center"],
            #e-left:checked ~* [for="e-center"],
            #f-left:checked ~* [for="f-center"],
            #g-left:checked ~* [for="g-center"],
            #h-left:checked ~* [for="h-center"]{
                display:block;
                transform:translate(13em,0) rotate(45deg);
            }
            #a-right:checked ~* [for="a-center"],
            #b-right:checked ~* [for="b-center"],
            #c-right:checked ~* [for="c-center"],
            #d-right:checked ~* [for="d-center"],
            #e-right:checked ~* [for="e-center"],
            #f-right:checked ~* [for="f-center"],
            #g-right:checked ~* [for="g-center"],
            #h-right:checked ~* [for="h-center"]{
                display:block;
                transform:translate(-6em,0) rotate(45deg);
            }

            #a-up:checked ~ * .peice-a,
            #b-up:checked ~ * .peice-b,
            #c-up:checked ~ * .peice-c,
            #d-up:checked ~ * .peice-d,
            #e-up:checked ~ * .peice-e,
            #f-up:checked ~ * .peice-f,
            #g-up:checked ~ * .peice-g,
            #h-up:checked ~ * .peice-h{
                --y:0;
            }
            #a-middle:checked ~ * .peice-a,
            #b-middle:checked ~ * .peice-b,
            #c-middle:checked ~ * .peice-c,
            #d-middle:checked ~ * .peice-d,
            #e-middle:checked ~ * .peice-e,
            #f-middle:checked ~ * .peice-f,
            #g-middle:checked ~ * .peice-g,
            #h-middle:checked ~ * .peice-h{
                --y:20em;
            }
            #a-down:checked ~ * .peice-a,
            #b-down:checked ~ * .peice-b,
            #c-down:checked ~ * .peice-c,
            #d-down:checked ~ * .peice-d,
            #e-down:checked ~ * .peice-e,
            #f-down:checked ~ * .peice-f,
            #g-down:checked ~ * .peice-g,
            #h-down:checked ~ * .peice-h{
                --y:40em;
            }
            #a-left:checked ~ * .peice-a,
            #b-left:checked ~ * .peice-b,
            #c-left:checked ~ * .peice-c,
            #d-left:checked ~ * .peice-d,
            #e-left:checked ~ * .peice-e,
            #f-left:checked ~ * .peice-f,
            #g-left:checked ~ * .peice-g,
            #h-left:checked ~ * .peice-h{
                --x:0;
            }
            #a-center:checked ~ * .peice-a,
            #b-center:checked ~ * .peice-b,
            #c-center:checked ~ * .peice-c,
            #d-center:checked ~ * .peice-d,
            #e-center:checked ~ * .peice-e,
            #f-center:checked ~ * .peice-f,
            #g-center:checked ~ * .peice-g,
            #h-center:checked ~ * .peice-h{
                --x:20em;
            }
            #a-right:checked ~ * .peice-a,
            #b-right:checked ~ * .peice-b,
            #c-right:checked ~ * .peice-c,
            #d-right:checked ~ * .peice-d,
            #e-right:checked ~ * .peice-e,
            #f-right:checked ~ * .peice-f,
            #g-right:checked ~ * .peice-g,
            #h-right:checked ~ * .peice-h{
                --x:40em;
            }
            .winner{
                font-family:arial;
                color: #fff;
                text-align: center;
                font-size: 4vw;
                z-index: 100;
                width:100%;
                height:2em;
                position:absolute;
                top:calc(50% - 1em);
                line-height: 2em;
                background: red;
                // transform:scale(0);
            }
            #a-up:checked ~ #a-left:checked ~ #b-up:checked ~ #b-center:checked ~ #c-up:checked ~ #c-right:checked ~ #d-middle:checked ~ #d-left:checked ~ #e-middle:checked ~ #e-center:checked ~ #f-middle:checked ~ #f-right:checked ~ #g-down:checked ~ #g-left:checked ~ #h-down:checked ~ #h-center:checked ~ .winner{
                animation:winner 3s 1 1s;
            }
            @keyframes winner{
                0%,100%{transform:scale(0);}
                10%,90%{transform:scale(1);}
            }

            .selectBG{
                display:inline-block;
                font-family:arial;
                font-size:2vmin;
                width:8em;
                text-align:center;
                padding:1em 0;
                background:#000;
                color:#fff;
                border:.25em solid #333;
                margin:2em .25em;
            }
            #cage:checked ~ *[for="cage"],
            #cageAnim:checked ~ *[for="cageAnim"],
            #cageKitten:checked ~ *[for="cageKitten"]{
                border-bottom-color:teal;
            }
            #cage:checked ~ * .peice-a.img, .peice-b.img, .peice-c.img, .peice-d.img, .peice-e.img, .peice-f.img, .peice-g.img, .peice-h.img{
                background-image:url(https://media.raritysniper.com/bored-ape-yacht-club/66-600.webp?cacheId=2);
            }
            .stopwatch {
                color: white;
                font-size: 24px;
                margin-top: 3%
            }
            .highscore-box {
                position: absolute;
                height: 26em;
                padding: 20px;
                border-radius: 29px;
                background: white;
                width: 12em;
            }
            .highscore-box.global-score {
                top: calc(50% - 13em);
                left: calc(50% - 30em);
            }
            .highscore-box.score {
                top: calc(50% - 13em);
                right: calc(50% - 30em);
            }
        `}</style>
        <style jsx global>{`
            body{
                margin:0;
                background:#222;
                text-align:center;
            }
        `}</style>
        </>
    )
}
