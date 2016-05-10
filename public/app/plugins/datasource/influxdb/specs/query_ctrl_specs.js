/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["require","exports","test/specs/helpers","test/lib/common","app/plugins/datasource/influxdb/query_ctrl","app/core/services/segment_srv"],function(a,b,c,d){d.describe("InfluxDBQueryCtrl",function(){var a=new c.ControllerTestContext;d.beforeEach(d.angularMocks.module("grafana.core")),d.beforeEach(d.angularMocks.module("grafana.controllers")),d.beforeEach(d.angularMocks.module("grafana.services")),d.beforeEach(a.providePhase()),d.beforeEach(a.createControllerPhase("InfluxQueryCtrl")),d.beforeEach(function(){a.scope.target={},a.scope.$parent={get_data:d.sinon.spy()},a.scope.datasource=a.datasource,a.scope.datasource.metricFindQuery=d.sinon.stub().returns(a.$q.when([]))}),d.describe("init",function(){d.beforeEach(function(){a.scope.init()}),d.it("should init tagSegments",function(){d.expect(a.scope.tagSegments.length).to.be(1)}),d.it("should init measurementSegment",function(){d.expect(a.scope.measurementSegment.value).to.be("select measurement")})}),d.describe("when first tag segment is updated",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0)}),d.it("should update tag key",function(){d.expect(a.scope.target.tags[0].key).to.be("asd"),d.expect(a.scope.tagSegments[0].type).to.be("key")}),d.it("should add tagSegments",function(){d.expect(a.scope.tagSegments.length).to.be(3)})}),d.describe("when last tag value segment is updated",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0),a.scope.tagSegmentUpdated({value:"server1",type:"value"},2)}),d.it("should update tag value",function(){d.expect(a.scope.target.tags[0].value).to.be("server1")}),d.it("should set tag operator",function(){d.expect(a.scope.target.tags[0].operator).to.be("=")}),d.it("should add plus button for another filter",function(){d.expect(a.scope.tagSegments[3].fake).to.be(!0)})}),d.describe("when last tag value segment is updated to regex",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0),a.scope.tagSegmentUpdated({value:"/server.*/",type:"value"},2)}),d.it("should update operator",function(){d.expect(a.scope.tagSegments[1].value).to.be("=~"),d.expect(a.scope.target.tags[0].operator).to.be("=~")})}),d.describe("when second tag key is added",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0),a.scope.tagSegmentUpdated({value:"server1",type:"value"},2),a.scope.tagSegmentUpdated({value:"key2",type:"plus-button"},3)}),d.it("should update tag key",function(){d.expect(a.scope.target.tags[1].key).to.be("key2")}),d.it("should add AND segment",function(){d.expect(a.scope.tagSegments[3].value).to.be("AND")})}),d.describe("when condition is changed",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0),a.scope.tagSegmentUpdated({value:"server1",type:"value"},2),a.scope.tagSegmentUpdated({value:"key2",type:"plus-button"},3),a.scope.tagSegmentUpdated({value:"OR",type:"condition"},3)}),d.it("should update tag condition",function(){d.expect(a.scope.target.tags[1].condition).to.be("OR")}),d.it("should update AND segment",function(){d.expect(a.scope.tagSegments[3].value).to.be("OR"),d.expect(a.scope.tagSegments.length).to.be(7)})}),d.describe("when deleting first tag filter after value is selected",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0),a.scope.tagSegmentUpdated({value:"server1",type:"value"},2),a.scope.tagSegmentUpdated(a.scope.removeTagFilterSegment,0)}),d.it("should remove tags",function(){d.expect(a.scope.target.tags.length).to.be(0)}),d.it("should remove all segment after 2 and replace with plus button",function(){d.expect(a.scope.tagSegments.length).to.be(1),d.expect(a.scope.tagSegments[0].type).to.be("plus-button")})}),d.describe("when deleting second tag value before second tag value is complete",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0),a.scope.tagSegmentUpdated({value:"server1",type:"value"},2),a.scope.tagSegmentUpdated({value:"key2",type:"plus-button"},3),a.scope.tagSegmentUpdated(a.scope.removeTagFilterSegment,4)}),d.it("should remove all segment after 2 and replace with plus button",function(){d.expect(a.scope.tagSegments.length).to.be(4),d.expect(a.scope.tagSegments[3].type).to.be("plus-button")})}),d.describe("when deleting second tag value before second tag value is complete",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0),a.scope.tagSegmentUpdated({value:"server1",type:"value"},2),a.scope.tagSegmentUpdated({value:"key2",type:"plus-button"},3),a.scope.tagSegmentUpdated(a.scope.removeTagFilterSegment,4)}),d.it("should remove all segment after 2 and replace with plus button",function(){d.expect(a.scope.tagSegments.length).to.be(4),d.expect(a.scope.tagSegments[3].type).to.be("plus-button")})}),d.describe("when deleting second tag value after second tag filter is complete",function(){d.beforeEach(function(){a.scope.init(),a.scope.tagSegmentUpdated({value:"asd",type:"plus-button"},0),a.scope.tagSegmentUpdated({value:"server1",type:"value"},2),a.scope.tagSegmentUpdated({value:"key2",type:"plus-button"},3),a.scope.tagSegmentUpdated({value:"value",type:"value"},6),a.scope.tagSegmentUpdated(a.scope.removeTagFilterSegment,4)}),d.it("should remove all segment after 2 and replace with plus button",function(){d.expect(a.scope.tagSegments.length).to.be(4),d.expect(a.scope.tagSegments[3].type).to.be("plus-button")})})})});