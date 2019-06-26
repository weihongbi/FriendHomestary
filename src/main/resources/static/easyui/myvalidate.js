$.extend($.fn.validatebox.defaults.rules, {    
    // 规则名
	equals: {
    	// 校验器
        validator: function(value,param){
            return value == $(param[0]).val();    
        },  
        // 提示
        message: '两次输入得内容不一致'   
    },
    size: {
    	// 校验器
        validator: function(value,param){
        	var leg = value.length;
            return leg == param;    
        },  
        // 提示
        message: '长度不符合要求'   
    },  
}); 