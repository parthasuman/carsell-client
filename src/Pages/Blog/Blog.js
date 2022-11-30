import React from "react";

const Blog = () => {
  return (
    <div>
      <h2 className="text-4xl my-4">This is Blog Pages.</h2>
      <h4 className="text-2xl my-4">
        What are the different ways to manage a state in a React application?
      </h4>
      <p className="my-2">
        Ans: There are four main types of state you need to properly manage in
        your React apps: Local state, Global state, Server state,URL state{" "}
        <br></br>Local (UI) state – Local state is data we manage in one or
        another component.
        <br></br>
        Global (UI) state – Global state is data we manage across multiple
        components.<br></br> Server state – Data that comes from an external
        server that must be integrated with our UI state.<br></br> URL state –
        Data that exists on our URLs, including the pathname and query
        parameters.
      </p>
      <h4 className="text-2xl my-4">How does prototypical inheritance work?</h4>
      <p className="my-2">
        Ans: The Prototypal Inheritance is a feature in javascript used to add
        methods and properties in objects. It is a method by which an object can
        inherit the properties and methods of another object.
      </p>
      <h4 className="text-2xl my-4">
        What is a unit test? Why should we write unit tests?
      </h4>
      <p className="my-4">
        Ans: Unit Testing is a type of software testing where individual units
        or components of a software are tested. <br></br>
        Why should we write unit tests?
        <br></br>
        Ans: They enable you to catch bugs early in the development process.
        Automated unit tests help a great deal with regression testing. They
        detect code smells in your codebase.
      </p>
      <h4 className="text-2xl my-4">React vs. Angular vs. Vue?</h4>
      <p className="my-2">
        Vue provides higher customizability and hence is easier to learn than
        Angular or React. Further, Vue has an overlap with Angular and React
        with respect to their functionality like the use of components. Hence,
        the transition to Vue from either of the two is an easy option.
      </p>
    </div>
  );
};

export default Blog;
