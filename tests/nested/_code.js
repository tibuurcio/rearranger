process();

function process() {
    notify();
    process1();
    generateImages();
    generateData();
    notify();
}

function generateImages() {
    notify();
    create();
    execute1();
    execute2();
    notify();
}

function generateData() {
    notify();
    execute1();
    notify();
}

function notify() {
    console.log('notify');
}

function configure() {
    alter();
    console.log('configure');
}

function execute() {
    console.log('execute');
}

function execute1() {
    console.log('execute1');
}

function execute2() {
    console.log('execute2');
}

function monitore() {
    console.log('monitore');
}

function alter() {
    console.log('alter');
}

function process1() {
    notify();
    configure();
    execute();
    monitore();
    notify();
}