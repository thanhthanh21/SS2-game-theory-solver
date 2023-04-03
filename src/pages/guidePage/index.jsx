import React from 'react';
import './style.scss';
import { useRef } from 'react'

export default function GuidePage() {
    const gettingStartedRef = useRef()
    const problemNameRef = useRef()
    const specialPlayerExistsRef = useRef()
    const specialPlayerPropsNum = useRef()
    const normalPlayerNum = useRef()
    const normalPlayerPropsNum = useRef()
    const fitnessFunctionRef = useRef()
    const payoffFunctionRef = useRef()
    const inputToExcelRef = useRef()

    function scrollTo(sectionRef) {
        sectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    return (
        <div className="guide-page">
            <div className="sidebar">
                <div className="sidebar__item__title highlight" onClick={() => scrollTo(gettingStartedRef)}>Getting Started</div>
                <div className="sidebar__item__title" onClick={() => scrollTo(problemNameRef)}>Name of the problem</div>
                <div className="sidebar__item__title" onClick={() => scrollTo(specialPlayerExistsRef)}>Special Player exists</div>
                <div className="sidebar__item__title" onClick={() => scrollTo(specialPlayerPropsNum)}>Number of properties of special player</div>
                <div className="sidebar__item__title" onClick={() => scrollTo(normalPlayerNum)}>Number of normal players</div>
                <div className="sidebar__item__title" onClick={() => scrollTo(normalPlayerPropsNum)}>Number of properties of each normal player</div>
                <div className="sidebar__item__title" onClick={() => scrollTo(fitnessFunctionRef)}>Fitness function</div>
                <div className="sidebar__item__title" onClick={() => scrollTo(payoffFunctionRef)}>Player payoff function</div>
                <div className="sidebar__item__title" onClick={() => scrollTo(inputToExcelRef)}>Input to Excel</div>
            </div>

            <div className="content">
                <section className='section' ref={gettingStartedRef}>
                    <h1>Getting started</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
                <section className='section' ref={problemNameRef}>
                    <h1>Name of the problem</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
                <section className='section' ref={specialPlayerExistsRef}>
                    <h1>Special Player exists.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
                <section className='section' ref={specialPlayerPropsNum}>
                    <h1>Number of properties of special player.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
                <section className='section' ref={normalPlayerNum}>
                    <h1>Number of normal players.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
                <section className='section' ref={normalPlayerPropsNum}>
                    <h1>Number of properties of each normal player.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
                <section className='section' ref={fitnessFunctionRef}>
                    <h1>Fitness function.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
                <section className='section' ref={payoffFunctionRef}>
                    <h1>Player payoff function.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
                <section className='section' ref={inputToExcelRef}>
                    <h1>Input to Excel</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam architecto eos vitae placeat ea non, inventore numquam atque error quidem facilis mollitia recusandae nesciunt, voluptatem facere itaque reprehenderit commodi modi magnam maiores, quisquam hic voluptates! Nostrum expedita ea praesentium a necessitatibus nesciunt non, similique esse numquam maxime voluptatem neque! Tempore!</p>
                </section>
            </div>
        </div>
    )
}