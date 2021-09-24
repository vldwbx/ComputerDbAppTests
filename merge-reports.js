const junitReportMerger = require('junit-report-merger');
const marge = require('mochawesome-report-generator');
const mochawesomeMerge = require('mochawesome-merge');
const path = require('path');
const { readdirSync } = require('fs');

const reportDir = 'cypress/results';

const mochawesomeJsonFolder = path.join(reportDir, 'mochawesome-reports');
mochawesomeMerge
    .merge({ reportDir: mochawesomeJsonFolder })
    .then(report => {
        marge.create(report, {
            reportFilename: 'index.html',
            reportDir: reportDir
        });
    });

const junitXmlSourceFolder = path.join(reportDir, 'junit-reports');
const junitXmlReportPath = path.join(reportDir, 'TESTS-TestSuites.xml');

const junitXmlSourceFiles = readdirSync(junitXmlSourceFolder)
    .map(fileName => path.join(junitXmlSourceFolder, fileName));

junitReportMerger.mergeFiles(junitXmlReportPath, junitXmlSourceFiles);