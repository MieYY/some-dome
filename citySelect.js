/**
 * citySelect.init('#province','#city','#area'); // 三级联查
 * */

/*省
 * proSelid 省下拉框的id
 * */
var citySelect = {
	/*省
	 * proSelid 省下拉框的id
	 * */
	showProvince:function(proSelid){
		action_getAllProvince(function(head,data){
			if(data.status == true) {
				$(''+proSelid+'').empty();
				$(''+proSelid+'').append('<option  value="">请选择省</option>');
				for(var i = 0; i < data.obj.length; i++) {
					var provinceid = data.obj[i].provinceid; //id
					var province = data.obj[i].province; //省名
					var provincestring = "<option  value=\"" + provinceid + "\" >" + province + "</option>";
					$(''+proSelid+'').append(provincestring);
				};
			} else if(data.status == false) {}
		})
	},	
	/*市
	 * citySelid 城市下拉框的id
	 * proid 省的id
	 * */
	showCity:function(citySelid,areaSelid,proid){
		action_getCityByProvince(proid,function(head,data){
			if(data.status == true) {
				$(''+citySelid+'').empty();
				$(''+citySelid+'').append('<option  value="">请选择市</option>');
				$(''+areaSelid+'').empty();
				$(''+areaSelid+'').append('<option  value="">请选择区</option>');
				for(var i = 0; i < data.obj.length; i++) {
					var cityid = data.obj[i].cityid; //id
					var city = data.obj[i].city; //名
					var citystring = "<option value=\"" + cityid + "\" >" + city + "</option>";
					$(''+citySelid+'').append(citystring);
				};
			} else if(data.status == false) {}
		})
	},
	/* 区县
	 * areaSelid 城市下拉框的id
	 * cityid 城市的id
	 * */
	showArea:function(areaSelid,cityid){
		action_getAreaByCity(cityid,function(head,data){
			if(data.status == true) {
				$(''+areaSelid+'').empty();
				$(''+areaSelid+'').append('<option  value="">请选择区</option>');
				for(var i = 0; i < data.obj.length; i++) {
					var areaid = data.obj[i].areaid; //id
					var area = data.obj[i].area; //名
					var areastring = "<option value=\"" + areaid + "\" >" + area + "</option>";
					$(''+areaSelid+'').append(areastring);
				};
			} else if(data.status == false) {}
		})
	},
	/*初始化*/
	init:function(proSelid,citySelid,areaSelid){
		citySelect.showProvince(proSelid);
		$(''+proSelid+'').change(function(){
			var proid = $(this).val();
			citySelect.showCity(citySelid,areaSelid,proid);
		});
		$(''+citySelid+'').change(function(){
			var cityid = $(this).val();
			citySelect.showArea(areaSelid,cityid);
		});
	}
}
