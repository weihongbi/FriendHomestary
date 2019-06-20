 
 var topLevelDomain = "http://jci.xiaozhustatic1.com/e19061101/xiaozhu.com";
var domain = "http://jci.xiaozhustatic1.com/e19061101/www.xiaozhu.com";
var webimIframUrl = window.location.protocol+"//xiaozhu.com/webim.html";
var uploadImageUrl = "https://imageupload.xiaozhu.com/imgin4uploadify.php";
var jciUrl = "http://jci.xiaozhustatic3.com/";
var webimYUI = "{{{webimYUI}}}";
var webimV2 = "{{{webimV2}}}";
var client_id_youku = '16edde5f79e61324'; 

document.domain = topLevelDomain;

var hostArray = window.location.hostname.split('.');
if (hostArray.length == 5 && hostArray[2] == 'partner') {
    topLevelDomain = hostArray[1] + '.' + hostArray[2] + '.xiaozhu.com';
} else if (hostArray.length == 4 && hostArray[1] == 'partner') {
    topLevelDomain = hostArray[0] + '.' + hostArray[1] + '.xiaozhu.com';
}

if (typeof(window.jQuery) != "undefined")
{
    if ($("#head_newmsg2"))
    {
        $("#head_newmsg2").hover(
            function () {
                $("#head_newmsg2 a.icon_arrowB").addClass("nav_current");
                $("#head_newmsg2 a.icon_arrowB").removeClass("icon_arrowB");
                $("#head_newmsg2 div.nav_pop ").show();
            },
            function () {
                $("#head_newmsg2 a.nav_current").addClass("icon_arrowB");
                $("#head_newmsg2 a.nav_current").removeClass("nav_current");
                $("#head_newmsg2 div.nav_pop ").hide();
            }
        );
    }
}

function tipBackyardSuccess(classname)
{
    if (typeof(classname) == 'undefined' || classname == '')
        classname = 'tips_right';

    $('.'+classname).show();

    var displayText = 3;
    var showtime=setInterval(function(){
    if(displayText>0)
    {
        displayText--;
        $('.'+classname).show();
    }
    else {
        $('.'+classname).hide();
        clearInterval(showtime);
    }
    },1000);
}

function tipBackyardError(errmsg,classname)
{
    if (typeof(classname) == 'undefined' || classname == '')
        classname = 'tips_error';

    $('.'+classname).html(errmsg);
    $('.'+classname).show();

    var displayText = 3;
    var showtime=setInterval(function(){
    if(displayText>0)
    {
        displayText--;
        $('.'+classname).show();
    }
    else {
        $('.'+classname).hide();
        clearInterval(showtime);
    }
    },1000);
}

function tipBackyardReset(classnameSucc, classnameErr)
{
    if (typeof(classnameSucc) == 'undefined' || classnameSucc == '')
        classnameSucc = 'tips_right';
    $('.'+classnameSucc).hide();

    if (typeof(classnameErr) == 'undefined' || classnameErr == '')
        classnameErr = 'tips_error';
    $('.'+classnameErr).hide();

}
function loadNyroModal()
{
}

//百度站长统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "hm.js-92e8bc890f374994dd570aa15afc99e1.js"/*tpa=https://hm.baidu.com/hm.js?92e8bc890f374994dd570aa15afc99e1*/;
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

 
 var XZWebUrlWriter = {
    getWebPhp : function () {
        return 'http://jci.xiaozhustatic1.com/e19061101/xzweb.php';
    },
    getAjaxPhp : function () {
        return '/ajaxRequest/';
    },
    getRequest : function(url,type) {
        var nexturl = $('input[name=next]').val();
        //if (nexturl).next = nexturl;
        var returnData;
        type = (type == undefined) ? 'json' : type;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            dataType : type,
            async    : false,
            data     : {'_':Math.random()},
            success  : function(datas){returnData = datas;},
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    getRequestSpider : function(busiKey,isReload,url,type, cb, reRequest) {
        var nexturl = $('input[name=next]').val();
        //if (nexturl).next = nexturl;
        var returnData;
        var spiderAvoidToken = localStorage.getItem('SPIDER_AVOID_TOKEN_' + busiKey);
        if (spiderAvoidToken && spiderAvoidToken !== 'undefined') {
            var separator = url.indexOf('?') === -1 ? '?' : '&';
            url = url + separator + 'spiderAvoidToken=' + spiderAvoidToken;
        }
        type = (type == undefined) ? 'json' : type;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            dataType : type,
            async    : false,
            data     : {'_':Math.random()},
            success  : function(datas){
                captchaInterceptors(busiKey,isReload, datas, function () {
                    that.getRequestSpider(busiKey,isReload,url,type, cb, true);
                }, function () {
                    returnData = datas;
                    if (reRequest && cb) {
                        cb();
                    }
                });
            },
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    postRequest : function(url,requestParam) {
        if (!requestParam) var requestParam = {};
        var nexturl = $('input[name=next]').val();
        if (nexturl) requestParam.next = nexturl;
        var that =this;
        var returnData;
        $.ajax({
            type     : "POST",
            url      : url,
            data     : requestParam,
            dataType : 'json',
            async    : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){returnData = datas;},
            error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    revoltReptile:function(XMLHttpRequest){
        var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
        if(reaponseHeader){
            window.location.href = reaponseHeader;
        }
    },
    headTest_ReqUrl :function() {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckBlock';
    },
    getWebIm_ServerUrl: function() {
        return window.location.protocol+'//'+domain+'/webim.php?op=getServerUrl';
    },
    getWebIm_DrawIframeUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawIframe&userid=' + userid;
    },
    getWebIm_DrawBaseBtnUrl: function(next) {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawImBaseBtn&next=' + next;
    },
    getWebIm_DrawZhunaIframeUrl : function () {
        return window.location.protocol+'//'+domain+'/webim.php?op=drawZhunaIframe';
    },
    getWebIm_IframeUrl : function (userId) {
        return webimIframUrl;
    },
    getWebIm_LodgeUnitData: function (roomid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getLodgeUnitData&roomid=' + roomid;
    },
    getWebIm_FavoriteList: function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFavoriteList&userid=' + userid;
    },
    getWebIm_FavoriteGroupDetail: function (groupId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFavoriteGroupDetail&groupId=' + groupId;
    },
    getWebIm_RequestNotificationUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getNotification&terminal=all_web&userid=' + userid;
    },
    getWebIm_RequestUserSysNoticeCnt : function (userid, userrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserSysNoticeCnt&userid=' + userid + '&userrole=' + userrole;
    },
    getWebIm_RequestUserSysNotice : function (userid, userrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserSysNotice&userid=' + userid + '&userrole=' + userrole;
    },
    getWebIm_UserData : function(userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserData&userid=' + userid;
    },
    getWebIm_talkHis : function(isTenant,offset,length) {
        return window.location.protocol+'//'+doamin+'/webim.php?op=loadTalkHis&isTenant=' + isTenant + '&offset=' + offset + '&length=' + length + '&userId=' + currentUser;
    },
    getWebIm_talkMagHis: function(tenantId,luId,length,lastMessageId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=loadTalkMsgHis&tenantId= ' + tenantId + '&luId=' + luId +'&length=' + length + '&lastMessageId= ' + lastMessageId;
    },
    getWebIm_TalkHisUrl : function (landlordid, tenantid, objid, userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getTalkHisUrl&landlordid=' + landlordid + '&tenantid=' + tenantid + '&objid=' + objid + '&userid=' + userid + '&_t=' + new Date().getTime();
    },
    getFkScreenListUrl : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ChatSet' + '&_t=' + new Date().getTime();
    },
    getWebIm_RequestFastReplyUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getFastReply&userid=' + userid + '&_t=' + new Date().getTime();
    },
    getWebIm_FangDongSpecialLodgeUnitUrl : function (userid) {
        return window.location.protocol+"//" + topLevelDomain + "/fangdong/" + userid +"/fangzi.html";
    },
    getWebIm_RequestRecommendLuUrl : function (userid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getRecommendLuList&userid=' + userid;
    },
    getWebIm_RequestUserStateUrl : function (userid,imuserrole) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getUserState&userid=' + userid + '&imuserrole=' + imuserrole;
    },
    getWebIm_RequestSynTalkMsgUrl: function (userid,synMinTime,synMaxTime) {
        return window.location.protocol+'//'+domain+'/webim.php?op=SynTalkMsg&userId=' + userid + '&synMinTime=' + synMinTime + '&synMaxTime=' + synMaxTime;
    },
    getWebIm_RequestTalkMsgSetRead: function(tenantId,luId,isTenant) {
        return window.location.protocol+'//'+domain+'/webim.php?op=talkMsgSetRead&tenantId=' + tenantId + '&luId=' + luId + '&isTenant=' + isTenant + '&_t=' + new Date().getTime();
    },
    getWebIm_AlipayTrustZMInfoPair : function (applyUserId,ownerUserId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetZminfo_Pair?applyUserId=' + applyUserId + '&ownerUserId='+ownerUserId+'&_t=' + new Date().getTime();
    },
    getWebIm_AlipayTrustLayer : function (landlordid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getAlipayTrustLayer&landlordid=' + landlordid + '&_t=' + new Date().getTime();
    },
    getWebIm_CheckKeywordUrl : function (dataArr, type) {
        return 'https://greatwall.xiaozhu.com/greatwall.php?content=' + JSON.stringify(dataArr) + '&type=' + type + '&_t=' + new Date().getTime();
    },
    getWebIm_AllFriendAndLuData : function (allfriendid,allluid) {
        return window.location.protocol+'//'+domain+'/webim.php?op=getAllFriendAndLuData';
        // return window.location.protocol+'//'+domain+'/webim.php?op=getAllFriendAndLuData&userlist=' + allfriendid + '&lulist=' + allluid + '&_t=' + new Date().getTime();
    },
    getOperateScreen: function (toUserId,operate) {
        return window.location.protocol+'//'+domain+'/webim.php?op=doOperateImScreen&toUserId=' + toUserId+ '&operate=' + operate+ '&_t=' + new Date().getTime();
    },
    checkIsInScreenList: function (toUserId) {
        return window.location.protocol+'//'+domain+'/webim.php?op=checkIsInScreenList&toUserId=' + toUserId+ '&_t=' + new Date().getTime();
    },
    getLodgeUnitState: function(luId){
        return window.location.protocol+'//'+domain+'/webim.php?op=getLodgeUnitState&luId=' + luId+ '&_t=' + new Date().getTime();
    },
    getWeb_NoticeReachedFeedbackUrl : function (timerid,operate) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=NotificationReachedFeedback&timerid=' + timerid + '&operate=' + operate;
    },

    getWeb_InfoEventReachUrl : function (timerid,operate,receiverId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=InfoEventReach&timerid=' + timerid + '&operate=' + operate + '&receiverid='+receiverId;
    },

    getInfoEventDealActionUrl : function (dealaction,objid,objtype,receiverid,displaystrategy) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=GetInfoEventDealActionUrl&dealaction=' + dealaction + '&objid=' + objid + '&objtype=' + objtype + '&receiverid=' + receiverid + '&displaystrategy='+displaystrategy;
    },

    getWeb_FangDong_FangDong_ShowLetter: function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ShowLetter';
    },
    getWeb_FangKe_FangKe_ShowLetter: function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ShowLetter';
    },
    getWeb_FangKe_Special_Index: function(tenantid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_FangKe_Special_Index&tenantid=' + tenantid;
    },
    getWeb_FangDong_Special_Index: function(landlordid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_FangDong_Special_Index&landlordid=' + landlordid;
    },
    getWeb_FangDong_ResetFastReplyUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ChatSet';
    },
    getWeb_FangDong_NoticeUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_ShowSysNotice';
    },
    getWeb_FangKe_NoticeUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_ShowSysNotice';
    },

    getWeb_FangKe_DoPostCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_DoPostComment';
    },
    getWeb_FangDong_DoPostCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_DoPostComment';
    },
    getWeb_FangKe_IndexUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Index';
    },
    getWeb_FangDong_IndexUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_Index';
    },
    getWeb_FavoriteGroupDetailUrl : function (groupId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Favorite_MyFavoriteDetail&groupId='+groupId;
    },
    getWeb_FavoriteGroupListUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_MyFavorite';
    },

    //打开点评详情页
    getWeb_FangKe_AddCommentUrl : function (bookorderId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Comment_Self&bookorderId=' + bookorderId + '&random=' + new Date().getTime();
    },
    getWeb_FangKe_DeleteTenantUrl : function (tenantId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_DeleteUserTenant&tenantId=' + tenantId;
    },
    getWeb_FangKe_UserTenantDetailUrl : function (tenantId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UserTenantDetail&tenantId=' + tenantId;
    },
    getWeb_FangKe_EditUserTenantUrl : function (tenantId,realName,tenantSex,ageGroup,cardType,cardNo,yearOfBirth,monthOfBirth,dayOfBirth,mobile,phonecode) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenant&tenantId=' + tenantId + '&realName=' + realName + '&tenantSex=' + tenantSex + '&ageGroup=' + ageGroup + '&cardType=' + cardType + '&cardNo=' + cardNo + '&yearOfBirth=' + yearOfBirth + '&monthOfBirth=' + monthOfBirth + '&dayOfBirth=' + dayOfBirth + '&mobile=' + mobile + '&phonecode=' + phonecode + '&random=' + new Date().getTime();
    },
    getWeb_FangKe_EditUserTenantAfterOverseaUrl : function (tenantId,realName,mobile,sex,birth,oversea,nation,mobileNation,IDCardNo,passportNo) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenantAfterOversea&tenantId=' + tenantId + '&realName=' + realName + '&mobile=' + mobile + '&sex=' + sex + '&birth=' + birth + '&oversea=' + oversea + '&nation=' + nation + '&mobileNation=' + mobileNation + '&IDCardNo=' + IDCardNo + '&passportNo=' + passportNo + '&random=' +new Date().getTime();
    },
    getWeb_FangKe_EditHaiwaiUserTenantUrl : function (tenantId,realName,tenantSex,ageGroup,cardType,cardNo,yearOfBirth,monthOfBirth,dayOfBirth,email) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UpdateUserTenant&tenantId=' + tenantId + '&realName=' + realName + '&tenantSex=' + tenantSex + '&ageGroup=' + ageGroup + '&cardType=' + cardType + '&cardNo=' + cardNo + '&yearOfBirth=' + yearOfBirth + '&monthOfBirth=' + monthOfBirth + '&dayOfBirth=' + dayOfBirth + '&email=' + email + '&random=' + new Date().getTime();
    },
    getWeb_GetCityUrl : function (provinceId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Pub_SelCityJson&provinceid=' + provinceId ;
    },
    getFangDong_CutUserHeadImageFrameUrl : function (headImageUrl) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CutUserHeadImageFrame&headImageUrl='+headImageUrl;
    },
    /*07-03*/
    getFangDong_SetNoticeSetUrl : function (smsLodgeunitSucc,smsBookorderTimeout,smsPayTimeout,smsNewComment,emailLodgeunitSucc,emailBookorderTimeout,emailPayTimeout,emailNewComment) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_NoticeSetSub&sms_lodgeunitsucc='+smsLodgeunitSucc+'&sms_bookordertimeout='+smsBookorderTimeout+'&sms_paytimeout='+smsPayTimeout+'&sms_newcomment='+smsNewComment+'&email_lodgeunitsucc='+emailLodgeunitSucc+'&email_bookordertimeout='+emailBookorderTimeout+'&email_paytimeout='+emailPayTimeout+'&email_newcomment='+emailNewComment+'&random'+new Date().getTime();
    },
    getFangDong_OrderByStateUrl : function (orderState,pageNo,sortType) {
        sortType = ('undefined' !== typeof sortType) ? sortType : "";
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_OrderByState&orderState='+orderState+'&sortType='+sortType+'&p='+pageNo+'&random='+new Date().getTime();
    },
    getFangDong_PayListUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_PayList';
    },
    getFangDong_SetBankPaymentUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_SetBankPayment&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_SetAlipayPaymentUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_SetAlipayPayment&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_GetTenpayInfoUrl : function (id, ownerId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_GetTenpayInfo&id='+id+'&ownerid='+ownerId;
    },
    getFangDong_CleanServiceAddOrder_step2Url : function(luId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceAddOrder_step2&luId='+luId;
    },
    getFangDong_CleanServiceOrderDetailRefreshState : function(orderId,lastState) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderDetailRefreshState&lastState='+lastState+'&orderId='+orderId;
    },
    getFangDong_IsCanClean : function (){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderGetIsCanClean';
    },
    getFangDong_UserInfoUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_UserInfo';
    },
    getFront_Login_KernelUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Login_Kernel';
    },
    getFront_Register_KernelUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Register_Kernel';
    },
    getFront_DetailPageMapUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_DetailPageMap&id='+luid;
    },
    getFront_Login_SubmitUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Login_Submit';
    },
    getFront_BookOrderPayFail : function (orderId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_BookOrderPayFail&bookorderid='+orderId;
    },
    getFangDong_FlashBookUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_FlashBook';
    },

    getAjax_RegisterWithPhoneAndPass : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RegisterWithPhoneAndPass';
    },
    /* dpv2
    getAjax_SendCommentShareUrl : function (commentid, source) {
        return window.location.protocol+'//'+domain+'/ajax.php?op=Ajax_SendCommentShare&commentid='+commentid+'&source='+source+'&random='+new Date().getTime();
    },
    可能废弃 或者是张晨的分享
    */
    getAjax_CommentShareUrl : function (commentid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommentShare?commentid='+commentid+'&random='+new Date().getTime();
    },
    getAjax_CommentFangKeShareUrl : function (commentid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommentFangKeShare?commentid='+commentid+'&random='+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundShowUrl : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundShow?bookOrderId='+bookOrderId;
    },
    getAjax_SaveDefaultUserHeadImageUrl : function (imgId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveDefaultUserHeadImage?id='+imgId;
    },
    getAjax_SaveUserHeadImageUrl : function (imgurl, gcx, gcy, gcw, gch) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveUserHeadImage?imgurl='+encodeURIComponent(imgurl)+'&x='+gcx+'&y='+gcy+'&w='+gcw+'&h='+gch;
    },
    /*07-03*/
    getAjax_DelCommentUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelComment';
    },
    getAjax_BookOrderCancelReasonUrl : function (bookorderId, rejectType, rejectText) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookOrderCancelReason?bookorderid='+bookorderId+'&cancelType='+rejectType+'&cancelReason='+encodeURIComponent(rejectText);
    },
    getAjax_RefuseBookOrderSetLuUnBookAble : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RefuseBookOrderSetLuUnBookAble';
    },
    getAjax_FangKe_CheckInCodeVerifyUrl : function (bookorderId,code) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_CheckInCodeVerify?orderid='+bookorderId+'&code='+code;
    },
    getAjax_DelUserPaymentUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelUserPayment?id='+id;
    },
    getAjax_BankCityJsonUrl : function (provinceId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BankCityJson?provinceid='+provinceId;
    },
    getAjax_BankJsonUrl : function (bankName,bankProviceId,bankCityId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BankJson?banktypeid='+bankName+'&bankprovinceid='+bankProviceId+'&bankcityid='+bankCityId;
    },
    getAjax_CheckTenpayInfoParam : function (tenpayno,tenpayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckTenpayInfo?tenpayno='+tenpayno+'&tenpayusername='+tenpayusername;
    },
    getAjax_GetDefaultLandMarkUrl : function (cityDomain) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDefaultLandMark?domain='+cityDomain;
    },
    /*08-19*/
    getAjax_CheckLodgeUnitUrl : function (cityDomain) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckLodgeunit?luid='+cityDomain;
    },
    getAjax_CheckSearchConditionUrl : function (searchCity,cityDomain,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckSearchCondition?searchCity='+searchCity+"&cityDomain="+cityDomain+"&startDate="+startDate+"&endDate="+endDate;
    },
    getAjax_BuildFilterSearchUrl : function (partner,startDate,endDate,citydomain,putkey,keywordType,keywordValue,checkedHouseType,checkedfacilities,checkedrentType,guestnum,price) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BuildFilterSearch?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&citydomain='+citydomain+'&putkey='+putkey+'&keywordType='+keywordType+'&keywordValue='+keywordValue+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&price='+price;
    },
    getAjax_GetDatas4Map : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDatas4Map?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort;
    },
    getAjax_GetMapDatasLodgeUnit : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,lat,lng) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDatas4MapLodgeUnit?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort+'&radius='+radius+'&lat='+lat+'&lng='+lng;
    },
    getAjax_getDatasMapLodgeunit4Page : function (partner,startDate,endDate,city,putkey,district,landmark,checkedHouseType,checkedfacilities,checkedrentType,guestnum,lowprice,highprice,pageNo,sort,radius,lat,lng) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getDatasMapLodgeunit4Page?partner='+partner+'&startDate='+startDate+'&endDate='+endDate+'&city='+city+'&putkey='+putkey+'&district='+district+'&landmark='+landmark+'&housetyperoomcnt='+checkedHouseType+'&facilities='+checkedfacilities+'&leasetype='+checkedrentType+'&guestnum='+guestnum+'&lowprice='+lowprice+'&highprice='+highprice+'&pageno='+pageNo+'&sort='+sort+'&radius='+radius+'&lat='+lat+'&lng='+lng;
    },
    getAjax_doFullTextSearch4Map : function (offset,url) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doFullTextSearch4Map?offset='+offset+'&url='+encodeURIComponent(url);
    },
    getAjax_GetBookLodgeUnitDetailUrl : function (lodgeId,sameRoomNum,startDate,endDate) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetBookLodgeUnitDetail?lodgeId="+lodgeId+"&sameRoomNum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+"&rand="+new Date().getTime();
    },
    getAjax_GetOrderPriceDetailUrl : function (bookOrderId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetOrderPriceDetail?bookOrderId="+bookOrderId+"&rand="+new Date().getTime();
    },
    getAjax_GetLazyInfoUrl : function (memkey,memtimeout,turl) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_LoadInfo?memkey="+memkey+"&memtimeout="+memtimeout+"&turl="+turl;
    },
    getAjax_AddFeedbackUrl : function (problem,contact,imageParam) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Add_Feedback?problem="+problem+"&contact="+contact+"&imageParam="+imageParam;
    },
    getAjax_GetFeedbackUrl : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Get_Feedback";
    },




    getAjax_GetVerifyCode : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/AJAX_GetVerifyCode?nocache="+new Date().getTime();
    },
    getAjax_CheckMobileExist : function (mobile,nationName,nationCode,source) {
        var source = source ? source : 'normal';
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckMobileExist?mobile=' + mobile + '&nationName=' +nationName+ '&nationCode=' +nationCode + '&source=' +  source;
    },
    getAjax_CheckRegistExist : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckRegistExist';
    },
    getAjax_CheckUsernameExist : function (username) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckUsernameExist?username=' + encodeURIComponent(username);
    },
    getAjax_CheckOldUsernameExist : function (username) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckOldUsernameExist?username=' + username;
    },
    getAjax_CheckEmailExist : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckEmailExist';
    },
    getAjax_CheckVerifyCode : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckVerifyCode';
    },
    getAjax_SendActivateCode : function (mobile, nationName, nationCode, verifyCode) {
        return window.location.protocol+'//'+domain+'/limajax/AJAX_SendActivateCode?mobile='+ mobile
            +'&nationName=' + nationName + '&nationCode=' + nationCode +'&verifycode='+ verifyCode + '&rand='+new Date().getTime() + '&fromType=pcRegister';
    },
    getAjax_SendAmendPassCode : function (mobile, verifyCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/limajax/AJAX_SendAmendPassCode?mobile='+ mobile +'&verifycode='+ verifyCode +'&nationName=' + nationName +'&nationCode='+nationCode+ '&rand='+new Date().getTime();
    },
    getAjax_CheckActiveCode : function (mobile,nationName,nationCode,activateCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckActivateCode?mobile='+mobile +'&nationName='+ nationName +'&nationCode=' + nationCode +'&activatecode='+activateCode +'&rand='+new Date().getTime();
    },
    getAjax_CheckInviteCode : function (inviteCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckInviteCode?invitecode='+inviteCode;
    },
    getAjax_SendConfirmCode : function (mobile, verifyCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendConfirmCode?mobile='+ mobile +'&verifycode='+ verifyCode
            +'&nationName=' +nationName +'&nationCode=' + nationCode + '&rand='+new Date().getTime();
    },
    getAjax_SendQuickLoginCode : function(mobile, verifyCode,nationName,nationCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendQuickLoginCode?mobile='+ mobile +'&verifycode='+ verifyCode +  '&nationName=' +nationName +'&nationCode=' + nationCode + '&rand='+new Date().getTime();
    },
    getAjax_CheckConfirmCode : function (mobile,confirmCode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CheckConfirmCode?mobile='+mobile+'&confirmcode='+confirmCode
            +'&nationName='+ nationName + '&nationCode='+ nationCode +'&rand='+new Date().getTime();
    },
    getAjax_VerifyCodeFirstShow : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_VerifyCodeFirstShow?rand='+new Date().getTime();
    },
    getAjax_Login : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_Login';
    },
    getAjax_LoginMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_LoginMobile';
    },
    getAjax_RegisterByMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_RegisterByMobile';
    },
    getAjax_RegisterByEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_RegisterByEmail';
    },
    getAjax_FindPasswordByEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordByEmail';
    },
    getAjax_ResetPasswordFromEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordFromEmail';
    },
    getAjax_SendRegValidateEmailUrl : function(email,next){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendRegValidateEmail?email='+encodeURIComponent(email)+'&next='+encodeURIComponent(next)+'&random='+new Date().getTime();
    },
    getAjax_FindPasswordByMobile : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_ResetPasswordByMobile';
    },
    getAjax_AmendPasswordByMobile : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_AmendPasswordByMobile';
    },
    getAjax_AmendPasswordByEmail : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_AmendPasswordByEmail';
    },
    getAjax_BindOpenAccount : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BindOpenAccount';
    },
    getAjax_OpenAccountRegister : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_OpenAccountRegister';
    },
    getAjax_ReSendActiveEmail : function (uid, uidtoken) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ReSendActiveEmail?uid=' + uid + '&uidtoken=' + uidtoken;
    },
    getAjax_ChangeActiveEmail : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ChangeActiveEmail';
    },
    getAjax_CheckIllegalUser : function (bidType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckIllegalUser?bidType=' + encodeURIComponent(bidType);
    },













    getAjax_CheckNickNameUrlNoParam: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckNickName";
    },

    getAjax_GetPicCheckCodeShowUrl : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/AJAX_PicCheckCodeShow?nocache="+new Date().getTime();
    },
    getAjax_GetSendMessageAppDownloadUrl: function (mobile,checkcode) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Send_Message_App_Download_Url?mobile="+mobile+"&checkcode="+checkcode+"&rand="+new Date().getTime();
    },
    getAjax_SendSms4AppDownloadUrl: function (mobile,checkcode,apptype) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SendSms4AppDownload?mobile="+mobile+"&checkcode="+checkcode+"&apptype="+apptype+"&rand="+new Date().getTime();
    },
    getAjax_CheckUserPasswordUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckUserPassword';
    },
    getAjax_CheckPhone : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckPhone';
    },
    getAjax_CheckEmailUrl: function (email) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckEmail?email="+email+"&random="+new Date().getTime();
    },
    getAjax_CheckEmailUrlNoParam: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckEmail";
    },
    getAjax_SendActiveEmailUrl: function (email) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Send_Active_Email?email="+email;
    },
    getAjax_ReadSysNoticeUrl: function (messageId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_ReadSysNotice?msgId="+messageId;
    },
    getAjax_DelSysNoticeUrl : function (messageId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelSysNotice?msgId='+messageId;
    },
    getAjax_SetChatReplyUrl : function (replys) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetChatReply?data='+encodeURIComponent(replys)+'&_t='+new Date().getTime();
    },
    getAjax_ResetChatReplyUrl : function (replys) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ResetChatReply?data='+encodeURIComponent(replys)+'&_t='+new Date().getTime();
    },
    getAjax_SmsCheckCodeSendUrl : function (phonenum,nationName,nationCode,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SmsCheckCodeSend?phone='+phonenum+ '&nationName=' + nationName + '&nationCode=' +nationCode+'&checkcode='+imagecode+'&aisle='+aisle;
    },
    getAjax_SetUserPhoneCodeUrl : function (phonenum,phonecode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetUserPhoneCode?phone='+phonenum+'&phonecode='+phonecode+'&nationName='+nationName+'&nationCode='+nationCode;
    },
    getAjax_SmsCheckCodeVerifyUrl : function (phonenum,phonecode,nationName,nationCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SmsCheckCodeVerify?phone='+phonenum+'&phonecode='+phonecode+'&nationName='+nationName+'&nationCode='+nationCode;
    },
    getAjax_Front_SendPhoneCode : function (phonenum,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SendPhoneCode?phone='+phonenum+'&checkcode='+imagecode+'&aisle='+aisle+'&rand='+new Date().getTime();
    },
    getAjax_Front_SendPhoneCodeByPhone : function (phonenum,imagecode,aisle) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SendPhoneCodeByPhone?phone='+phonenum+'&checkcode='+imagecode+'&aisle='+aisle+'&rand='+new Date().getTime();
    },
    getAjax_PhoneIsNotExist_PhoneIsLoginUserUrl : function (phonenum) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsNotExist_PhoneIsLoginUser?phone='+phonenum;
    },
    getAjax_UnbindSnsOpenIdUrl : function (shareType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_UnbindSnsOpenId?shareType='+shareType;
    },
    getAjax_FangKeOrderList_OrderByTimeUrl : function (ordertype, createtype, p) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKeOrderList_OrderByTime?orderType='+ordertype+'&bookOrderCreateType='+createtype+'&p='+p+'&random='+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundDetailUrl : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundDetail?bookOrderId='+bookOrderId;
    },
    getAjax_FangKe_InsurancePlanUrl : function (bookOrderTenantId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_InsurancePlan?bookOrderTenantId='+bookOrderTenantId;
    },
    getAjax_FangKe_RejectCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_RejectCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_ConfirmCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_ConfirmCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_ServiceCashPledgeUrl : function (bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_ServiceCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_FangKe_PayCashPledgeUrl : function (bookOrderId,payType,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_PayCashPledge?bookOrderId='+bookOrderId+'&payType='+payType+'&version='+version+'&rand='+new Date().getTime();
    },

    getAjax_GetMoreTalkUrl : function (talkid,rows,requestTime) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetMoreTalk?talkid='+talkid+'&rows='+rows+'&_t='+requestTime;
    },
    getAjax_GetSettleAccountDetailUrl : function (orderId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSettleAccountDetail?orderId='+orderId+'&p='+pageNo;
    },
    getAJAX_getSettlementListUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getSettlementList';
    },
    getAJAX_getSettlementMonthAccountListUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getSettlmentMonthAccount';
    },
    getAjax_createSettlementAccountUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_createSettlementAccount';
    },
    getAjax_delSettlementAccountUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_delSettlementAccount';
    },
    getAjax_FangDong_LuPromotionConditionUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_LuPromotionCondition?luid='+luid+'&random='+new Date().getTime();
    },
    getAjax_FangDong_CancelPromotionUrl : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_CancelPromotion?luid='+luid+'&random='+new Date().getTime();
    },
    getAjax_FangDong_SelfPromotionUrl : function (luid,avgprice,selfpromotiondiscount,enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_SelfPromotion?luid='+luid+'&avgPrice='+avgprice+'&discount='+selfpromotiondiscount+'&endDay='+enddate+'&random='+new Date().getTime();
    },
    getAjax_ConvertRedPackageUrl : function (userid,convertvalue) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ConvertRedPackage?userid='+userid+'&convertvalue='+convertvalue+'&_t='+new Date().getTime();
    },
    getAjax_FangDong_TenantAuthentication2GuoZhengTongUrl : function (tenantid,realname,cardno) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_TenantAuthentication2GuoZhengTong?tenantid="+tenantid+"&realname="+realname+"&cardno="+cardno;
    },
    getAjax_ShowNewLetterUrl : function (content) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ShowNewLetter?content='+encodeURIComponent(content);
    },
    getAjax_DelTalkUrl : function (talkid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DelTalk?delid='+talkid;
    },
    getAjax_SetTenpayInfoUrl : function (tenpayno,tenpayusername,balanceForm) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenpayInfo?tenpayno='+tenpayno+'&tenpayusername='+tenpayusername+'&balanceform='+balanceForm;
    },
    getAjax_CheckAlipayInfoUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckAlipayInfo';
    },
    getAjax_SaveAlipayInfoUrl : function (alipayno,alipayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveAlipayInfo?alipayno='+alipayno+'&alipayusername='+alipayusername;
    },
    getAjax_SetAlipayInfoUrl : function (alipayno,alipayusername,balanceForm,id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAlipayInfo?alipayno='+alipayno+'&alipayusername='+alipayusername+'&balanceform='+balanceForm+'&id='+id;
    },
    getAjax_SetDefaultUserPaymentUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetDefaultUserPayment?id='+id+'&rand='+Math.random();
    },
    getAjax_SetNationalSecurityInfo : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetNationalSecurityInfo';
    },
    getAjax_FangDong_DelMyRoomsUrl : function (roomId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_MyRooms_Del?lodgeunitid='+roomId;
    },
    getAjax_FangDong_MyRoomsSwithStateUrl : function (roomId,switchstr) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_MyRooms_SwithState?lodgeunitid='+roomId+'&switchval='+switchstr+'&random='+new Date().getTime();
    },
    getAjax_FangDong_MyPartRoomsUrl : function (lodgeId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_FangDong_MyPartRooms?parentId='+lodgeId+'&p='+pageNo;
    },
    getAjax_SetLodgeUnitCalendarUrl : function (lodgeUnitId, startDate, endDate, subPrice, bookable, roomnum) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startDate+'&enddate='+endDate+'&price='+subPrice+'&bookable='+bookable+'&housenum='+roomnum+'&random='+new Date().getTime();
    },
    getAjax_GetLodgeUnitPromotionUrl : function (lodgeUnitId, startdate, enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitPromotion?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate;
    },
    getAjax_GetLodgeUnitCalendarUrl : function (lodgeUnitId, startdate, enddate, vstartdate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate+'&editable=true&_vstartdate='+vstartdate+'&_t='+new Date().getTime();
    },
    getAjax_GetLodgeUnitCalendar : function (lodgeUnitId, startdate, enddate,calendarCode) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitCalendar?lodgeunitid='+lodgeUnitId+'&startdate='+startdate+'&enddate='+enddate+'&calendarCode='+calendarCode+'&_t='+new Date().getTime();
    },
    getAjax_CheckCalendarVerifyCodeUrl : function(luId,verifyCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckCalendarVerifyCode?luid='+luId+'&calendarCode='+verifyCode;
    },
    getAjax_SetLodgeUnitDayPriceUrl : function (lodgeUnitId, price) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetLodgeUnitDayPrice?lodgeunitid='+lodgeUnitId+'&price='+price+"&_t="+new Date().getTime();
    },
    getAjax_SetLodgeUnitWeekPriceUrl : function (lodgeUnitId, monValue,tueValue,wedValue,thuValue,friValue,satValue,sunValue,startDate,endDate) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SetLodgeUnitWeekPrice?lodgeunitid="+lodgeUnitId+"&mon="+monValue+"&tue="+tueValue+"&wed="+wedValue+"&thu="+thuValue+"&fri="+friValue+"&sat="+satValue+"&sun="+sunValue+"&startdate="+startDate+"&enddate="+endDate+"&_t="+new Date().getTime();
    },
    getAjax_FangDong_WeekMonthPromotionUrl : function (lodgeUnitId, discountPerWeek,discountPerMonth) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_WeekMonthPromotion?lodgeunitid="+lodgeUnitId+"&discountperweek="+discountPerWeek+"&discountpermonth="+discountPerMonth+"&_t="+new Date().getTime();
    },
    getAjax_SetLodgeUnitDateIntervalPriceUrl : function (lodgeUnitId, price) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_SetLodgeUnitDateIntervalPrice?lodgeunitid="+lodgeUnitId+"&price="+price+"&_t="+new Date().getTime();
    },
    getAjax_GetLodgeUnitPromotionUrl: function (lodgeUnitId, startdate, enddate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLodgeUnitPromotion?lodgeunitid='+lodgeUnitId+'&startdate='+startdate + '&enddate='+enddate;
    },
    getAjax_FangDong_EditOrderPriceUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FangDong_EditOrderPrice";
    },
    getAjax_Pub_GetStepPreviewUrl: function (step,houseId,roomId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Pub_GetStep"+step+"_Preview?houseId="+houseId+"&roomId="+roomId+"&_t="+new Date().getTime();
    },
    getAjax_Pub_GetStepEditUrl: function (step,houseId,roomId) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Pub_GetStep"+step+"?houseId="+houseId+"&roomId="+roomId+"&_t="+new Date().getTime();
    },
    getAjax_FangKe_BookOrder_RefundSubmitUrl : function (bookOrderId, cancelBookOrderType, cancelBookOrderReason) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_BookOrder_RefundSubmit?bookOrderId='+bookOrderId+'&cancelBookOrderType='+cancelBookOrderType+'&cancelBookOrderReason=' + encodeURIComponent(cancelBookOrderReason);
    },
    getAjax_Pub_GetProvinceJson : function (nation_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getProvinceInfoJson?nationid='+nation_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetCityJson : function (province_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getCityJson?provinceid='+province_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetDistrictJson : function (city_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getDistrictJson?cityid='+city_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetStreetJson : function (district_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getLocaltion?districtid='+district_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_GetStreetsJson : function (district_id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getStreetJson?districtid='+district_id+'&_t=' + new Date().getTime();
    },
    getAjax_Pub_CheckAlipayInfo : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckAlipayInfo';
    },
    getAjax_Pub_SaveAlipayInfo : function (alipayno,alipayusername) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SaveAlipayInfo?alipayno='+alipayno+'&alipayusername='+encodeURIComponent(alipayusername);
    },
    getAjax_Pub_SetAlipayInfo : function (alipayno,alipayusername,balanceForm) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAlipayInfo';
        //return window.location.protocol+'//'+domain+'/ajax.php?op=Ajax_SetAlipayInfo&alipayno='+alipayno+'&alipayusername='+alipayusername+'&alipaybalanceform='+balanceForm;
    },
    getAjax_Pub_PreBankPayMent_Submit : function (bankname,bankprovice,bankcity,bankaccountid,bankbranchname,pubpri,bankbranchtex,bankaccountname) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PUB_PreBanckPayMent_Submit?bankname='+bankname+'&bankprovice='+bankprovice+'&bankcity='+bankcity+'&bankaccountid='+bankaccountid+'&bankbranchname='+bankbranchname+'&pubpri='+pubpri+'&bankbranchtext='+bankbranchtex+'&bankaccountname='+bankaccountname;
    },
    getAjax_Pub_Set_SelfPromotion : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Set_SelfPromotion?luid='+luid;
    },
    getAjax_Pub_CutImage : function (url,width,height) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CutImage?key='+url+'&_w='+width+'&_h='+height;
    },
    getAjax_Pub_UploadCutAfterIamge : function (key,value) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_uploadCutAfterImage?key='+key+'&value='+value;
    },
    getAjax_Pub_PreGetUserHeadImg : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PUB_PreGetUserHeadImg';
    },
    getPub_Step1_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_HouseDetail_Submit';
    },
    getPub_Step1_RoomBase_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomBase_Submit';
    },
    getPub_Step2_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomDetail_Submit';
    },
    getPub_Step3_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomFacilities_Submit';
    },
    getPub_Step4_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomPicture_Submit';
    },
    getPub_Step5_SubmitSave : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomPrice_SubmitSave';
    },
    getAjax_RoomProcessPass : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_RoomProcessPass?roomId='+roomId;
    },
    getPub_HouseDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetStep1map?roomId='+roomId;
    },
    getPub_PreviewHouseDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetStep1map_Preview?roomId='+roomId;
    },
    getPub_PreviewHouseRoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewHouseRoomDetail?roomId='+roomId;
    },
    getPub_Preview_HouseRoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_HouseRoomDetail?roomId='+roomId;
    },
    getPub_PreviewDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewDetail?roomId='+roomId;
    },
    getPub_Preview_RoomDetail : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomDetail?roomId='+roomId;
    },
    getPub_PreviewFacilities : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewFacilities?roomId='+roomId;
    },
    getPub_Preview_RoomFacilities : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomFacilities?roomId='+roomId;
    },
    getPub_PreviewPicture : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPicture?roomId='+roomId;
    },
    getPub_Preview_RoomPicture : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPicture?roomId='+roomId;
    },
    getPub_PreviewPrice : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPrice?roomId='+roomId+'&room_type=2';
    },
    getPub_Preview_Price : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPrice?roomId='+roomId;
    },
    getPub_PreviewPriceQequest : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_PreviewPriceQequest?roomId='+roomId+'&room_type=3';
    },
    getPub_Preview_PriceQequest : function(roomId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_RoomPriceQequest?roomId='+roomId;
    },
    getPub_Preview_Success : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_Preview_Success';
    },
    getPub_LodgeUnitSite : function(houseId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetLodgeUnitSite?houseId='+houseId+'&rand='+Math.random();
    },
    getPub_LodgeUnitSite_Save : function(houseId,nationId,provinceId,cityId,districtId,streetId,inputAddress,latlng,doorNumber){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetLodgeUnitSite_Save?houseId='+houseId+'&nationId='+nationId+'&provinceId='+provinceId+'&cityId='+cityId+'&districtId='+districtId+'&streetId='+streetId+'&inputAddress='+inputAddress+'&latlng='+latlng+'&doorNumber='+doorNumber+'&rand='+Math.random();
    },
    getPub_EditAddress : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_EditAddress';
    },
    getPub_CheckAddressUrl : function(provinceId,longitude,latitude){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_CheckAddress?provinceId='+provinceId+'&longitude='+longitude+'&latitude='+latitude+'&rand='+Math.random();
    },
    getFront_Map_GetMapData : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetMapData';
    },
    getFront_Map_GetSubway4Map : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSubway4Map';
    },
    getFront_Map_CheckSearchCondition : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckSearchCondition';
    },
    getAjax_Map_GetLandMarkSuggestion : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getLandMarkSuggestion';
    },
    getAjax_FangDong_SetAutoCheck : function (isAutoCheck) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetAutoCheck?isAutoCheck=' + isAutoCheck;
    },
    getAjax_Front_GetCancelRule : function (luid,roomNum,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetCancelRule?luid='+luid+'&roomNum='+roomNum+'&startdate='+startDate+'&enddate='+endDate+'&rand='+new Date().getTime();
    },
    getAjax_Front_GetBookAbleRoomNum : function (lodgeId,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetBookAbleRoomNum?lodgeunitid='+lodgeId+'&startdate='+startDate+'&enddate='+endDate;
    },
    getAjax_Front_GetRoomBookAble : function (lodgeId,sameRoomNum,startDate,endDate,bookOrderId,version) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetRoomBookAble?lodgeId='+lodgeId+'&sameRoomNum='+sameRoomNum+'&startdate='+startDate+'&enddate='+endDate+'&bookorderid='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjax_Front_GetTotalPrice4BookOrder : function (lodgeId,sameRoomNum,startDate,endDate) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTotalPrice4BookOrder?lodgeId='+lodgeId+'&sameRoomNum='+sameRoomNum+'&startdate='+startDate+'&enddate='+endDate+'&rand='+Math.floor(Math.random()*10000);
    },
    getAjax_Front_PicCheckCodeVerify : function (checkcode,phone) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PicCheckCodeVerify?checkcode='+checkcode+'&phone='+phone;
    },
    getAjax_Front_UpdateLoginUser : function (name,sex) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_UpdateLoginUser?realName='+encodeURIComponent(name)+'&sex='+sex+'&random='+new Date().getTime();
    },
    getAjax_Front_PhoneIsLoginUser : function (mobile,name,sex) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsLoginUser?mobile='+mobile+'&realName='+encodeURIComponent(name)+'&sex='+sex+'&random='+new Date().getTime();
    },
    getAjax_Front_CollegeStudentShare : function (status,image,state,objId,objType,friendName,phone,phonecode,email) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/SendCollegeStudentShare?status='+status+'&image='+image+'&state='+state+'&objId='+objId+'&objType='+objType+'&friendName='+friendName+"&phone="+phone+"&phonecode="+phonecode+"&email="+email;
    },
    getAjax_Front_PhoneIsNotExist_PhoneIsLoginUser : function (value) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_PhoneIsNotExist_PhoneIsLoginUser?phone='+value+'&rand='+new Date().getTime();
    },
    getAjax_Front_GaoXiao_RoomComment : function (luid) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetComment4GaoXiao?luid='+luid;
    },
    getWeb_FangDong_CommentUrl : function (filter) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_Comment&filter='+filter;
    },
    getAjax_Front_UserTenantList : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangKe_UserTenant?rand='+new Date().getTime();
    },
    getWeb_FangKe_CommentUrl : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_Comment';
    },
    getAjax_UserReal_RenZheng : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UserReal_RenZheng';
    },
    getAjax_FD_DelDiaryUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_DelDiary?id='+id;
    },
    getAJAX_FD_RealNameVerifyImgSubUrl : function (data,flag) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_FD_RealNameVerifyImgSub?data=' + data +"&flag=" + flag;
    },
    getFangDong_CutSpecialHeadImageFrameUrl : function (imageUrl,markdw,markdh) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CutSpecialHeadImageFrame&imageUrl=' + imageUrl + '&markdw=' + markdw + '&markdh=' + markdh;
    },
    getAjax_FD_SaveSpecialHeadImage : function (cutx,cuty,cutw,cuth,oriw,orih,oriurl,cutbkgw,cutbkgh,imgIntro) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_SaveSpecialHeadImage?cutx=' + cutx +"&cuty=" + cuty + "&cutw=" + cutw + "&cuth=" + cuth + "&oriw=" + oriw + "&orih=" + orih + "&oriurl=" + oriurl + "&cutbkgw=" + cutbkgw + "&cutbkgh=" + cutbkgh + "&imgIntro=" + encodeURIComponent(imgIntro);
    },
    getAjax_FD_DiaryCountUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_DiaryCount';
    },
    getAjax_FD_Special_OfflineUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Special_Offline?id=' + id;
    },
    getAjax_FD_Special_OnlineUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Special_Online?id=' + id;
    },
    getAjax_FD_RealNameVerifySubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_RealNameVerifySub';
    },
    getAjax_FD_Diary_ToTopUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Diary_ToTop?id=' + id;
    },
    getAjax_FD_Diary_ToTop_CountUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_Diary_ToTop_Count';
    },
    getFDDiaryUploadImgUrl : function () {
        return window.location.protocol+'//'+domain+'/imgin4ImageText.php';
    },
    getAjax_GetTenantTagsUrl: function (tenantId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantTags?tenantid=' + tenantId;
    },
    getAjax_UpdateSelfIntroUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateSelfIntro';
    },
    getAjax_UpdateCheckInInfoDisplayTypeUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateCheckInInfoDisplayType';
    },
    getAjax_GetTenantSpecialHeadImgsUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantSpecialHeadImgUrl';
    },
    getAjax_SetTenantSpecialHeadImgUrl: function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantSpecialHeadImgUrl';
    },
    getAjax_SearchLodgeUnit : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchLodgeUnit';
    },
    getWeb_NeedPub: function (cityDomain, startDate, endDate) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Need_Pub&startDate='+startDate+'&endDate='+endDate+'&searchcity='+cityDomain;
    },
    getWeb_NeedPubSubmit : function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_Need_Pub_Submit';
    },
    getAjax_SetTenantNeedResponseStatus : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantNeedResponseStatus';
    },
    getAjax_SetTenantNeedTimeOutStatus : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetTenantNeedTimeOutStatus';
    },
    getAjax_NeedLodgeunit : function () {
        return window.location.protocol+'//'+domain+'//ajaxRequest/Ajax_getNeedLodgeunit';
    },
    getAjax_NeedLandlord : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNeedLandlord';
    },
    getAjax_ValidNeedCount : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ValidNeedCount';
    },
    getFront_Login : function (next) {
        return window.location.protocol+'//'+topLevelDomain+'/login?next='+next;
    },
    getAjax_MakeAgeInfo : function (year,month,day) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_MakeAgeInfo?year='+year+'&month='+month+'&day='+day;
    },
    getAjax_CookieNoSubmitUsernameAndEmail : function (username,email) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CookieNoSubmitUsernameAndEmail?username='+username+'&email='+email;
    },
    getAjax_IncreaseGuideVisits : function (guideType) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_IncreaseGuideVisits?type='+guideType+'&random='+ new Date().getTime();
    },
    getAjax_FK_OperatorTenantNeedOrderUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_OperatorTenantNeedOrder';
    },
    getAjax_FD_OperatorTenantNeedOrderUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_OperatorTenantNeedOrder';
    },
    getAjax_GetTenantNeedOrderPriceDetailUrl : function (id) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetTenantNeedOrderPriceDetail?tenantNeedOrderId=' + id + "&rand="+new Date().getTime();
    },
    getAJAX_TenantNeedOrderPaySynLockCheckUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_TenantNeedOrderPaySynLockCheck';
    },
    getAjax_FD_EditTenantNeedOrderPriceUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_FD_EditTenantNeedOrderPrice";
    },
    getAjax_InviteFriendByEmailUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_InviteFriendByEmail';
    },
    getAjax_UpdateInviteCodeUrl : function () {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_UpdateInviteCode';
    },
    getAjax_InviteListUrl : function (offset) {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_InviteList?offset=' + offset + '&length=10';
    },
    getAjax_InviteInfo : function () {
        return window.location.protocol+'//' + domain + '/ajaxRequest/Ajax_InviteInfo';
    },
    getAjax_GetReferrerLandlordsUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetReferrerLandlords';
    },
    getAjax_doSettleUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doSettle';
    },
    getAjax_SetBankPaymentSubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SetBankPaymentSub';
    },
    getAjax_setAlipaymentSubUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_setAlipaymentSub';
    },
    getAjax_TenantDoSettleUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_TenantDoSettle';
    },
    getAjax_LandlordDirectsellSettleRecordDataUrl : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetLandlordDirectsellSettleRecordData';
    },
    getAjax_ShareAfter : function (objId,objType,shareContentType,channel) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ShareAfter?objid='+objId+'&objtype='+objType+'&sharecontenttype='+shareContentType+'&channel='+channel;
    },
    getAjax_Exam : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_do_FangDong_Examination';
    },
    getAjax_Add_Cui : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangDong_Special_Add_Urge';
    },
    getAjax_FangkeInBlackList : function (mobile,cardNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FangkeInBlackList?mobile='+mobile+'&cardNo='+cardNo;
    },
    getAjax_BookOrder_EditUserInfo : function (password,nickname) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookOrder_EditUserInfo?password='+password+'&nickname='+nickname;
    },
    getAjax_jsErrorLogger : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_JsErrorLogger';
    },
    getAjax_BookOrder_CheckState : function (lodgeId,sameRoomNum,startDate,endDate,bookOrderId,version) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_BookOrder_CheckState?luid="+lodgeId+"&roomnum="+sameRoomNum+"&startdate="+startDate+"&enddate="+endDate+'&bookOrderId='+bookOrderId+'&version='+version+"&rand="+new Date().getTime();
    },
    getAjax_1yuanAutumnStatus : function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/autumnDeep1yuanInStatus?time="+new Date().getTime();
    },
    getAjax_Add_Zan : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Add_Zan';
    },
    getAjax_sendCoupon4AprilFoolDay : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_sendCoupon4AprilFoolDay';
    },
    getAjax_BookPayIntegralCoupon : function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookPayIntegralCoupon?bookorderid='+bookorderid;
    },
    getAjax_CouponInfo: function (couponid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetCouponInfo?couponid='+couponid;
    },
    getAjax_BookPayAbleCoupon: function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_BookPayAbleCoupon?bookorderid='+bookorderid;
    },
    //dpv2 feiqi
    getWeb_FangKe_CheckCommentUrl: function (bookorderid){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CommitCheck?bookorderid='+bookorderid;
    },
    getAddBillSubUrl : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_AddBillSub';
    },
    getUserBillHistoryUrl : function(pageNum){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_BillHis?p='+pageNum+'&rand='+Math.random();
    },
    getCancelBillUrl : function(id){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_BillCancel?id='+id;
    },
    getAddBillUrl : function(id){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FK_AddBill?invoiceId='+id+'&rand='+Math.random();
    },
    getBillUrl : function(state,id){
        var url = '';
        if(state){
            url = '&state='+state;
        }
        if(id){
            url = '&invoiceId='+id;
        }
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FK_AddBill'+url;
    },
    getAjax_drawLottery4NoonBreakUrl : function (district,address){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DrawLottery4NoonBreak?district='+district+'&address='+address+'&rand='+Math.random();
    },
    getAjax_getNoonBreakAwardUrl : function (name,mobile,sleepTime){
        if(name && mobile && sleepTime){
            return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNoonBreakAward?name='+encodeURI(name)+'&mobile='+mobile+'&sleepTime='+sleepTime+'&rand='+Math.random();
        } else {
            return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getNoonBreakAward?rand='+Math.random();
        }
    },
    getAjax_getAvaliableCarBedUrl : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getAvaliableCarBed?rand='+Math.random();
    },
    getAjax_LuckerList4NoonBreakUrl : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_LuckerList4NoonBreak?rand='+Math.random();
    },
    getAjaxAddFavorite: function (loginUserid,lodgeUnitId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_AddFavorite?loginUserid='+loginUserid+'&lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxEditFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_EditFavoriteGroup';
    },
    getAjaxAddFavoritePage: function (lodgeUnitId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getAddFavorite?lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxAddFavoriteNew: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_AddFavoriteNew';
    },
    getAjaxCancelFavorite: function (lodgeUnitId,groupId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CancelFavorite?lodgeUnitId='+lodgeUnitId+'&groupId='+groupId+'&rand='+new Date().getTime();
    },
    getAjaxCancelAllFavorite: function (lodgeUnitId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CancelAllFavorite?lodgeUnitId='+lodgeUnitId+'&rand='+new Date().getTime();
    },
    getAjaxAddFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_addFavoriteGroup';
    },
    getAjaxDelFavoriteGroup: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_delFavoriteGroup';
    },
    getAjaxGetZhiMaNoCashPledgeList: function (cityId){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getZhiMaNoCashPledgeList?cityId='+cityId+'&rand='+new Date().getTime();
    },
    getAjaxApplyCashPledgeByLandlordUrl : function(bookOrderId,pledge2Landlord,reason){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ApplyCashPledge';
    },
    getAjaxCancelCashPledgeByLandlordUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_CancelCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAjaxApplyServiceByLandlordUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ApplyService4CashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getReturnCashPledgeUrl : function(bookOrderId,version){
       return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FD_ReturnCashPledge?bookOrderId='+bookOrderId+'&version='+version+'&rand='+new Date().getTime();
    },
    getAJAX_GetLodgeUnitCalendar : function (luid,startDate,endDate,editable,calendarCode){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetLodgeUnitCalendar?lodgeunitid='+luid+'&startdate='+startDate+'&enddate='+endDate+'&editable='+editable+'&calendarCode='+calendarCode+'&rand='+Math.random();
    },
    getAJAX_ActivitySanyaXiamen : function (){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_luckyDraw&rand='+Math.random();
    },
    getAJAX_ActivitySanyaXiamenShare : function (){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_shareLuckyDraw&rand='+Math.random();
    },
    getAJAX_applyCleanService : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_applyCleanService';
    },
    getAJAX_getMsCoupon : function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getMsCoupon';
    },
    getAJAXA_getServiceTimeByDate : function(date){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Ajax_getServiceTimeByDate&date='+date+'&rand='+new Date().getTime();
    },
    getAjax_submitCleanServiceOrder : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Ajax_submitCleanServiceOrder';
    },
    getCleanServiceOrderDetailUrl : function(orderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderDetail&orderId='+orderId;
    },
    getAjax_cleanServiceOrderPaySubmit : function(orderId,bank) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderPaySubmit&orderId='+orderId+'&bank='+bank;
    },
    getAjax_cancelCleanServiceOrder : function(orderId,cancelType,returnMoney,punishMoney){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_CleanServiceOrderCancelSubmit&orderId='+orderId+'&returnMoney='+returnMoney+'&punishMoney='+punishMoney+'&cancelType='+cancelType+'&rand='+new Date().getTime();
    },
    getFangDong_MyRoomsUrl : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_MyRooms';
    },
    getAjax_sendCouponUrl: function (mobile,verifycode,state) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_sendCoupon?mobile="+mobile + "&verifycode=" + verifycode + "&state=" +state;
    },
    getBookOrderSubmitUrl: function () {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Front_AddBookorderSubmit';
    },
    getAjax_nationCodeHtml: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_GetNationCodeHtml";
    },
    getAjax_nationCardHtml: function () {
        return window.location.protocol+"//"+domain+"/xzweb.php?op=GetNationCardHtml";
    },
    getAjax_CheckTenantMobile: function (tenantId,mobile,mobileNation) {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_CheckTenantMobile?tenantId="+tenantId+"&tenantMobile="+mobile+"&mobileNation="+mobileNation;
    },
    getAjax_checkEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateRegEmail";
    },
    getAjax_checkFindPwdEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateFindPwdEmail";
    },
    getAjax_checkActiveEmailValiCodeUrl: function () {
        return window.location.protocol+"//"+domain+"/ajaxRequest/Ajax_Front_ValidateActiveEmail";
    },
    get_SetUserInfoSubUrl : function() {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=SetUserInfoSubByType';
    },
    getWeb_GetProvinceUrl : function (nationId) {
        return window.location.protocol+'//'+domain+'/xzweb.php?op=Pub_SelProvinceJson&nationid=' + nationId ;
    },
    getAjax_GetShareInfo : function (objId,objType,shareContentType,cityId,shareInvite,hideWechat) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetShareInfo?objId='+objId+'&objType='+objType+'&shareContentType='+shareContentType+'&cityId='+cityId+'&shareInvite='+shareInvite+'&hideWechat='+hideWechat;
    },
    getAjax_GetCityLightsV3Url : function() {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_DoCityLightsV3';
    },
    getAjax_GetFirstOrderReducePermission : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetFirstOrderReducePermission';
    },
    getAjax_ChannelStatistics : function (objid, opertype, channels, statisticsSign) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_StatisticsSubmit?objid='+objid+'&opertype='+opertype+'&channels='+channels+'&statisticsSign='+statisticsSign;
    },
    getAjax_UnSignFirstCheckIn : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UnSignFirstCheckIn';
    },
    getAjax_doSignFirstCheckIn : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doSignFirstCheckIn';
    },
    getAjax_GetQualificationConfigList: function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_QualificationConfigList?luId='+luId;
    },
    getAjax_GetQualificationInfo: function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_QualificationInfo?luId='+luId;
    },
    getAjax_Qualification_Submit: function (){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Qualification_Submit';
    },
    getAjax_QualificationMaterial: function(materialConfigId){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_QualificationAvailableMaterial?materialConfigId='+materialConfigId;
    },
    getQualicationInfo : function(luId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_QualificationInfo&lodgeUnitId='+luId;
    },
    getFangKeUserInfo : function(){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_UserInfo';
    },
    getFdOrderDetailUrl : function(bookOrderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangDong_OrderDetail&bookOrderId='+bookOrderId;
    },
    getFkOrderDetailUrl : function(bookOrderId){
        return window.location.protocol+'//'+domain+'/xzweb.php?op=FangKe_OrderDetail&bookOrderId='+bookOrderId;
    },
    getAjax_doFullTextSearchUrl: function(offset, url){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_doFullTextSearch?offset='+offset+'&url='+url;
    },
    getAjax_CheckIDCardIfAuth : function(idcard){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckIDCardIfAuth?idcard='+idcard;
    },
    getAjax_SendSensitiveOPCode: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SendSensitiveOPCode';
    },
    getAjax_SensitiveOPCodeVerify: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SensitiveOPCodeVerify';
    },
    getAjax_PartnerSetNewsletter : function (partnerChannel,canSend) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_PartnerSetNewsletter?partnerChannel='+encodeURIComponent(partnerChannel)+'&canSend='+encodeURIComponent(canSend);
    },
    getAjax_updateOrderCashPledge : function (bookOrderId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_UpdateOrderCashPledge?bookOrderId='+bookOrderId;
    },
    getAjax_CheckPartnerOrderPrice : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_CheckPartnerOrderPrice';
    },
    getAjax_GetSameRooms : function (luId) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetSameRooms?luid='+luId;
    },
    getAjax_GetCommentDiary4Index : function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_getCommentDiary4Index';
    },
    getAjax_GetDetailComment : function (lodgeId,cityDomain,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetDetailComment?lodgeId='+lodgeId+"&cityDomain="+cityDomain+"&p="+pageNo;
    },
    getAjax_GetOtherDetailComment : function (lodgeId,pageNo) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_GetOtherDetailComment?lodgeId='+lodgeId+'&p='+pageNo;
    },
    getAjax_FlashBook_LandlordSetting : function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FlashBook_LandlordSetting';
    },
    getAjax_FlashBook_UpdateLandlordSetting:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_FlashBook_UpdateLandlordSetting';
    },
    getAjax_GetLawPopupPage_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetLawPopupPage';
    },
    getAjax_GetAgreementPage_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetAgreementPage';
    },
    getAjax_DoAgree_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_DoAgree';
    },
    getAJAX_GetTerminalUniqueIdentification_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_GetTerminalUniqueIdentification';
    },
    getAJAX_SetTmpTerminalUniqueIdentification_Url:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_SetTmpTerminalUniqueIdentification';
    },
    getAJAX_SetBaiTuanGetRoomInfo_Url:function(type, module, page, pagesize, random) {
    	random = typeof random !== 'undefined' ?  random : 1;
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanMainActivity?type='+type+'&module='+module+"&page="+page+"&pagesize="+pagesize+"&random="+random;
    },
    getAJAX_ChangeLodgeUnitRepositoryBookFlow:function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_ChangeLodgeUnitRepositoryBookFlow';
    },
    getAJAX_SetBaiTuanSendCoupond_Url:function(type,tag) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanCoupondSend?type='+type+"&tag="+tag;
    },
    getAJAX_SetMeisuView_Url:function(luid, module) {
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_BaiTuanMeisuView?luid='+luid+"&module="+module;
    },
    getAjax_CancelAuthForYunzhanggui: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_CancelAuthForYunzhanggui';
    },
    getAjax_IsAuthToYunzhanggui: function(){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_IsAuthToYunzhanggui';
    },
    // 百团领券
    getAjax_baituanCoupon: function(couponActivityId,userid){
        return window.location.protocol+'//'+domain+'/ajaxRequest/AJAX_DoSendCouponByUser?couponActivityId='+couponActivityId+'&loginUser='+userid;
    },
    getAJAX_HomeStayActivity_Url:function(params) {
    	    var str = '';
    	    for(key in params){
            str += key+"="+params[key]+"&";
        }
        var url = window.location.protocol+'//'+domain+'/ajaxRequest?'+str;
        return url;
    },
    //百团活动页
    getWeb_baituanActivityUrl:function(){
        return window.location.protocol+'//'+domain+'/yunying.php?op=YunYing_HomeStayMain';
    },
    //图片uploadUrl
    getUpload_Url : function(params)
    {
        if(params === undefined){
            params = '';
        }
        var url = uploadImageUrl + params;
        if(uploadImageUrl.indexOf("http") != -1)
        {
            if(window.location.protocol == "https"){
                url = "https" + uploadImageUrl.substring(5) + params;
            }
        }else{
            url = window.location.protocol + '//' + uploadImageUrl + params;
        }
        return url;
    },
    
    config:{
        env: function(){
            var hostName = window.location.host;
            var envParams =['Dev','Test','Prerelease','Pro'];
            var switchPro = true,envListIndex ;
            for(var i = 0;i<envParams.length;i++){
               var reg = new RegExp(envParams[i].toLowerCase());
               if(reg.test(hostName)){
                   switchPro = false;
                   envListIndex = i;
               }
            }
            if(switchPro){
                return 'Pro';
            }else{
                return envParams[envListIndex];
            }
        },
        xzfk: '/app/xzfk/web/500/',
        // 开发环境
        mainDomainDev: 'https://wirelesspub-global.dev.xiaozhu.com',
        // 测试环境
        mainDomainTest: 'https://test-wirelesspub-xzcommon-00.xiaozhu.com',
        // 预上线环境
        mainDomainPrerelease: 'https://prerelease-wirelesspub-global.xiaozhu.com',
        // 正式环境
        mainDomainPro: 'https://wirelesspub-global.xiaozhu.com'
    },
    // 获取安全验证方式
    getSlideVerifyType:function(){
        return this.config['mainDomain' + this.config.env()] + this.config.xzfk + 'verify/getSlideVerifyType';
    },
    getSlideVerifyRes:function () {
        return this.config['mainDomain' + this.config.env()] + this.config.xzfk + 'verify/getSlideVerifyRes';
    },
    getProductTypeList:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_Pub_GetProductTypeList';
    },
    getSearchCitysLists:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchCitys';
    },
    getCancelRule: function(luid){
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_PubSysCancelRule&luId='+ luid;
    },
    updateCancelRule: function(luid, type, limitCancelOrder){
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_PubSysUpdateLodgeUnit&luId='+ luid + '&type=' + type + '&limitCancelOrder=' + limitCancelOrder;
    },
    getIndexCancelRule: function (luid) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_LodgeUnitIndexCancelRule&luId='+ luid;
    },
    getSelectRule: function (luid) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_CancelRuleLodgeUnitCenter&luId='+ luid;
    },
    getCancelRuleDate: function (luid, checkInDay, checkOutDay) {
        return window.location.protocol+'//'+ domain +'/ajax.php?op=AJAX_LodgeUnitIndexCancelRuleWithDate&luId='+ luid + '&checkInDay=' + checkInDay + '&checkOutDay=' + checkOutDay;
    },
    getCityInfo:function () {
        return window.location.protocol+'//'+domain+'/ajaxRequest/Ajax_SearchCityInfo';
    }
};
 
 var xzRegularExpression={a:1,isNum:/^\d{1,}$/,isMobile:/^\d{11}$/,isMobileWithSplit:/^[\d-]{10,}$/,isUsername:/^[\w|\u4E00-\u9FA5|\u3400-\u4DB5|\uE815-\uE864|\u9FA6-\u9FBB]*$/,isChinese:/^[\u4E00-\u9FA5|\u3400-\u4DB5|\uE815-\uE864|\u9FA6-\u9FBB]+$/,simpleMobile:/^\d{11}$/,mobile:/^1((2[7])|(3[0-9])|(4[5-9])|(5[0-9])|(6[124567])|(7[0-8])|(8[0-9])|(9[0-9]))\d{8}$/,password:/^[0-9a-zA-Z*!@.\-? : ;|$#%^&()_+=\[\]\\\/{}<>",~`']{0,}$/,numbers:/[1-9][0-9]{4}/,simpleEmail:/^.*?@.+$/,email:/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)+[a-zA-Z]+$/,passport:/^[\d\w]{4,20}$/,inviteCode:/^[A-Z0-9]{7,15}$/,simpleDate:/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,simpleDateTime:/^[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9] [0-2][0-9](:[0-5][0-9]){1,2}$/}; 
 window.captchaModel = {
    toast: function (msg, type) {
        if (!msg) return false;
        if (!$('body').find('.xz_toast_private').length) {
            var div = '<div class="xz_toast_private"><span class="toast_txt">' + msg + '</span></div>';
            $('body').append(div);
            $('.xz_toast_private').css({
                "position": "fixed",
                "z-index": '10002',
                "min-width": "380px",
                "padding": "15px 15px 15px 20px",
                "line-height": "24px",
                "text-align": "center",
                "background": "#D4EDEB",
                "color": "#26A69A",
                "font-size": "14px",
                "border-radius": "4px",
                "left": "50%",
                "transform": "translateX(-50%)",
                "top": "20px",
                "box-sizing": "border-box",
                "border": "1px solid #26A69A",
                "border-color": "#D4EDEB"
            });
            $('.xz_toast_private .toast_txt').css({
                "background-image": "url('icon-success.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-success.png*/)",
                "background-position": 'left center',
                "background-repeat": 'no-repeat',
                "padding": "10px 0 10px 30px"
            });
        } else {
            $('.xz_toast_private .toast_txt').html(msg);
        }
        $('.xz_toast_private').css({
            "background": type === "error" ? "#FFEBF2" : "#D4EDEB",
            "color": type === "error" ? "#ff4081" : "#26A69A",
            "border-color": type === "error" ? "#FFEBF2" : "#D4EDEB"
        });
        $('.xz_toast_private .toast_txt').css({
            "background-image": type === "error" ? "url('icon-error.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-error.png*/)" : "url('icon-success.png'/*tpa=http://jci.xiaozhustatic1.com/images/detail/icon-success.png*/)"
        });
        $('.xz_toast_private').show();
        var timer = setTimeout(function () {
            $('.xz_toast_private').hide();
            $('.xz_toast_private .toast_txt').html('');
            window.clearInterval(timer);
            timer = null;
        }, 3 * 1000);
    },
    showModel: function (node) {
        if (!$('body').find('.xz_model_private').length) {
            var div = '<div class="xz_model_private"><div class="panel"><div class="slide"><div class="tips">请您完成以下验证，验证成功后可继续探索小猪。</div><div class="node">' + node + '</div></div></div></div>';

            $('body').append(div);
            $('.xz_model_private').css({
                "position": "fixed",
                "z-index": '10001',
                "background": "rgba(0, 0, 0, .6)",
                "top": "0",
                "left": "0",
                "right": "0",
                "bottom": "0",
                "display": "none"
            });
            $('.xz_model_private  .panel').css({
                "position": "fixed",
                "top": "50%",
                "left": "50%",
                "z-index": '1002',
                "width": "300px",
                "min-height": "150px",
                "padding": "25px 25px 25px 25px",
                "text-align": "center",
                "background": "#fff",
                "color": "#26A69A",
                "font-size": "14px",
                "border-radius": "4px",
                "display": "flex",
                "display": "-webkit-flex",
                "justify-content": "center",
                "-webkit-justify-content": "center",
                "align-items": "center",
                "-webkit-align-items": "center",
                "transform": "translate(-50%, -50%)",
            });
            $('.xz_model_private .tips').css({
                "margin-bottom": "20px",
                "width": "100%",
                "color": "#212121",
                "font-size": "16px",
                "text-align": "left"
            });
        } else {
            $('.xz_model_private .node').empty().append(node);
        }
        $('.xz_model_private').css('display', 'block');
    },
    hideModel: function () {
        $('.xz_model_private').css('display', 'none');
    }
};
 
 /*
*
*
* init: 操作滑动模块dom函数
* onSuccess: 验证成功的回调函数
* onLoad: 初始化成功函数
* onError: 初始化错误函数
*
*
*
* 返回实例参数：
*
*
* 验证类型 默认网易
* slideVerifyType
*
* 网易验证通过token
* NECaptchaValidate
*
*
* 阿里验证通过token
* slideVerifyToken
* slideVerifyScene
* slideVerifySessionId
* slideVerifySig
*
* 验证通过标志
* safeChecked
*
*
*
* */
var cookieApi = {
    setCookie: function (name, value, day) {
        var domain = 'http://jci.xiaozhustatic1.com/e19061101/;path=/;domain=xiaozhu.com';
        if (day !== 0) {
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date() + expires);
            document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString() + domain;
        } else {
            document.cookie = name + "=" + escape(value) + domain;
        }
    },
    getCookie: function (name){
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg) ){
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    clearCookie: function (name) {
        this.setCookie(name, "", -1);
    }
};

var calendarToken = cookieApi.getCookie('SPIDER_AVOID_TOKEN_calendar');
if (calendarToken) {
  localStorage.setItem('SPIDER_AVOID_TOKEN_calendar', calendarToken);
}
function Captcha(config) {
    var that = this;

    // 获取滑动验证类型接口
    var URL_GET_SLIDE_VERIFY_TYPE = XZWebUrlWriter.getSlideVerifyType();
    // 滑动验证码验证接口
    var URL_GET_SLIDE_VERIFY_RES = XZWebUrlWriter.getSlideVerifyRes();

    var fetch = function (type, url, cb) {
        // 获取滑动验证类型
        if (type === 'res') {
            url = url +
                '?NECaptchaValidate=' + that.NECaptchaValidate +
                '&slideVerifyType=' + that.slideVerifyType +
                '&slideVerifyToken=' + that.slideVerifyToken +
                '&slideVerifySessionId=' + that.slideVerifySessionId +
                '&slideVerifySig=' + that.slideVerifySig +
                '&slideVerifyScene=' + that.slideVerifyScene +
                '&busiKey=' + config.busiKey;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                cb(xhr.responseText);
            }
        };
        xhr.send();
    };

    // 验证类型 默认网易云
    that.slideVerifyType = 'yidun';

    // 网易验证通过token
    that.NECaptchaValidate = '';

    // 阿里验证通过token
    that.slideVerifyToken = '';
    that.slideVerifyScene = '';
    that.slideVerifySessionId = '';
    that.slideVerifySig = '';

    // 验证通过
    that.safeChecked = false;
    if (config.busiKey) {
        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'no');
    }

    var uniqueId = Math.random().toString(36).substr(2);
    var initSafeCheck = function () {
        $('#captcha').remove();
        var head= document.getElementsByTagName('head')[0];
        var first= head.firstChild;
        var spidersafeScript = document.createElement("script");
        spidersafeScript.setAttribute('id', 'captcha');
        spidersafeScript.type = "text/javascript";
        spidersafeScript.src = that.slideVerifyType === 'yidun' ? "https://cstaticdun.126.net/load.min.js" : "https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012";
        head.insertBefore(spidersafeScript, first);
        spidersafeScript.onload = function () {
            var slideContainer = '<div style="margin-bottom: 10px;width: 100%;" id="'+ that.slideVerifyType + uniqueId + '" class="nc-container"></div>';
            config.init(slideContainer);
            if (that.slideVerifyType === 'yidun') {
                /*
                *
                * 网易验证
                *
                * */
                initNECaptcha({
                    // 网易key
                    captchaId: '8c35527a6e7f4dcbba3768634a3bc61f',
                    // 网易验证码容器
                    element: '#' + that.slideVerifyType + uniqueId,
                    mode: config.mode || 'embed',
                    width: config.width || 300,
                    // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                    onReady: function (instance) {

                    },
                    // 验证成功
                    onVerify: function (err, data) {
                        try {
                            that.NECaptchaValidate = data.validate || '';
                            var verifySucCb = function (res) {
                                var data = typeof res === 'string' ? JSON.parse(res) : res;
                                if (data.status === 200) {
                                    if (config.busiKey) {
                                        var spiderAvoidToken = data.content.spiderAvoidToken;
                                        var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                    }
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        } catch (error) {
                            console.log(error);
                        }

                    }
                }, function onload(instance) {
                    // 初始化成功
                    if (config.onLoad) {
                        config.onLoad();
                    }
                }, function onerror(err) {
                    // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                    if (config.onError) {
                        config.onError();
                    }
                })
            } else if (that.slideVerifyType === 'aliyun') {
                /*
                *
                * 阿里验证
                *
                * */
                var nc_token = ['CF_APP_1', (new Date()).getTime(), Math.random()].join(':');
                var NC_Opt = {
                    renderTo: '#' + that.slideVerifyType + uniqueId,
                    appkey: 'FFFF0N0000000000703C',
                    scene: 'nc_register',
                    token: nc_token,
                    customWidth: config.width || 300,
                    trans: {
                        'key1': 'code0'
                    },
                    elementID: ['usernameID'],
                    is_Opt: 0,
                    language: 'cn',
                    isEnabled: true,
                    timeout: 3000,
                    times: 5,
                    apimap: {
                        // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
                        // 'get_captcha': '//b.com/get_captcha/ver3',
                        // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
                        // 'get_img': '//c.com/get_img',
                        // 'checkcode': '//d.com/captcha/checkcode.jsonp',
                        // 'umid_Url': 'um.js'/*tpa=http://e.com/security/umscript/3.2.1/um.js*/,
                        // 'uab_Url': '909.js'/*tpa=http://aeu.alicdn.com/js/uac/909.js*/,
                        // 'umid_serUrl': 'https://g.com/service/um.json'
                    },
                    callback: function (data) {
                        try {
                            that.slideVerifyToken = nc_token;
                            that.slideVerifySessionId = data.csessionid;
                            that.slideVerifySig = data.sig;
                            that.slideVerifyScene = NC_Opt.scene;
                            var verifySucCb = function (res) {
                                var data = typeof res === 'string' ? JSON.parse(res) : res;
                                if (data.status === 200) {
                                    if (config.busiKey) {
                                        var spiderAvoidToken = data.content.spiderAvoidToken;
                                        var spiderAvoidTokenKey = 'SPIDER_AVOID_TOKEN_' + config.busiKey;
                                        localStorage.setItem(spiderAvoidTokenKey, spiderAvoidToken);
                                        if (config.busiKey === 'calendar') {
                                            cookieApi.clearCookie('SPIDER_AVOID_TOKEN_calendar');
                                            cookieApi.setCookie(spiderAvoidTokenKey, spiderAvoidToken);
                                        }
                                    }
                                    that.safeChecked = true;
                                    if (config.busiKey) {
                                        localStorage.setItem('SAFE_CHECKED_' + config.busiKey, 'yes');
                                    }
                                    if (config.onSuccess) {
                                        config.onSuccess();
                                    }
                                }
                            };
                            fetch('res', URL_GET_SLIDE_VERIFY_RES, verifySucCb);
                        } catch (error) {
                            console.log(error);
                        }
                    },
                    error: function () {
                        if (config.onError) {
                            config.onError();
                        }
                    }
                };
                var nc = new noCaptcha(NC_Opt);
                nc.upLang('cn', {
                    _startTEXT: '请按住滑块，拖动到最右边',
                    _yesTEXT: '验证通过',
                    _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
                    _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
                })
            }
        }
    };

    var getSlideVerifyTypeCb = function (res) {
        var data = typeof res === 'string' ? JSON.parse(res) : res;
        if (data.status === 200) {
            that.slideVerifyType = data.content || 'yidun';
            initSafeCheck();
        }
    };

    fetch('type', URL_GET_SLIDE_VERIFY_TYPE, getSlideVerifyTypeCb);
}
 
 function captchaInterceptors (busiKey, isReload, res, captchaAction, successAction,status) {
    if (typeof res === 'string' && (res.indexOf('status') !== -1)) {
        res = JSON.parse(res);
    }
    if(status && status ==307){
       if (isReload) {
          var curLocation = window.location.href;
          var host = (window.location.host.indexOf('www') === 0) ? 'http://jci.xiaozhustatic1.com/e19061101/www.xiaozhu.com' : window.location.host;
          window.location.href =  window.location.protocol + '//' +
             host + '/xz_web2/verify/index.html?slideRedirect=' +
             encodeURIComponent(curLocation);
       } else {
          var onSuccess = function () {
             window.captchaModel.hideModel();
             captchaAction();
          };
          if (busiKey === 'calendar') {
             $('#calendar-box').hide();
          }
          var captcha = new Captcha({
             init: window.captchaModel.showModel,
             onSuccess: onSuccess,
             busiKey: busiKey
          });
       }
       return;
    }
    if (typeof res === 'object' && res !== null && 'status' in res) {
        if (res.status === 6000 || res.status === 60001) {
            if (isReload) {
               var curLocation = window.location.href;
               var host = (window.location.host.indexOf('www') === 0) ? 'http://jci.xiaozhustatic1.com/e19061101/www.xiaozhu.com' : window.location.host;
               window.location.href =  window.location.protocol + '//' +
                   host + '/xz_web2/verify/index.html?slideRedirect=' +
                   encodeURIComponent(curLocation);
            } else {
                var onSuccess = function () {
                    window.captchaModel.hideModel();
                    captchaAction();
                };
                if (busiKey === 'calendar') {
                   $('#calendar-box').hide();
                }
                var captcha = new Captcha({
                    init: window.captchaModel.showModel,
                    onSuccess: onSuccess,
                    busiKey: busiKey
                });
            }
        } else {
            successAction();
        }
    } else {
        successAction();
    }

}
 
 var webimIframUrl = window.location.protocol+'//' + topLevelDomain + '/webim.html';
var currentUser = '';
var userMD5 = null;
var jscssVer = '/e20180229';
var xzimLoadPath = window.location.protocol+'//' + domain + jscssVer;
var xzimCssPath = xzimLoadPath + '/css/';
var loadIMJS = ['common'];
var loadURLSrc = jciUrl + jscssVer + '/imjs_v4.php';
var DEBUG = false;
var xiaozhuWebimCSS = 'webimV4.css'/*tpa=http://jci.xiaozhustatic1.com/e19061101/webimV4.css*/;
var webimReJoinTimeInterval = 30000;
var lockNoticeNoArr = ['MS100','MS200','MS400','MS500','MS600','MS700','MS800','MS900','MS1000','MS1100','MS1200','MS1300','MS1400','MS1500'];
var lockNoticeOpearteWord = '请下载小猪APP进行设置查看';
var cleanNoticeNoArr = ['BJ100','BJ110','BJ120','BJ130','BJ140','BJ150','BJ160','BJ170','BJ180','BJ200','BJ210','BJ220','BJ230','BJ231','BJ240','BJ241','BJ242','BJ250','BJ251','BJ252','BJ260','BJ270','BJ280','BJ290','BJ300','BJ700','BJ800'];
var cleanNoticeOpearteWord = '请下载小猪APP进行操作查看';
document.domain = topLevelDomain;
 
 /**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;this.attr("novalidate","novalidate");b=new c.validator(a,this[0]);c.data(this[0],"validator",b);if(b.settings.onsubmit){a=this.find("input, button");a.filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&a.filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function e(){if(b.settings.submitHandler){if(b.submitButton)var f=c("<input type='hidden'/>").attr("name",
b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&f.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b}else a&&a.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
else{var a=true,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a}},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(e,f){b[f]=d.attr(f);d.removeAttr(f)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;if(b.messages)e.messages[d.name]=c.extend(e.messages[d.name],b.messages);break;case "remove":if(!b){delete f[d.name];
return g}var h={};c.each(b.split(/\s/),function(j,i){h[i]=g[i];delete g[i]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.metadataRules(d),c.validator.classRules(d),c.validator.attributeRules(d),c.validator.staticRules(d)),d);if(d.required){e=d.required;delete d.required;d=c.extend({required:e},d)}return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,
b){this.settings=c.extend(true,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(arguments.length==1)return function(){var d=c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this,d)};if(arguments.length>2&&b.constructor!=Array)b=c.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];c.each(b,function(d,e){a=a.replace(RegExp("\\{"+d+"\\}","g"),e)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error_validate",
validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){if(!this.checkable(a)&&(a.name in this.submitted||!this.optional(a)))this.element(a)},
onkeyup:function(a){if(a.name in this.submitted||a==this.lastElement)this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).removeClass(b).addClass(d):c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,
a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:c.validator.format("Please enter no more than {0} characters."),
minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function a(e){var f=c.data(this[0].form,"validator"),g="on"+e.type.replace(/^validate/,
"");f.settings[g]&&f.settings[g].call(f,this[0],e)}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(e,f){c.each(f.split(/\s/),function(g,h){b[h]=e})});var d=
this.settings.rules;c.each(d,function(e,f){d[e]=c.validator.normalizeRule(f)});c(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",a).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",
a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(a){this.lastElement=
a=this.validationTargetFor(this.clean(a));this.prepareElement(a);this.currentElements=c(a);var b=this.check(a);if(b)delete this.invalid[a.name];else this.invalid[a.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,function(d){return!(d.name in a)})}this.settings.showErrors?
this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b=0,d;for(d in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==
0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&c.grep(this.errorList,function(b){return b.element.name==a.name}).length==1&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&
a.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!a.objectLength(c(this).rules()))return false;return b[this.name]=true})},clean:function(a){return c(a)[0]},errors:function(){return c(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},
prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(a){a=this.validationTargetFor(this.clean(a));var b=c(a).rules(),d=false,e;for(e in b){var f={method:e,parameters:b[e]};try{var g=c.validator.methods[e].call(this,a.value.replace(/\r/g,""),a,f.parameters);if(g=="dependency-mismatch")d=true;else{d=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!g){this.formatAndAdd(a,f);return false}}}catch(h){this.settings.debug&&window.console&&console.log("exception occured when checking element "+
a.id+", check the '"+f.method+"' method",h);throw h;}}if(!d){this.objectLength(b)&&this.successList.push(a);return true}},customMetaMessage:function(a,b){if(c.metadata){var d=this.settings.meta?c(a).metadata()[this.settings.meta]:c(a).metadata();return d&&d.messages&&d.messages[b]}},customMessage:function(a,b){var d=this.settings.messages[a];return d&&(d.constructor==String?d:d[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a]},defaultMessage:function(a,
b){return this.findDefined(this.customMessage(a.name,b),this.customMetaMessage(a,b),!this.settings.ignoreTitle&&a.title||undefined,c.validator.messages[b],"<strong>Warning: No message defined for "+a.name+"</strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,b.method),e=/\$?\{(\d+)\}/g;if(typeof d=="function")d=d.call(this,b.parameters,a);else if(e.test(d))d=jQuery.format(d.replace(e,"{$1}"),b.parameters);this.errorList.push({message:d,element:a});this.errorMap[a.name]=d;this.submitted[a.name]=
d},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);
if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d=this.errorsFor(a);if(d.length){d.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
d.attr("generated")&&d.html(b)}else{d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:true}).addClass(this.settings.errorClass).html(b||"");if(this.settings.wrapper)d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a))}if(!b&&this.settings.success){d.text("");typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d)}this.toShow=
this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")==b})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){if(this.checkable(a))a=this.findByName(a.name).not(this.settings.ignore)[0];return a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){var b=this.currentForm;return c(document.getElementsByName(a)).map(function(d,
e){return e.form==b&&e.name==a&&e||null})},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){return!c.validator.methods.required.call(this,
c.trim(a.value),a)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(a,b){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[a.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){c(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){c(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=
false}},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:true,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(a,b){a.constructor==String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,
a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b={};a=c(a);for(var d in c.validator.methods){var e;if(e=d==="required"&&typeof c.fn.prop==="function"?a.prop(d):a.attr(d))b[d]=e;else if(a[0].getAttribute("type")===d)b[d]=true}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(a){if(!c.metadata)return{};
var b=c.data(a.form,"validator").settings.meta;return b?c(a).metadata()[b]:c(a).metadata()},staticRules:function(a){var b={},d=c.data(a.form,"validator");if(d.settings.rules)b=c.validator.normalizeRule(d.settings.rules[a.name])||{};return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(e===false)delete a[d];else if(e.param||e.depends){var f=true;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}if(f)a[d]=e.param!==undefined?
e.param:true;else delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?e(b):e});c.each(["minlength","maxlength","min","max"],function(){if(a[this])a[this]=Number(a[this])});c.each(["rangelength","range"],function(){if(a[this])a[this]=[Number(a[this][0]),Number(a[this][1])]});if(c.validator.autoCreateRanges){if(a.min&&a.max){a.range=[a.min,a.max];delete a.min;delete a.max}if(a.minlength&&a.maxlength){a.rangelength=[a.minlength,a.maxlength];delete a.minlength;delete a.maxlength}}a.messages&&delete a.messages;
return a},normalizeRule:function(a){if(typeof a=="string"){var b={};c.each(a.split(/\s/),function(){b[this]=true});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=d!=undefined?d:c.validator.messages[a];b.length<3&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},methods:{required:function(a,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case "select":return(a=c(b).val())&&a.length>0;case "input":if(this.checkable(b))return this.getLength(a,
b)>0;default:return c.trim(a).length>0}},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=e.message;d=typeof d=="string"&&{url:d}||d;if(this.pending[b.name])return"pending";if(e.old===a)return e.valid;e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(true,{url:d,
mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(h){f.settings.messages[b.name].remote=e.originalMessage;var j=h===true;if(j){var i=f.formSubmitted;f.prepareElement(b);f.formSubmitted=i;f.successList.push(b);f.showErrors()}else{i={};h=h||f.defaultMessage(b,"remote");i[b.name]=e.message=c.isFunction(h)?h(a):h;f.showErrors(i)}e.valid=j;f.stopRequest(b,j)}},d));return"pending"},minlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)>=d},maxlength:function(a,
b,d){return this.optional(b)||this.getLength(c.trim(a),b)<=d},rangelength:function(a,b,d){a=this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,d){return this.optional(b)||a>=d},max:function(a,b,d){return this.optional(b)||a<=d},range:function(a,b,d){return this.optional(b)||a>=d[0]&&a<=d[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)},
url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 -]+/.test(a))return false;var d=0,e=0,f=false;a=a.replace(/\D/g,"");for(var g=a.length-1;g>=
0;g--){e=a.charAt(g);e=parseInt(e,10);if(f)if((e*=2)>9)e-=9;d+=e;f=!f}return d%10==0},accept:function(a,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||a.match(RegExp(".("+d+")$","i"))},equalTo:function(a,b,d){d=c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a==d.val()}}});c.format=c.validator.format})(jQuery);
(function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(d,e,f){e=d.port;if(d.mode=="abort"){a[e]&&a[e].abort();a[e]=f}});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;if(("mode"in d?d:c.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=b.apply(this,arguments)}return b.apply(this,arguments)}}})(jQuery);
(function(c){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)},handler:function(e){arguments[0]=c.event.fix(e);arguments[0].type=b;return c.event.handle.apply(this,arguments)}}});c.extend(c.fn,{validateDelegate:function(a,
b,d){return this.bind(b,function(e){var f=c(e.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);
 
 /*! jQuery UI - v1.9.2 - 2012-11-23
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.effect.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function(b,f){var a=0,e=/^ui-id-\d+$/;b.ui=b.ui||{};if(b.ui.version){return}b.extend(b.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}});b.fn.extend({_focus:b.fn.focus,focus:function(g,h){return typeof g==="number"?this.each(function(){var i=this;setTimeout(function(){b(i).focus();if(h){h.call(i)}},g)}):this._focus.apply(this,arguments)},scrollParent:function(){var g;if((b.ui.ie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){g=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(b.css(this,"position"))&&(/(auto|scroll)/).test(b.css(this,"overflow")+b.css(this,"overflow-y")+b.css(this,"overflow-x"))}).eq(0)}else{g=this.parents().filter(function(){return(/(auto|scroll)/).test(b.css(this,"overflow")+b.css(this,"overflow-y")+b.css(this,"overflow-x"))}).eq(0)}return(/fixed/).test(this.css("position"))||!g.length?b(document):g},zIndex:function(j){if(j!==f){return this.css("zIndex",j)}if(this.length){var h=b(this[0]),g,i;while(h.length&&h[0]!==document){g=h.css("position");if(g==="absolute"||g==="relative"||g==="fixed"){i=parseInt(h.css("zIndex"),10);if(!isNaN(i)&&i!==0){return i}}h=h.parent()}}return 0},uniqueId:function(){return this.each(function(){if(!this.id){this.id="ui-id-"+(++a)}})},removeUniqueId:function(){return this.each(function(){if(e.test(this.id)){b(this).removeAttr("id")}})}});function d(i,g){var k,j,h,l=i.nodeName.toLowerCase();if("area"===l){k=i.parentNode;j=k.name;if(!i.href||!j||k.nodeName.toLowerCase()!=="map"){return false}h=b("img[usemap=#"+j+"]")[0];return !!h&&c(h)}return(/input|select|textarea|button|object/.test(l)?!i.disabled:"a"===l?i.href||g:g)&&c(i)}function c(g){return b.expr.filters.visible(g)&&!b(g).parents().andSelf().filter(function(){return b.css(this,"visibility")==="hidden"}).length}b.extend(b.expr[":"],{data:b.expr.createPseudo?b.expr.createPseudo(function(g){return function(h){return !!b.data(h,g)}}):function(j,h,g){return !!b.data(j,g[3])},focusable:function(g){return d(g,!isNaN(b.attr(g,"tabindex")))},tabbable:function(i){var g=b.attr(i,"tabindex"),h=isNaN(g);return(h||g>=0)&&d(i,!h)}});b(function(){var g=document.body,h=g.appendChild(h=document.createElement("div"));h.offsetHeight;b.extend(h.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});b.support.minHeight=h.offsetHeight===100;b.support.selectstart="onselectstart" in h;g.removeChild(h).style.display="none"});if(!b("<a>").outerWidth(1).jquery){b.each(["Width","Height"],function(j,g){var h=g==="Width"?["Left","Right"]:["Top","Bottom"],k=g.toLowerCase(),m={innerWidth:b.fn.innerWidth,innerHeight:b.fn.innerHeight,outerWidth:b.fn.outerWidth,outerHeight:b.fn.outerHeight};function l(o,n,i,p){b.each(h,function(){n-=parseFloat(b.css(o,"padding"+this))||0;if(i){n-=parseFloat(b.css(o,"border"+this+"Width"))||0}if(p){n-=parseFloat(b.css(o,"margin"+this))||0}});return n}b.fn["inner"+g]=function(i){if(i===f){return m["inner"+g].call(this)}return this.each(function(){b(this).css(k,l(this,i)+"px")})};b.fn["outer"+g]=function(i,n){if(typeof i!=="number"){return m["outer"+g].call(this,i)}return this.each(function(){b(this).css(k,l(this,i,true,n)+"px")})}})}if(b("<a>").data("a-b","a").removeData("a-b").data("a-b")){b.fn.removeData=(function(g){return function(h){if(arguments.length){return g.call(this,b.camelCase(h))}else{return g.call(this)}}})(b.fn.removeData)}(function(){var g=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];b.ui.ie=g.length?true:false;b.ui.ie6=parseFloat(g[1],10)===6})();b.fn.extend({disableSelection:function(){return this.bind((b.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(g){g.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});b.extend(b.ui,{plugin:{add:function(h,j,l){var g,k=b.ui[h].prototype;for(g in l){k.plugins[g]=k.plugins[g]||[];k.plugins[g].push([j,l[g]])}},call:function(g,j,h){var k,l=g.plugins[j];if(!l||!g.element[0].parentNode||g.element[0].parentNode.nodeType===11){return}for(k=0;k<l.length;k++){if(g.options[l[k][0]]){l[k][1].apply(g.element,h)}}}},contains:b.contains,hasScroll:function(j,h){if(b(j).css("overflow")==="hidden"){return false}var g=(h&&h==="left")?"scrollLeft":"scrollTop",i=false;if(j[g]>0){return true}j[g]=1;i=(j[g]>0);j[g]=0;return i},isOverAxis:function(h,g,i){return(h>g)&&(h<(g+i))},isOver:function(l,h,k,j,g,i){return b.ui.isOverAxis(l,k,g)&&b.ui.isOverAxis(h,j,i)}})})(jQuery);(function(b,e){var a=0,d=Array.prototype.slice,c=b.cleanData;b.cleanData=function(f){for(var g=0,h;(h=f[g])!=null;g++){try{b(h).triggerHandler("remove")}catch(j){}}c(f)};b.widget=function(g,j,f){var m,l,i,k,h=g.split(".")[0];g=g.split(".")[1];m=h+"-"+g;if(!f){f=j;j=b.Widget}b.expr[":"][m.toLowerCase()]=function(n){return !!b.data(n,m)};b[h]=b[h]||{};l=b[h][g];i=b[h][g]=function(n,o){if(!this._createWidget){return new i(n,o)}if(arguments.length){this._createWidget(n,o)}};b.extend(i,l,{version:f.version,_proto:b.extend({},f),_childConstructors:[]});k=new j();k.options=b.widget.extend({},k.options);b.each(f,function(o,n){if(b.isFunction(n)){f[o]=(function(){var p=function(){return j.prototype[o].apply(this,arguments)},q=function(r){return j.prototype[o].apply(this,r)};return function(){var t=this._super,r=this._superApply,s;this._super=p;this._superApply=q;s=n.apply(this,arguments);this._super=t;this._superApply=r;return s}})()}});i.prototype=b.widget.extend(k,{widgetEventPrefix:l?k.widgetEventPrefix:g},f,{constructor:i,namespace:h,widgetName:g,widgetBaseClass:m,widgetFullName:m});if(l){b.each(l._childConstructors,function(o,p){var n=p.prototype;b.widget(n.namespace+"."+n.widgetName,i,p._proto)});delete l._childConstructors}else{j._childConstructors.push(i)}b.widget.bridge(g,i)};b.widget.extend=function(k){var g=d.call(arguments,1),j=0,f=g.length,h,i;for(;j<f;j++){for(h in g[j]){i=g[j][h];if(g[j].hasOwnProperty(h)&&i!==e){if(b.isPlainObject(i)){k[h]=b.isPlainObject(k[h])?b.widget.extend({},k[h],i):b.widget.extend({},i)}else{k[h]=i}}}}return k};b.widget.bridge=function(g,f){var h=f.prototype.widgetFullName||g;b.fn[g]=function(k){var i=typeof k==="string",j=d.call(arguments,1),l=this;k=!i&&j.length?b.widget.extend.apply(null,[k].concat(j)):k;if(i){this.each(function(){var n,m=b.data(this,h);if(!m){return b.error("cannot call methods on "+g+" prior to initialization; attempted to call method '"+k+"'")}if(!b.isFunction(m[k])||k.charAt(0)==="_"){return b.error("no such method '"+k+"' for "+g+" widget instance")}n=m[k].apply(m,j);if(n!==m&&n!==e){l=n&&n.jquery?l.pushStack(n.get()):n;return false}})}else{this.each(function(){var m=b.data(this,h);if(m){m.option(k||{})._init()}else{b.data(this,h,new f(k,this))}})}return l}};b.Widget=function(){};b.Widget._childConstructors=[];b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false,create:null},_createWidget:function(f,g){g=b(g||this.defaultElement||this)[0];this.element=b(g);this.uuid=a++;this.eventNamespace="."+this.widgetName+this.uuid;this.options=b.widget.extend({},this.options,this._getCreateOptions(),f);this.bindings=b();this.hoverable=b();this.focusable=b();if(g!==this){b.data(g,this.widgetName,this);b.data(g,this.widgetFullName,this);this._on(true,this.element,{remove:function(h){if(h.target===g){this.destroy()}}});this.document=b(g.style?g.ownerDocument:g.document||g);this.window=b(this.document[0].defaultView||this.document[0].parentWindow)}this._create();this._trigger("create",null,this._getCreateEventData());this._init()},_getCreateOptions:b.noop,_getCreateEventData:b.noop,_create:b.noop,_init:b.noop,destroy:function(){this._destroy();this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(b.camelCase(this.widgetFullName));this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled");this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")},_destroy:b.noop,widget:function(){return this.element},option:function(j,k){var f=j,l,h,g;if(arguments.length===0){return b.widget.extend({},this.options)}if(typeof j==="string"){f={};l=j.split(".");j=l.shift();if(l.length){h=f[j]=b.widget.extend({},this.options[j]);for(g=0;g<l.length-1;g++){h[l[g]]=h[l[g]]||{};h=h[l[g]]}j=l.pop();if(k===e){return h[j]===e?null:h[j]}h[j]=k}else{if(k===e){return this.options[j]===e?null:this.options[j]}f[j]=k}}this._setOptions(f);return this},_setOptions:function(f){var g;for(g in f){this._setOption(g,f[g])}return this},_setOption:function(f,g){this.options[f]=g;if(f==="disabled"){this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!g).attr("aria-disabled",g);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")}return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_on:function(i,h,g){var j,f=this;if(typeof i!=="boolean"){g=h;h=i;i=false}if(!g){g=h;h=this.element;j=this.widget()}else{h=j=b(h);this.bindings=this.bindings.add(h)}b.each(g,function(p,o){function m(){if(!i&&(f.options.disabled===true||b(this).hasClass("ui-state-disabled"))){return}return(typeof o==="string"?f[o]:o).apply(f,arguments)}if(typeof o!=="string"){m.guid=o.guid=o.guid||m.guid||b.guid++}var n=p.match(/^(\w+)\s*(.*)$/),l=n[1]+f.eventNamespace,k=n[2];if(k){j.delegate(k,l,m)}else{h.bind(l,m)}})},_off:function(g,f){f=(f||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;g.unbind(f).undelegate(f)},_delay:function(i,h){function g(){return(typeof i==="string"?f[i]:i).apply(f,arguments)}var f=this;return setTimeout(g,h||0)},_hoverable:function(f){this.hoverable=this.hoverable.add(f);this._on(f,{mouseenter:function(g){b(g.currentTarget).addClass("ui-state-hover")},mouseleave:function(g){b(g.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(f){this.focusable=this.focusable.add(f);this._on(f,{focusin:function(g){b(g.currentTarget).addClass("ui-state-focus")},focusout:function(g){b(g.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(f,g,h){var k,j,i=this.options[f];h=h||{};g=b.Event(g);g.type=(f===this.widgetEventPrefix?f:this.widgetEventPrefix+f).toLowerCase();g.target=this.element[0];j=g.originalEvent;if(j){for(k in j){if(!(k in g)){g[k]=j[k]}}}this.element.trigger(g,h);return !(b.isFunction(i)&&i.apply(this.element[0],[g].concat(h))===false||g.isDefaultPrevented())}};b.each({show:"fadeIn",hide:"fadeOut"},function(g,f){b.Widget.prototype["_"+g]=function(j,i,l){if(typeof i==="string"){i={effect:i}}var k,h=!i?g:i===true||typeof i==="number"?f:i.effect||f;i=i||{};if(typeof i==="number"){i={duration:i}}k=!b.isEmptyObject(i);i.complete=l;if(i.delay){j.delay(i.delay)}if(k&&b.effects&&(b.effects.effect[h]||b.uiBackCompat!==false&&b.effects[h])){j[g](i)}else{if(h!==g&&j[h]){j[h](i.duration,i.easing,l)}else{j.queue(function(m){b(this)[g]();if(l){l.call(j[0])}m()})}}}});if(b.uiBackCompat!==false){b.Widget.prototype._getCreateOptions=function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]}}})(jQuery);(function(b,c){var a=false;b(document).mouseup(function(d){a=false});b.widget("ui.mouse",{version:"1.9.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var d=this;this.element.bind("mousedown."+this.widgetName,function(e){return d._mouseDown(e)}).bind("click."+this.widgetName,function(e){if(true===b.data(e.target,d.widgetName+".preventClickEvent")){b.removeData(e.target,d.widgetName+".preventClickEvent");e.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);if(this._mouseMoveDelegate){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)}},_mouseDown:function(f){if(a){return}(this._mouseStarted&&this._mouseUp(f));this._mouseDownEvent=f;var e=this,g=(f.which===1),d=(typeof this.options.cancel==="string"&&f.target.nodeName?b(f.target).closest(this.options.cancel).length:false);if(!g||d||!this._mouseCapture(f)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){e.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(f)&&this._mouseDelayMet(f)){this._mouseStarted=(this._mouseStart(f)!==false);if(!this._mouseStarted){f.preventDefault();return true}}if(true===b.data(f.target,this.widgetName+".preventClickEvent")){b.removeData(f.target,this.widgetName+".preventClickEvent")}this._mouseMoveDelegate=function(h){return e._mouseMove(h)};this._mouseUpDelegate=function(h){return e._mouseUp(h)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);f.preventDefault();a=true;return true},_mouseMove:function(d){if(b.ui.ie&&!(document.documentMode>=9)&&!d.button){return this._mouseUp(d)}if(this._mouseStarted){this._mouseDrag(d);return d.preventDefault()}if(this._mouseDistanceMet(d)&&this._mouseDelayMet(d)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,d)!==false);(this._mouseStarted?this._mouseDrag(d):this._mouseUp(d))}return !this._mouseStarted},_mouseUp:function(d){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;if(d.target===this._mouseDownEvent.target){b.data(d.target,this.widgetName+".preventClickEvent",true)}this._mouseStop(d)}return false},_mouseDistanceMet:function(d){return(Math.max(Math.abs(this._mouseDownEvent.pageX-d.pageX),Math.abs(this._mouseDownEvent.pageY-d.pageY))>=this.options.distance)},_mouseDelayMet:function(d){return this.mouseDelayMet},_mouseStart:function(d){},_mouseDrag:function(d){},_mouseStop:function(d){},_mouseCapture:function(d){return true}})})(jQuery);(function(a,b){a.widget("ui.draggable",a.ui.mouse,{version:"1.9.2",widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"}(this.options.addClasses&&this.element.addClass("ui-draggable"));(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy()},_mouseCapture:function(c){var d=this.options;if(this.helper||d.disabled||a(c.target).is(".ui-resizable-handle")){return false}this.handle=this._getHandle(c);if(!this.handle){return false}a(d.iframeFix===true?"iframe":d.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"http://jci.xiaozhustatic1.com/e19061101/0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")});return true},_mouseStart:function(c){var d=this.options;this.helper=this._createHelper(c);this.helper.addClass("ui-draggable-dragging");this._cacheHelperProportions();if(a.ui.ddmanager){a.ui.ddmanager.current=this}this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:c.pageX-this.offset.left,top:c.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(c);this.originalPageX=c.pageX;this.originalPageY=c.pageY;(d.cursorAt&&this._adjustOffsetFromHelper(d.cursorAt));if(d.containment){this._setContainment()}if(this._trigger("start",c)===false){this._clear();return false}this._cacheHelperProportions();if(a.ui.ddmanager&&!d.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,c)}this._mouseDrag(c,true);if(a.ui.ddmanager){a.ui.ddmanager.dragStart(this,c)}return true},_mouseDrag:function(c,e){this.position=this._generatePosition(c);this.positionAbs=this._convertPositionTo("absolute");if(!e){var d=this._uiHash();if(this._trigger("drag",c,d)===false){this._mouseUp({});return false}this.position=d.position}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}if(a.ui.ddmanager){a.ui.ddmanager.drag(this,c)}return false},_mouseStop:function(e){var g=false;if(a.ui.ddmanager&&!this.options.dropBehaviour){g=a.ui.ddmanager.drop(this,e)}if(this.dropped){g=this.dropped;this.dropped=false}var c=this.element[0],f=false;while(c&&(c=c.parentNode)){if(c==document){f=true}}if(!f&&this.options.helper==="original"){return false}if((this.options.revert=="invalid"&&!g)||(this.options.revert=="valid"&&g)||this.options.revert===true||(a.isFunction(this.options.revert)&&this.options.revert.call(this.element,g))){var d=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(d._trigger("stop",e)!==false){d._clear()}})}else{if(this._trigger("stop",e)!==false){this._clear()}}return false},_mouseUp:function(c){a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)});if(a.ui.ddmanager){a.ui.ddmanager.dragStop(this,c)}return a.ui.mouse.prototype._mouseUp.call(this,c)},cancel:function(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp({})}else{this._clear()}return this},_getHandle:function(c){var d=!this.options.handle||!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==c.target){d=true}});return d},_createHelper:function(d){var e=this.options;var c=a.isFunction(e.helper)?a(e.helper.apply(this.element[0],[d])):(e.helper=="clone"?this.element.clone().removeAttr("id"):this.element);if(!c.parents("body").length){c.appendTo((e.appendTo=="parent"?this.element[0].parentNode:e.appendTo))}if(c[0]!=this.element[0]&&!(/(fixed|absolute)/).test(c.css("position"))){c.css("position","absolute")}return c},_adjustOffsetFromHelper:function(c){if(typeof c=="string"){c=c.split(" ")}if(a.isArray(c)){c={left:+c[0],top:+c[1]||0}}if("left" in c){this.offset.click.left=c.left+this.margins.left}if("right" in c){this.offset.click.left=this.helperProportions.width-c.right+this.margins.left}if("top" in c){this.offset.click.top=c.top+this.margins.top}if("bottom" in c){this.offset.click.top=this.helperProportions.height-c.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var c=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.contains(this.scrollParent[0],this.offsetParent[0])){c.left+=this.scrollParent.scrollLeft();c.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.ui.ie)){c={top:0,left:0}}return{top:c.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:c.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var c=this.element.position();return{top:c.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:c.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0),right:(parseInt(this.element.css("marginRight"),10)||0),bottom:(parseInt(this.element.css("marginBottom"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var g=this.options;if(g.containment=="parent"){g.containment=this.helper[0].parentNode}if(g.containment=="document"||g.containment=="window"){this.containment=[g.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,g.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(g.containment=="document"?0:a(window).scrollLeft())+a(g.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(g.containment=="document"?0:a(window).scrollTop())+(a(g.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(g.containment)&&g.containment.constructor!=Array){var h=a(g.containment);var e=h[0];if(!e){return}var f=h.offset();var d=(a(e).css("overflow")!="hidden");this.containment=[(parseInt(a(e).css("borderLeftWidth"),10)||0)+(parseInt(a(e).css("paddingLeft"),10)||0),(parseInt(a(e).css("borderTopWidth"),10)||0)+(parseInt(a(e).css("paddingTop"),10)||0),(d?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(a(e).css("borderLeftWidth"),10)||0)-(parseInt(a(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(d?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(a(e).css("borderTopWidth"),10)||0)-(parseInt(a(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];this.relative_container=h}else{if(g.containment.constructor==Array){this.containment=g.containment}}},_convertPositionTo:function(g,i){if(!i){i=this.position}var e=g=="absolute"?1:-1;var f=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=(/(html|body)/i).test(c[0].tagName);return{top:(i.top+this.offset.relative.top*e+this.offset.parent.top*e-((this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(h?0:c.scrollTop()))*e)),left:(i.left+this.offset.relative.left*e+this.offset.parent.left*e-((this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:c.scrollLeft())*e))}},_generatePosition:function(d){var e=this.options,l=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(l[0].tagName);var h=d.pageX;var g=d.pageY;if(this.originalPosition){var c;if(this.containment){if(this.relative_container){var k=this.relative_container.offset();c=[this.containment[0]+k.left,this.containment[1]+k.top,this.containment[2]+k.left,this.containment[3]+k.top]}else{c=this.containment}if(d.pageX-this.offset.click.left<c[0]){h=c[0]+this.offset.click.left}if(d.pageY-this.offset.click.top<c[1]){g=c[1]+this.offset.click.top}if(d.pageX-this.offset.click.left>c[2]){h=c[2]+this.offset.click.left}if(d.pageY-this.offset.click.top>c[3]){g=c[3]+this.offset.click.top}}if(e.grid){var j=e.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/e.grid[1])*e.grid[1]:this.originalPageY;g=c?(!(j-this.offset.click.top<c[1]||j-this.offset.click.top>c[3])?j:(!(j-this.offset.click.top<c[1])?j-e.grid[1]:j+e.grid[1])):j;var f=e.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/e.grid[0])*e.grid[0]:this.originalPageX;h=c?(!(f-this.offset.click.left<c[0]||f-this.offset.click.left>c[2])?f:(!(f-this.offset.click.left<c[0])?f-e.grid[0]:f+e.grid[0])):f}}return{top:(g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+((this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:l.scrollTop())))),left:(h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+((this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:l.scrollLeft())))}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()}this.helper=null;this.cancelHelperRemoval=false},_trigger:function(c,d,e){e=e||this._uiHash();a.ui.plugin.call(this,c,[d,e]);if(c=="drag"){this.positionAbs=this._convertPositionTo("absolute")}return a.Widget.prototype._trigger.call(this,c,d,e)},plugins:{},_uiHash:function(c){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});a.ui.plugin.add("draggable","connectToSortable",{start:function(d,f){var e=a(this).data("draggable"),g=e.options,c=a.extend({},f,{item:e.element});e.sortables=[];a(g.connectToSortable).each(function(){var h=a.data(this,"sortable");if(h&&!h.options.disabled){e.sortables.push({instance:h,shouldRevert:h.options.revert});h.refreshPositions();h._trigger("activate",d,c)}})},stop:function(d,f){var e=a(this).data("draggable"),c=a.extend({},f,{item:e.element});a.each(e.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;e.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert){this.instance.options.revert=true}this.instance._mouseStop(d);this.instance.options.helper=this.instance.options._helper;if(e.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})}}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",d,c)}})},drag:function(d,g){var f=a(this).data("draggable"),c=this;var e=function(j){var p=this.offset.click.top,n=this.offset.click.left;var h=this.positionAbs.top,l=this.positionAbs.left;var k=j.height,m=j.width;var q=j.top,i=j.left;return a.ui.isOver(h+p,l+n,q,i,k,m)};a.each(f.sortables,function(j){var h=false;var k=this;this.instance.positionAbs=f.positionAbs;this.instance.helperProportions=f.helperProportions;this.instance.offset.click=f.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){h=true;a.each(f.sortables,function(){this.instance.positionAbs=f.positionAbs;this.instance.helperProportions=f.helperProportions;this.instance.offset.click=f.offset.click;if(this!=k&&this.instance._intersectsWith(this.instance.containerCache)&&a.ui.contains(k.instance.element[0],this.instance.element[0])){h=false}return h})}if(h){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=a(c).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return g.helper[0]};d.target=this.instance.currentItem[0];this.instance._mouseCapture(d,true);this.instance._mouseStart(d,true,true);this.instance.offset.click.top=f.offset.click.top;this.instance.offset.click.left=f.offset.click.left;this.instance.offset.parent.left-=f.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=f.offset.parent.top-this.instance.offset.parent.top;f._trigger("toSortable",d);f.dropped=this.instance.element;f.currentItem=f.element;this.instance.fromOutside=f}if(this.instance.currentItem){this.instance._mouseDrag(d)}}else{if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",d,this.instance._uiHash(this.instance));this.instance._mouseStop(d,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder){this.instance.placeholder.remove()}f._trigger("fromSortable",d);f.dropped=false}}})}});a.ui.plugin.add("draggable","cursor",{start:function(d,e){var c=a("body"),f=a(this).data("draggable").options;if(c.css("cursor")){f._cursor=c.css("cursor")}c.css("cursor",f.cursor)},stop:function(c,d){var e=a(this).data("draggable").options;if(e._cursor){a("body").css("cursor",e._cursor)}}});a.ui.plugin.add("draggable","opacity",{start:function(d,e){var c=a(e.helper),f=a(this).data("draggable").options;if(c.css("opacity")){f._opacity=c.css("opacity")}c.css("opacity",f.opacity)},stop:function(c,d){var e=a(this).data("draggable").options;if(e._opacity){a(d.helper).css("opacity",e._opacity)}}});a.ui.plugin.add("draggable","scroll",{start:function(d,e){var c=a(this).data("draggable");if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){c.overflowOffset=c.scrollParent.offset()}},drag:function(e,f){var d=a(this).data("draggable"),g=d.options,c=false;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!g.axis||g.axis!="x"){if((d.overflowOffset.top+d.scrollParent[0].offsetHeight)-e.pageY<g.scrollSensitivity){d.scrollParent[0].scrollTop=c=d.scrollParent[0].scrollTop+g.scrollSpeed}else{if(e.pageY-d.overflowOffset.top<g.scrollSensitivity){d.scrollParent[0].scrollTop=c=d.scrollParent[0].scrollTop-g.scrollSpeed}}}if(!g.axis||g.axis!="y"){if((d.overflowOffset.left+d.scrollParent[0].offsetWidth)-e.pageX<g.scrollSensitivity){d.scrollParent[0].scrollLeft=c=d.scrollParent[0].scrollLeft+g.scrollSpeed}else{if(e.pageX-d.overflowOffset.left<g.scrollSensitivity){d.scrollParent[0].scrollLeft=c=d.scrollParent[0].scrollLeft-g.scrollSpeed}}}}else{if(!g.axis||g.axis!="x"){if(e.pageY-a(document).scrollTop()<g.scrollSensitivity){c=a(document).scrollTop(a(document).scrollTop()-g.scrollSpeed)}else{if(a(window).height()-(e.pageY-a(document).scrollTop())<g.scrollSensitivity){c=a(document).scrollTop(a(document).scrollTop()+g.scrollSpeed)}}}if(!g.axis||g.axis!="y"){if(e.pageX-a(document).scrollLeft()<g.scrollSensitivity){c=a(document).scrollLeft(a(document).scrollLeft()-g.scrollSpeed)}else{if(a(window).width()-(e.pageX-a(document).scrollLeft())<g.scrollSensitivity){c=a(document).scrollLeft(a(document).scrollLeft()+g.scrollSpeed)}}}}if(c!==false&&a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(d,e)}}});a.ui.plugin.add("draggable","snap",{start:function(d,e){var c=a(this).data("draggable"),f=c.options;c.snapElements=[];a(f.snap.constructor!=String?(f.snap.items||":data(draggable)"):f.snap).each(function(){var h=a(this);var g=h.offset();if(this!=c.element[0]){c.snapElements.push({item:this,width:h.outerWidth(),height:h.outerHeight(),top:g.top,left:g.left})}})},drag:function(u,p){var g=a(this).data("draggable"),q=g.options;var z=q.snapTolerance;var y=p.offset.left,w=y+g.helperProportions.width,f=p.offset.top,e=f+g.helperProportions.height;for(var v=g.snapElements.length-1;v>=0;v--){var s=g.snapElements[v].left,n=s+g.snapElements[v].width,m=g.snapElements[v].top,B=m+g.snapElements[v].height;if(!((s-z<y&&y<n+z&&m-z<f&&f<B+z)||(s-z<y&&y<n+z&&m-z<e&&e<B+z)||(s-z<w&&w<n+z&&m-z<f&&f<B+z)||(s-z<w&&w<n+z&&m-z<e&&e<B+z))){if(g.snapElements[v].snapping){(g.options.snap.release&&g.options.snap.release.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=false;continue}if(q.snapMode!="inner"){var c=Math.abs(m-e)<=z;var A=Math.abs(B-f)<=z;var j=Math.abs(s-w)<=z;var k=Math.abs(n-y)<=z;if(c){p.position.top=g._convertPositionTo("relative",{top:m-g.helperProportions.height,left:0}).top-g.margins.top}if(A){p.position.top=g._convertPositionTo("relative",{top:B,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s-g.helperProportions.width}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n}).left-g.margins.left}}var h=(c||A||j||k);if(q.snapMode!="outer"){var c=Math.abs(m-f)<=z;var A=Math.abs(B-e)<=z;var j=Math.abs(s-y)<=z;var k=Math.abs(n-w)<=z;if(c){p.position.top=g._convertPositionTo("relative",{top:m,left:0}).top-g.margins.top}if(A){p.position.top=g._convertPositionTo("relative",{top:B-g.helperProportions.height,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n-g.helperProportions.width}).left-g.margins.left}}if(!g.snapElements[v].snapping&&(c||A||j||k||h)){(g.options.snap.snap&&g.options.snap.snap.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=(c||A||j||k||h)}}});a.ui.plugin.add("draggable","stack",{start:function(d,e){var g=a(this).data("draggable").options;var f=a.makeArray(a(g.stack)).sort(function(i,h){return(parseInt(a(i).css("zIndex"),10)||0)-(parseInt(a(h).css("zIndex"),10)||0)});if(!f.length){return}var c=parseInt(f[0].style.zIndex)||0;a(f).each(function(h){this.style.zIndex=c+h});this[0].style.zIndex=c+f.length}});a.ui.plugin.add("draggable","zIndex",{start:function(d,e){var c=a(e.helper),f=a(this).data("draggable").options;if(c.css("zIndex")){f._zIndex=c.css("zIndex")}c.css("zIndex",f.zIndex)},stop:function(c,d){var e=a(this).data("draggable").options;if(e._zIndex){a(d.helper).css("zIndex",e._zIndex)}}})})(jQuery);(function(a,b){a.widget("ui.droppable",{version:"1.9.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var d=this.options,c=d.accept;this.isover=0;this.isout=1;this.accept=a.isFunction(c)?c:function(e){return e.is(c)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};a.ui.ddmanager.droppables[d.scope]=a.ui.ddmanager.droppables[d.scope]||[];a.ui.ddmanager.droppables[d.scope].push(this);(d.addClasses&&this.element.addClass("ui-droppable"))},_destroy:function(){var c=a.ui.ddmanager.droppables[this.options.scope];for(var d=0;d<c.length;d++){if(c[d]==this){c.splice(d,1)}}this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(c,d){if(c=="accept"){this.accept=a.isFunction(d)?d:function(e){return e.is(d)}}a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(d){var c=a.ui.ddmanager.current;if(this.options.activeClass){this.element.addClass(this.options.activeClass)}(c&&this._trigger("activate",d,this.ui(c)))},_deactivate:function(d){var c=a.ui.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}(c&&this._trigger("deactivate",d,this.ui(c)))},_over:function(d){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0]){return}if(this.accept.call(this.element[0],(c.currentItem||c.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)}this._trigger("over",d,this.ui(c))}},_out:function(d){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0]){return}if(this.accept.call(this.element[0],(c.currentItem||c.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("out",d,this.ui(c))}},_drop:function(d,e){var c=e||a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0]){return false}var f=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var g=a.data(this,"droppable");if(g.options.greedy&&!g.options.disabled&&g.options.scope==c.options.scope&&g.accept.call(g.element[0],(c.currentItem||c.element))&&a.ui.intersect(c,a.extend(g,{offset:g.element.offset()}),g.options.tolerance)){f=true;return false}});if(f){return false}if(this.accept.call(this.element[0],(c.currentItem||c.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("drop",d,this.ui(c));return this.element}return false},ui:function(d){return{draggable:(d.currentItem||d.element),helper:d.helper,position:d.position,offset:d.positionAbs}}});a.ui.intersect=function(q,j,o){if(!j.offset){return false}var e=(q.positionAbs||q.position.absolute).left,d=e+q.helperProportions.width,n=(q.positionAbs||q.position.absolute).top,m=n+q.helperProportions.height;var g=j.offset.left,c=g+j.proportions.width,p=j.offset.top,k=p+j.proportions.height;switch(o){case"fit":return(g<=e&&d<=c&&p<=n&&m<=k);break;case"intersect":return(g<e+(q.helperProportions.width/2)&&d-(q.helperProportions.width/2)<c&&p<n+(q.helperProportions.height/2)&&m-(q.helperProportions.height/2)<k);break;case"pointer":var h=((q.positionAbs||q.position.absolute).left+(q.clickOffset||q.offset.click).left),i=((q.positionAbs||q.position.absolute).top+(q.clickOffset||q.offset.click).top),f=a.ui.isOver(i,h,p,g,j.proportions.height,j.proportions.width);return f;break;case"touch":return((n>=p&&n<=k)||(m>=p&&m<=k)||(n<p&&m>k))&&((e>=g&&e<=c)||(d>=g&&d<=c)||(e<g&&d>c));break;default:return false;break}};a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(f,h){var c=a.ui.ddmanager.droppables[f.options.scope]||[];var g=h?h.type:null;var k=(f.currentItem||f.element).find(":data(droppable)").andSelf();droppablesLoop:for(var e=0;e<c.length;e++){if(c[e].options.disabled||(f&&!c[e].accept.call(c[e].element[0],(f.currentItem||f.element)))){continue}for(var d=0;d<k.length;d++){if(k[d]==c[e].element[0]){c[e].proportions.height=0;continue droppablesLoop}}c[e].visible=c[e].element.css("display")!="none";if(!c[e].visible){continue}if(g=="mousedown"){c[e]._activate.call(c[e],h)}c[e].offset=c[e].element.offset();c[e].proportions={width:c[e].element[0].offsetWidth,height:c[e].element[0].offsetHeight}}},drop:function(c,d){var e=false;a.each(a.ui.ddmanager.droppables[c.options.scope]||[],function(){if(!this.options){return}if(!this.options.disabled&&this.visible&&a.ui.intersect(c,this,this.options.tolerance)){e=this._drop.call(this,d)||e}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],(c.currentItem||c.element))){this.isout=1;this.isover=0;this._deactivate.call(this,d)}});return e},dragStart:function(c,d){c.element.parentsUntil("body").bind("scroll.droppable",function(){if(!c.options.refreshPositions){a.ui.ddmanager.prepareOffsets(c,d)}})},drag:function(c,d){if(c.options.refreshPositions){a.ui.ddmanager.prepareOffsets(c,d)}a.each(a.ui.ddmanager.droppables[c.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return}var g=a.ui.intersect(c,this,this.options.tolerance);var i=!g&&this.isover==1?"isout":(g&&this.isover==0?"isover":null);if(!i){return}var h;if(this.options.greedy){var f=this.options.scope;var e=this.element.parents(":data(droppable)").filter(function(){return a.data(this,"droppable").options.scope===f});if(e.length){h=a.data(e[0],"droppable");h.greedyChild=(i=="isover"?1:0)}}if(h&&i=="isover"){h.isover=0;h.isout=1;h._out.call(h,d)}this[i]=1;this[i=="isout"?"isover":"isout"]=0;this[i=="isover"?"_over":"_out"].call(this,d);if(h&&i=="isout"){h.isout=0;h.isover=1;h._over.call(h,d)}})},dragStop:function(c,d){c.element.parentsUntil("body").unbind("scroll.droppable");if(!c.options.refreshPositions){a.ui.ddmanager.prepareOffsets(c,d)}}}})(jQuery);(function(c,d){c.widget("ui.resizable",c.ui.mouse,{version:"1.9.2",widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function(){var h=this,k=this.options;this.element.addClass("ui-resizable");c.extend(this,{_aspectRatio:!!(k.aspectRatio),aspectRatio:k.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:k.helper||k.ghost||k.animate?k.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=k.handles||(!c(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"}var l=this.handles.split(",");this.handles={};for(var f=0;f<l.length;f++){var j=c.trim(l[f]),e="ui-resizable-"+j;var g=c('<div class="ui-resizable-handle '+e+'"></div>');g.css({zIndex:k.zIndex});if("se"==j){g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")}this.handles[j]=".ui-resizable-"+j;this.element.append(g)}}this._renderAxis=function(q){q=q||this.element;for(var n in this.handles){if(this.handles[n].constructor==String){this.handles[n]=c(this.handles[n],this.element).show()}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var o=c(this.handles[n],this.element),p=0;p=/sw|ne|nw|se|n|s/.test(n)?o.outerHeight():o.outerWidth();var m=["padding",/ne|nw|n/.test(n)?"Top":/se|sw|s/.test(n)?"Bottom":/^e$/.test(n)?"Right":"Left"].join("");q.css(m,p);this._proportionallyResize()}if(!c(this.handles[n]).length){continue}}};this._renderAxis(this.element);this._handles=c(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function(){if(!h.resizing){if(this.className){var i=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)}h.axis=i&&i[1]?i[1]:"se"}});if(k.autoHide){this._handles.hide();c(this.element).addClass("ui-resizable-autohide").mouseenter(function(){if(k.disabled){return}c(this).removeClass("ui-resizable-autohide");h._handles.show()}).mouseleave(function(){if(k.disabled){return}if(!h.resizing){c(this).addClass("ui-resizable-autohide");h._handles.hide()}})}this._mouseInit()},_destroy:function(){this._mouseDestroy();var e=function(g){c(g).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){e(this.element);var f=this.element;this.originalElement.css({position:f.css("position"),width:f.outerWidth(),height:f.outerHeight(),top:f.css("top"),left:f.css("left")}).insertAfter(f);f.remove()}this.originalElement.css("resize",this.originalResizeStyle);e(this.originalElement);return this},_mouseCapture:function(f){var g=false;for(var e in this.handles){if(c(this.handles[e])[0]==f.target){g=true}}return !this.options.disabled&&g},_mouseStart:function(g){var j=this.options,f=this.element.position(),e=this.element;this.resizing=true;this.documentScroll={top:c(document).scrollTop(),left:c(document).scrollLeft()};if(e.is(".ui-draggable")||(/absolute/).test(e.css("position"))){e.css({position:"absolute",top:f.top,left:f.left})}this._renderProxy();var k=b(this.helper.css("left")),h=b(this.helper.css("top"));if(j.containment){k+=c(j.containment).scrollLeft()||0;h+=c(j.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:k,top:h};this.size=this._helper?{width:e.outerWidth(),height:e.outerHeight()}:{width:e.width(),height:e.height()};this.originalSize=this._helper?{width:e.outerWidth(),height:e.outerHeight()}:{width:e.width(),height:e.height()};this.originalPosition={left:k,top:h};this.sizeDiff={width:e.outerWidth()-e.width(),height:e.outerHeight()-e.height()};this.originalMousePosition={left:g.pageX,top:g.pageY};this.aspectRatio=(typeof j.aspectRatio=="number")?j.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);var i=c(".ui-resizable-"+this.axis).css("cursor");c("body").css("cursor",i=="auto"?this.axis+"-resize":i);e.addClass("ui-resizable-resizing");this._propagate("start",g);return true},_mouseDrag:function(e){var g=this.helper,f=this.options,l={},k=this,i=this.originalMousePosition,m=this.axis;var p=(e.pageX-i.left)||0,n=(e.pageY-i.top)||0;var h=this._change[m];if(!h){return false}var j=h.apply(this,[e,p,n]);this._updateVirtualBoundaries(e.shiftKey);if(this._aspectRatio||e.shiftKey){j=this._updateRatio(j,e)}j=this._respectSize(j,e);this._propagate("resize",e);g.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()}this._updateCache(j);this._trigger("resize",e,this.ui());return false},_mouseStop:function(h){this.resizing=false;var i=this.options,l=this;if(this._helper){var g=this._proportionallyResizeElements,e=g.length&&(/textarea/i).test(g[0].nodeName),f=e&&c.ui.hasScroll(g[0],"left")?0:l.sizeDiff.height,k=e?0:l.sizeDiff.width;var n={width:(l.helper.width()-k),height:(l.helper.height()-f)},j=(parseInt(l.element.css("left"),10)+(l.position.left-l.originalPosition.left))||null,m=(parseInt(l.element.css("top"),10)+(l.position.top-l.originalPosition.top))||null;if(!i.animate){this.element.css(c.extend(n,{top:m,left:j}))}l.helper.height(l.size.height);l.helper.width(l.size.width);if(this._helper&&!i.animate){this._proportionallyResize()}}c("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",h);if(this._helper){this.helper.remove()}return false},_updateVirtualBoundaries:function(g){var j=this.options,i,h,f,k,e;e={minWidth:a(j.minWidth)?j.minWidth:0,maxWidth:a(j.maxWidth)?j.maxWidth:Infinity,minHeight:a(j.minHeight)?j.minHeight:0,maxHeight:a(j.maxHeight)?j.maxHeight:Infinity};if(this._aspectRatio||g){i=e.minHeight*this.aspectRatio;f=e.minWidth/this.aspectRatio;h=e.maxHeight*this.aspectRatio;k=e.maxWidth/this.aspectRatio;if(i>e.minWidth){e.minWidth=i}if(f>e.minHeight){e.minHeight=f}if(h<e.maxWidth){e.maxWidth=h}if(k<e.maxHeight){e.maxHeight=k}}this._vBoundaries=e},_updateCache:function(e){var f=this.options;this.offset=this.helper.offset();if(a(e.left)){this.position.left=e.left}if(a(e.top)){this.position.top=e.top}if(a(e.height)){this.size.height=e.height}if(a(e.width)){this.size.width=e.width}},_updateRatio:function(h,g){var i=this.options,j=this.position,f=this.size,e=this.axis;if(a(h.height)){h.width=(h.height*this.aspectRatio)}else{if(a(h.width)){h.height=(h.width/this.aspectRatio)}}if(e=="sw"){h.left=j.left+(f.width-h.width);h.top=null}if(e=="nw"){h.top=j.top+(f.height-h.height);h.left=j.left+(f.width-h.width)}return h},_respectSize:function(l,g){var j=this.helper,i=this._vBoundaries,r=this._aspectRatio||g.shiftKey,q=this.axis,t=a(l.width)&&i.maxWidth&&(i.maxWidth<l.width),m=a(l.height)&&i.maxHeight&&(i.maxHeight<l.height),h=a(l.width)&&i.minWidth&&(i.minWidth>l.width),s=a(l.height)&&i.minHeight&&(i.minHeight>l.height);if(h){l.width=i.minWidth}if(s){l.height=i.minHeight}if(t){l.width=i.maxWidth}if(m){l.height=i.maxHeight}var f=this.originalPosition.left+this.originalSize.width,p=this.position.top+this.size.height;var k=/sw|nw|w/.test(q),e=/nw|ne|n/.test(q);if(h&&k){l.left=f-i.minWidth}if(t&&k){l.left=f-i.maxWidth}if(s&&e){l.top=p-i.minHeight}if(m&&e){l.top=p-i.maxHeight}var n=!l.width&&!l.height;if(n&&!l.left&&l.top){l.top=null}else{if(n&&!l.top&&l.left){l.left=null}}return l},_proportionallyResize:function(){var k=this.options;if(!this._proportionallyResizeElements.length){return}var g=this.helper||this.element;for(var f=0;f<this._proportionallyResizeElements.length;f++){var h=this._proportionallyResizeElements[f];if(!this.borderDif){var e=[h.css("borderTopWidth"),h.css("borderRightWidth"),h.css("borderBottomWidth"),h.css("borderLeftWidth")],j=[h.css("paddingTop"),h.css("paddingRight"),h.css("paddingBottom"),h.css("paddingLeft")];this.borderDif=c.map(e,function(l,n){var m=parseInt(l,10)||0,o=parseInt(j[n],10)||0;return m+o})}h.css({height:(g.height()-this.borderDif[0]-this.borderDif[2])||0,width:(g.width()-this.borderDif[1]-this.borderDif[3])||0})}},_renderProxy:function(){var e=this.element,h=this.options;this.elementOffset=e.offset();if(this._helper){this.helper=this.helper||c('<div style="overflow:hidden;"></div>');var f=(c.ui.ie6?1:0),g=(c.ui.ie6?2:-1);this.helper.addClass(this._helper).css({width:this.element.outerWidth()+g,height:this.element.outerHeight()+g,position:"absolute",left:this.elementOffset.left-f+"px",top:this.elementOffset.top-f+"px",zIndex:++h.zIndex});this.helper.appendTo("body").disableSelection()}else{this.helper=this.element}},_change:{e:function(g,f,e){return{width:this.originalSize.width+f}},w:function(h,f,e){var j=this.options,g=this.originalSize,i=this.originalPosition;return{left:i.left+f,width:g.width-f}},n:function(h,f,e){var j=this.options,g=this.originalSize,i=this.originalPosition;return{top:i.top+e,height:g.height-e}},s:function(g,f,e){return{height:this.originalSize.height+e}},se:function(g,f,e){return c.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[g,f,e]))},sw:function(g,f,e){return c.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[g,f,e]))},ne:function(g,f,e){return c.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[g,f,e]))},nw:function(g,f,e){return c.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[g,f,e]))}},_propagate:function(f,e){c.ui.plugin.call(this,f,[e,this.ui()]);(f!="resize"&&this._trigger(f,e,this.ui()))},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});c.ui.plugin.add("resizable","alsoResize",{start:function(f,g){var e=c(this).data("resizable"),i=e.options;var h=function(j){c(j).each(function(){var k=c(this);k.data("resizable-alsoresize",{width:parseInt(k.width(),10),height:parseInt(k.height(),10),left:parseInt(k.css("left"),10),top:parseInt(k.css("top"),10)})})};if(typeof(i.alsoResize)=="object"&&!i.alsoResize.parentNode){if(i.alsoResize.length){i.alsoResize=i.alsoResize[0];h(i.alsoResize)}else{c.each(i.alsoResize,function(j){h(j)})}}else{h(i.alsoResize)}},resize:function(g,i){var f=c(this).data("resizable"),j=f.options,h=f.originalSize,l=f.originalPosition;var k={height:(f.size.height-h.height)||0,width:(f.size.width-h.width)||0,top:(f.position.top-l.top)||0,left:(f.position.left-l.left)||0},e=function(m,n){c(m).each(function(){var q=c(this),r=c(this).data("resizable-alsoresize"),p={},o=n&&n.length?n:q.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];c.each(o,function(s,u){var t=(r[u]||0)+(k[u]||0);if(t&&t>=0){p[u]=t||null}});q.css(p)})};if(typeof(j.alsoResize)=="object"&&!j.alsoResize.nodeType){c.each(j.alsoResize,function(m,n){e(m,n)})}else{e(j.alsoResize)}},stop:function(e,f){c(this).removeData("resizable-alsoresize")}});c.ui.plugin.add("resizable","animate",{stop:function(i,p){var m=c(this).data("resizable"),j=m.options;var h=m._proportionallyResizeElements,e=h.length&&(/textarea/i).test(h[0].nodeName),f=e&&c.ui.hasScroll(h[0],"left")?0:m.sizeDiff.height,l=e?0:m.sizeDiff.width;var g={width:(m.size.width-l),height:(m.size.height-f)},k=(parseInt(m.element.css("left"),10)+(m.position.left-m.originalPosition.left))||null,n=(parseInt(m.element.css("top"),10)+(m.position.top-m.originalPosition.top))||null;m.element.animate(c.extend(g,n&&k?{top:n,left:k}:{}),{duration:j.animateDuration,easing:j.animateEasing,step:function(){var o={width:parseInt(m.element.css("width"),10),height:parseInt(m.element.css("height"),10),top:parseInt(m.element.css("top"),10),left:parseInt(m.element.css("left"),10)};if(h&&h.length){c(h[0]).css({width:o.width,height:o.height})}m._updateCache(o);m._propagate("resize",i)}})}});c.ui.plugin.add("resizable","containment",{start:function(f,s){var q=c(this).data("resizable"),j=q.options,l=q.element;var g=j.containment,k=(g instanceof c)?g.get(0):(/parent/.test(g))?l.parent().get(0):g;if(!k){return}q.containerElement=c(k);if(/document/.test(g)||g==document){q.containerOffset={left:0,top:0};q.containerPosition={left:0,top:0};q.parentData={element:c(document),left:0,top:0,width:c(document).width(),height:c(document).height()||document.body.parentNode.scrollHeight}}else{var n=c(k),i=[];c(["Top","Right","Left","Bottom"]).each(function(p,o){i[p]=b(n.css("padding"+o))});q.containerOffset=n.offset();q.containerPosition=n.position();q.containerSize={height:(n.innerHeight()-i[3]),width:(n.innerWidth()-i[1])};var r=q.containerOffset,e=q.containerSize.height,m=q.containerSize.width,h=(c.ui.hasScroll(k,"left")?k.scrollWidth:m),t=(c.ui.hasScroll(k)?k.scrollHeight:e);q.parentData={element:k,left:r.left,top:r.top,width:h,height:t}}},resize:function(g,r){var m=c(this).data("resizable"),i=m.options,f=m.containerSize,q=m.containerOffset,n=m.size,p=m.position,s=m._aspectRatio||g.shiftKey,e={top:0,left:0},h=m.containerElement;if(h[0]!=document&&(/static/).test(h.css("position"))){e=q}if(p.left<(m._helper?q.left:0)){m.size.width=m.size.width+(m._helper?(m.position.left-q.left):(m.position.left-e.left));if(s){m.size.height=m.size.width/m.aspectRatio}m.position.left=i.helper?q.left:0}if(p.top<(m._helper?q.top:0)){m.size.height=m.size.height+(m._helper?(m.position.top-q.top):m.position.top);if(s){m.size.width=m.size.height*m.aspectRatio}m.position.top=m._helper?q.top:0}m.offset.left=m.parentData.left+m.position.left;m.offset.top=m.parentData.top+m.position.top;var l=Math.abs((m._helper?m.offset.left-e.left:(m.offset.left-e.left))+m.sizeDiff.width),t=Math.abs((m._helper?m.offset.top-e.top:(m.offset.top-q.top))+m.sizeDiff.height);var k=m.containerElement.get(0)==m.element.parent().get(0),j=/relative|absolute/.test(m.containerElement.css("position"));if(k&&j){l-=m.parentData.left}if(l+m.size.width>=m.parentData.width){m.size.width=m.parentData.width-l;if(s){m.size.height=m.size.width/m.aspectRatio}}if(t+m.size.height>=m.parentData.height){m.size.height=m.parentData.height-t;if(s){m.size.width=m.size.height*m.aspectRatio}}},stop:function(f,p){var l=c(this).data("resizable"),g=l.options,m=l.position,n=l.containerOffset,e=l.containerPosition,i=l.containerElement;var j=c(l.helper),r=j.offset(),q=j.outerWidth()-l.sizeDiff.width,k=j.outerHeight()-l.sizeDiff.height;if(l._helper&&!g.animate&&(/relative/).test(i.css("position"))){c(this).css({left:r.left-e.left-n.left,width:q,height:k})}if(l._helper&&!g.animate&&(/static/).test(i.css("position"))){c(this).css({left:r.left-e.left-n.left,width:q,height:k})}}});c.ui.plugin.add("resizable","ghost",{start:function(g,h){var f=c(this).data("resizable"),i=f.options,e=f.size;f.ghost=f.originalElement.clone();f.ghost.css({opacity:0.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof i.ghost=="string"?i.ghost:"");f.ghost.appendTo(f.helper)},resize:function(f,g){var e=c(this).data("resizable"),h=e.options;if(e.ghost){e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})}},stop:function(f,g){var e=c(this).data("resizable"),h=e.options;if(e.ghost&&e.helper){e.helper.get(0).removeChild(e.ghost.get(0))}}});c.ui.plugin.add("resizable","grid",{resize:function(e,n){var k=c(this).data("resizable"),h=k.options,l=k.size,i=k.originalSize,j=k.originalPosition,p=k.axis,m=h._aspectRatio||e.shiftKey;h.grid=typeof h.grid=="number"?[h.grid,h.grid]:h.grid;var g=Math.round((l.width-i.width)/(h.grid[0]||1))*(h.grid[0]||1),f=Math.round((l.height-i.height)/(h.grid[1]||1))*(h.grid[1]||1);if(/^(se|s|e)$/.test(p)){k.size.width=i.width+g;k.size.height=i.height+f}else{if(/^(ne)$/.test(p)){k.size.width=i.width+g;k.size.height=i.height+f;k.position.top=j.top-f}else{if(/^(sw)$/.test(p)){k.size.width=i.width+g;k.size.height=i.height+f;k.position.left=j.left-g}else{k.size.width=i.width+g;k.size.height=i.height+f;k.position.top=j.top-f;k.position.left=j.left-g}}}}});var b=function(e){return parseInt(e,10)||0};var a=function(e){return !isNaN(parseInt(e,10))}})(jQuery);(function(a,b){a.widget("ui.selectable",a.ui.mouse,{version:"1.9.2",options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var c=this;this.element.addClass("ui-selectable");this.dragged=false;var d;this.refresh=function(){d=a(c.options.filter,c.element[0]);d.addClass("ui-selectee");d.each(function(){var e=a(this);var f=e.offset();a.data(this,"selectable-item",{element:this,$element:e,left:f.left,top:f.top,right:f.left+e.outerWidth(),bottom:f.top+e.outerHeight(),startselected:false,selected:e.hasClass("ui-selected"),selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})})};this.refresh();this.selectees=d.addClass("ui-selectee");this._mouseInit();this.helper=a("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled");this._mouseDestroy()},_mouseStart:function(e){var d=this;this.opos=[e.pageX,e.pageY];if(this.options.disabled){return}var c=this.options;this.selectees=a(c.filter,this.element[0]);this._trigger("start",e);a(c.appendTo).append(this.helper);this.helper.css({left:e.clientX,top:e.clientY,width:0,height:0});if(c.autoRefresh){this.refresh()}this.selectees.filter(".ui-selected").each(function(){var f=a.data(this,"selectable-item");f.startselected=true;if(!e.metaKey&&!e.ctrlKey){f.$element.removeClass("ui-selected");f.selected=false;f.$element.addClass("ui-unselecting");f.unselecting=true;d._trigger("unselecting",e,{unselecting:f.element})}});a(e.target).parents().andSelf().each(function(){var g=a.data(this,"selectable-item");if(g){var f=(!e.metaKey&&!e.ctrlKey)||!g.$element.hasClass("ui-selected");g.$element.removeClass(f?"ui-unselecting":"ui-selected").addClass(f?"ui-selecting":"ui-unselecting");g.unselecting=!f;g.selecting=f;g.selected=f;if(f){d._trigger("selecting",e,{selecting:g.element})}else{d._trigger("unselecting",e,{unselecting:g.element})}return false}})},_mouseDrag:function(j){var i=this;this.dragged=true;if(this.options.disabled){return}var e=this.options;var d=this.opos[0],h=this.opos[1],c=j.pageX,g=j.pageY;if(d>c){var f=c;c=d;d=f}if(h>g){var f=g;g=h;h=f}this.helper.css({left:d,top:h,width:c-d,height:g-h});this.selectees.each(function(){var k=a.data(this,"selectable-item");if(!k||k.element==i.element[0]){return}var l=false;if(e.tolerance=="touch"){l=(!(k.left>c||k.right<d||k.top>g||k.bottom<h))}else{if(e.tolerance=="fit"){l=(k.left>d&&k.right<c&&k.top>h&&k.bottom<g)}}if(l){if(k.selected){k.$element.removeClass("ui-selected");k.selected=false}if(k.unselecting){k.$element.removeClass("ui-unselecting");k.unselecting=false}if(!k.selecting){k.$element.addClass("ui-selecting");k.selecting=true;i._trigger("selecting",j,{selecting:k.element})}}else{if(k.selecting){if((j.metaKey||j.ctrlKey)&&k.startselected){k.$element.removeClass("ui-selecting");k.selecting=false;k.$element.addClass("ui-selected");k.selected=true}else{k.$element.removeClass("ui-selecting");k.selecting=false;if(k.startselected){k.$element.addClass("ui-unselecting");k.unselecting=true}i._trigger("unselecting",j,{unselecting:k.element})}}if(k.selected){if(!j.metaKey&&!j.ctrlKey&&!k.startselected){k.$element.removeClass("ui-selected");k.selected=false;k.$element.addClass("ui-unselecting");k.unselecting=true;i._trigger("unselecting",j,{unselecting:k.element})}}}});return false},_mouseStop:function(e){var d=this;this.dragged=false;var c=this.options;a(".ui-unselecting",this.element[0]).each(function(){var f=a.data(this,"selectable-item");f.$element.removeClass("ui-unselecting");f.unselecting=false;f.startselected=false;d._trigger("unselected",e,{unselected:f.element})});a(".ui-selecting",this.element[0]).each(function(){var f=a.data(this,"selectable-item");f.$element.removeClass("ui-selecting").addClass("ui-selected");f.selecting=false;f.selected=true;f.startselected=true;d._trigger("selected",e,{selected:f.element})});this._trigger("stop",e);this.helper.remove();return false}})})(jQuery);(function(a,b){a.widget("ui.sortable",a.ui.mouse,{version:"1.9.2",widgetEventPrefix:"sort",ready:false,options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){var c=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?c.axis==="x"||(/left|right/).test(this.items[0].item.css("float"))||(/inline|table-cell/).test(this.items[0].item.css("display")):false;this.offset=this.element.offset();this._mouseInit();this.ready=true},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled");this._mouseDestroy();for(var c=this.items.length-1;c>=0;c--){this.items[c].item.removeData(this.widgetName+"-item")}return this},_setOption:function(c,d){if(c==="disabled"){this.options[c]=d;this.widget().toggleClass("ui-sortable-disabled",!!d)}else{a.Widget.prototype._setOption.apply(this,arguments)}},_mouseCapture:function(f,g){var e=this;if(this.reverting){return false}if(this.options.disabled||this.options.type=="static"){return false}this._refreshItems(f);var d=null,c=a(f.target).parents().each(function(){if(a.data(this,e.widgetName+"-item")==e){d=a(this);return false}});if(a.data(f.target,e.widgetName+"-item")==e){d=a(f.target)}if(!d){return false}if(this.options.handle&&!g){var h=false;a(this.options.handle,d).find("*").andSelf().each(function(){if(this==f.target){h=true}});if(!h){return false}}this.currentItem=d;this._removeCurrentsFromItems();return true},_mouseStart:function(e,f,c){var g=this.options;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(e);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");this.originalPosition=this._generatePosition(e);this.originalPageX=e.pageX;this.originalPageY=e.pageY;(g.cursorAt&&this._adjustOffsetFromHelper(g.cursorAt));this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()}this._createPlaceholder();if(g.containment){this._setContainment()}if(g.cursor){if(a("body").css("cursor")){this._storedCursor=a("body").css("cursor")}a("body").css("cursor",g.cursor)}if(g.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")}this.helper.css("opacity",g.opacity)}if(g.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")}this.helper.css("zIndex",g.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()}this._trigger("start",e,this._uiHash());if(!this._preserveHelperProportions){this._cacheHelperProportions()}if(!c){for(var d=this.containers.length-1;d>=0;d--){this.containers[d]._trigger("activate",e,this._uiHash(this))}}if(a.ui.ddmanager){a.ui.ddmanager.current=this}if(a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,e)}this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(e);return true},_mouseDrag:function(g){this.position=this._generatePosition(g);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs}if(this.options.scroll){var h=this.options,c=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-g.pageY<h.scrollSensitivity){this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+h.scrollSpeed}else{if(g.pageY-this.overflowOffset.top<h.scrollSensitivity){this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-h.scrollSpeed}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-g.pageX<h.scrollSensitivity){this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+h.scrollSpeed}else{if(g.pageX-this.overflowOffset.left<h.scrollSensitivity){this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-h.scrollSpeed}}}else{if(g.pageY-a(document).scrollTop()<h.scrollSensitivity){c=a(document).scrollTop(a(document).scrollTop()-h.scrollSpeed)}else{if(a(window).height()-(g.pageY-a(document).scrollTop())<h.scrollSensitivity){c=a(document).scrollTop(a(document).scrollTop()+h.scrollSpeed)}}if(g.pageX-a(document).scrollLeft()<h.scrollSensitivity){c=a(document).scrollLeft(a(document).scrollLeft()-h.scrollSpeed)}else{if(a(window).width()-(g.pageX-a(document).scrollLeft())<h.scrollSensitivity){c=a(document).scrollLeft(a(document).scrollLeft()+h.scrollSpeed)}}}if(c!==false&&a.ui.ddmanager&&!h.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,g)}}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],d=f.item[0],j=this._intersectsWithPointer(f);if(!j){continue}if(f.instance!==this.currentContainer){continue}if(d!=this.currentItem[0]&&this.placeholder[j==1?"next":"prev"]()[0]!=d&&!a.contains(this.placeholder[0],d)&&(this.options.type=="semi-dynamic"?!a.contains(this.element[0],d):true)){this.direction=j==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(f)){this._rearrange(g,f)}else{break}this._trigger("change",g,this._uiHash());break}}this._contactContainers(g);if(a.ui.ddmanager){a.ui.ddmanager.drag(this,g)}this._trigger("sort",g,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(d,e){if(!d){return}if(a.ui.ddmanager&&!this.options.dropBehaviour){a.ui.ddmanager.drop(this,d)}if(this.options.revert){var c=this;var f=this.placeholder.offset();this.reverting=true;a(this.helper).animate({left:f.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:f.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(d)})}else{this._clear(d,e)}return false},cancel:function(){if(this.dragging){this._mouseUp({target:null});if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else{this.currentItem.show()}for(var c=this.containers.length-1;c>=0;c--){this.containers[c]._trigger("deactivate",null,this._uiHash(this));if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",null,this._uiHash(this));this.containers[c].containerCache.over=0}}}if(this.placeholder){if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()}a.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});if(this.domPosition.prev){a(this.domPosition.prev).after(this.currentItem)}else{a(this.domPosition.parent).prepend(this.currentItem)}}return this},serialize:function(e){var c=this._getItemsAsjQuery(e&&e.connected);var d=[];e=e||{};a(c).each(function(){var f=(a(e.item||this).attr(e.attribute||"id")||"").match(e.expression||(/(.+)[-=_](.+)/));if(f){d.push((e.key||f[1]+"[]")+"="+(e.key&&e.expression?f[1]:f[2]))}});if(!d.length&&e.key){d.push(e.key+"=")}return d.join("&")},toArray:function(e){var c=this._getItemsAsjQuery(e&&e.connected);var d=[];e=e||{};c.each(function(){d.push(a(e.item||this).attr(e.attribute||"id")||"")});return d},_intersectsWith:function(m){var e=this.positionAbs.left,d=e+this.helperProportions.width,k=this.positionAbs.top,j=k+this.helperProportions.height;var f=m.left,c=f+m.width,n=m.top,i=n+m.height;var o=this.offset.click.top,h=this.offset.click.left;var g=(k+o)>n&&(k+o)<i&&(e+h)>f&&(e+h)<c;if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>m[this.floating?"width":"height"])){return g}else{return(f<e+(this.helperProportions.width/2)&&d-(this.helperProportions.width/2)<c&&n<k+(this.helperProportions.height/2)&&j-(this.helperProportions.height/2)<i)}},_intersectsWithPointer:function(e){var f=(this.options.axis==="x")||a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),d=(this.options.axis==="y")||a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),h=f&&d,c=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();if(!h){return false}return this.floating?(((g&&g=="right")||c=="down")?2:1):(c&&(c=="down"?2:1))},_intersectsWithSides:function(f){var d=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,f.top+(f.height/2),f.height),e=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,f.left+(f.width/2),f.width),c=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();if(this.floating&&g){return((g=="right"&&e)||(g=="left"&&!e))}else{return c&&((c=="down"&&d)||(c=="up"&&!d))}},_getDragVerticalDirection:function(){var c=this.positionAbs.top-this.lastPositionAbs.top;return c!=0&&(c>0?"down":"up")},_getDragHorizontalDirection:function(){var c=this.positionAbs.left-this.lastPositionAbs.left;return c!=0&&(c>0?"right":"left")},refresh:function(c){this._refreshItems(c);this.refreshPositions();return this},_connectWith:function(){var c=this.options;return c.connectWith.constructor==String?[c.connectWith]:c.connectWith},_getItemsAsjQuery:function(h){var c=[];var e=[];var g=this._connectWith();if(g&&h){for(var f=g.length-1;f>=0;f--){var l=a(g[f]);for(var d=l.length-1;d>=0;d--){var k=a.data(l[d],this.widgetName);if(k&&k!=this&&!k.options.disabled){e.push([a.isFunction(k.options.items)?k.options.items.call(k.element):a(k.options.items,k.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),k])}}}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var f=e.length-1;f>=0;f--){e[f][0].each(function(){c.push(this)})}return a(c)},_removeCurrentsFromItems:function(){var c=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=a.grep(this.items,function(e){for(var d=0;d<c.length;d++){if(c[d]==e.item[0]){return false}}return true})},_refreshItems:function(c){this.items=[];this.containers=[this];var k=this.items;var g=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],c,{item:this.currentItem}):a(this.options.items,this.element),this]];var m=this._connectWith();if(m&&this.ready){for(var f=m.length-1;f>=0;f--){var n=a(m[f]);for(var e=n.length-1;e>=0;e--){var h=a.data(n[e],this.widgetName);if(h&&h!=this&&!h.options.disabled){g.push([a.isFunction(h.options.items)?h.options.items.call(h.element[0],c,{item:this.currentItem}):a(h.options.items,h.element),h]);this.containers.push(h)}}}}for(var f=g.length-1;f>=0;f--){var l=g[f][1];var d=g[f][0];for(var e=0,o=d.length;e<o;e++){var p=a(d[e]);p.data(this.widgetName+"-item",l);k.push({item:p,instance:l,width:0,height:0,left:0,top:0})}}},refreshPositions:function(c){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()}for(var e=this.items.length-1;e>=0;e--){var f=this.items[e];if(f.instance!=this.currentContainer&&this.currentContainer&&f.item[0]!=this.currentItem[0]){continue}var d=this.options.toleranceElement?a(this.options.toleranceElement,f.item):f.item;if(!c){f.width=d.outerWidth();f.height=d.outerHeight()}var g=d.offset();f.left=g.left;f.top=g.top}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)}else{for(var e=this.containers.length-1;e>=0;e--){var g=this.containers[e].element.offset();this.containers[e].containerCache.left=g.left;this.containers[e].containerCache.top=g.top;this.containers[e].containerCache.width=this.containers[e].element.outerWidth();this.containers[e].containerCache.height=this.containers[e].element.outerHeight()}}return this},_createPlaceholder:function(d){d=d||this;var e=d.options;if(!e.placeholder||e.placeholder.constructor==String){var c=e.placeholder;e.placeholder={element:function(){var f=a(document.createElement(d.currentItem[0].nodeName)).addClass(c||d.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!c){f.style.visibility="hidden"}return f},update:function(f,g){if(c&&!e.forcePlaceholderSize){return}if(!g.height()){g.height(d.currentItem.innerHeight()-parseInt(d.currentItem.css("paddingTop")||0,10)-parseInt(d.currentItem.css("paddingBottom")||0,10))}if(!g.width()){g.width(d.currentItem.innerWidth()-parseInt(d.currentItem.css("paddingLeft")||0,10)-parseInt(d.currentItem.css("paddingRight")||0,10))}}}}d.placeholder=a(e.placeholder.element.call(d.element,d.currentItem));d.currentItem.after(d.placeholder);e.placeholder.update(d,d.placeholder)},_contactContainers:function(c){var e=null,n=null;for(var h=this.containers.length-1;h>=0;h--){if(a.contains(this.currentItem[0],this.containers[h].element[0])){continue}if(this._intersectsWith(this.containers[h].containerCache)){if(e&&a.contains(this.containers[h].element[0],e.element[0])){continue}e=this.containers[h];n=h}else{if(this.containers[h].containerCache.over){this.containers[h]._trigger("out",c,this._uiHash(this));this.containers[h].containerCache.over=0}}}if(!e){return}if(this.containers.length===1){this.containers[n]._trigger("over",c,this._uiHash(this));this.containers[n].containerCache.over=1}else{var m=10000;var k=null;var l=this.containers[n].floating?"left":"top";var o=this.containers[n].floating?"width":"height";var d=this.positionAbs[l]+this.offset.click[l];for(var f=this.items.length-1;f>=0;f--){if(!a.contains(this.containers[n].element[0],this.items[f].item[0])){continue}if(this.items[f].item[0]==this.currentItem[0]){continue}var p=this.items[f].item.offset()[l];var g=false;if(Math.abs(p-d)>Math.abs(p+this.items[f][o]-d)){g=true;p+=this.items[f][o]}if(Math.abs(p-d)<m){m=Math.abs(p-d);k=this.items[f];this.direction=g?"up":"down"}}if(!k&&!this.options.dropOnEmpty){return}this.currentContainer=this.containers[n];k?this._rearrange(c,k,null,true):this._rearrange(c,null,this.containers[n].element,true);this._trigger("change",c,this._uiHash());this.containers[n]._trigger("change",c,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[n]._trigger("over",c,this._uiHash(this));this.containers[n].containerCache.over=1}},_createHelper:function(d){var e=this.options;var c=a.isFunction(e.helper)?a(e.helper.apply(this.element[0],[d,this.currentItem])):(e.helper=="clone"?this.currentItem.clone():this.currentItem);if(!c.parents("body").length){a(e.appendTo!="parent"?e.appendTo:this.currentItem[0].parentNode)[0].appendChild(c[0])}if(c[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}}if(c[0].style.width==""||e.forceHelperSize){c.width(this.currentItem.width())}if(c[0].style.height==""||e.forceHelperSize){c.height(this.currentItem.height())}return c},_adjustOffsetFromHelper:function(c){if(typeof c=="string"){c=c.split(" ")}if(a.isArray(c)){c={left:+c[0],top:+c[1]||0}}if("left" in c){this.offset.click.left=c.left+this.margins.left}if("right" in c){this.offset.click.left=this.helperProportions.width-c.right+this.margins.left}if("top" in c){this.offset.click.top=c.top+this.margins.top}if("bottom" in c){this.offset.click.top=this.helperProportions.height-c.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var c=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.contains(this.scrollParent[0],this.offsetParent[0])){c.left+=this.scrollParent.scrollLeft();c.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.ui.ie)){c={top:0,left:0}}return{top:c.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:c.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var c=this.currentItem.position();return{top:c.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:c.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var f=this.options;if(f.containment=="parent"){f.containment=this.helper[0].parentNode}if(f.containment=="document"||f.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(f.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(f.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(f.containment)){var d=a(f.containment)[0];var e=a(f.containment).offset();var c=(a(d).css("overflow")!="hidden");this.containment=[e.left+(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0)-this.margins.left,e.top+(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0)-this.margins.top,e.left+(c?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,e.top+(c?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(g,i){if(!i){i=this.position}var e=g=="absolute"?1:-1;var f=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=(/(html|body)/i).test(c[0].tagName);return{top:(i.top+this.offset.relative.top*e+this.offset.parent.top*e-((this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(h?0:c.scrollTop()))*e)),left:(i.left+this.offset.relative.left*e+this.offset.parent.left*e-((this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:c.scrollLeft())*e))}},_generatePosition:function(f){var i=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,j=(/(html|body)/i).test(c[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()}var e=f.pageX;var d=f.pageY;if(this.originalPosition){if(this.containment){if(f.pageX-this.offset.click.left<this.containment[0]){e=this.containment[0]+this.offset.click.left}if(f.pageY-this.offset.click.top<this.containment[1]){d=this.containment[1]+this.offset.click.top}if(f.pageX-this.offset.click.left>this.containment[2]){e=this.containment[2]+this.offset.click.left}if(f.pageY-this.offset.click.top>this.containment[3]){d=this.containment[3]+this.offset.click.top}}if(i.grid){var h=this.originalPageY+Math.round((d-this.originalPageY)/i.grid[1])*i.grid[1];d=this.containment?(!(h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3])?h:(!(h-this.offset.click.top<this.containment[1])?h-i.grid[1]:h+i.grid[1])):h;var g=this.originalPageX+Math.round((e-this.originalPageX)/i.grid[0])*i.grid[0];e=this.containment?(!(g-this.offset.click.left<this.containment[0]||g-this.offset.click.left>this.containment[2])?g:(!(g-this.offset.click.left<this.containment[0])?g-i.grid[0]:g+i.grid[0])):g}}return{top:(d-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+((this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(j?0:c.scrollTop())))),left:(e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+((this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():j?0:c.scrollLeft())))}},_rearrange:function(g,f,d,e){d?d[0].appendChild(this.placeholder[0]):f.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?f.item[0]:f.item[0].nextSibling));this.counter=this.counter?++this.counter:1;var c=this.counter;this._delay(function(){if(c==this.counter){this.refreshPositions(!e)}})},_clear:function(d,e){this.reverting=false;var f=[];if(!this._noFinalSort&&this.currentItem.parent().length){this.placeholder.before(this.currentItem)}this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var c in this._storedCSS){if(this._storedCSS[c]=="auto"||this._storedCSS[c]=="static"){this._storedCSS[c]=""}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else{this.currentItem.show()}if(this.fromOutside&&!e){f.push(function(g){this._trigger("receive",g,this._uiHash(this.fromOutside))})}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!e){f.push(function(g){this._trigger("update",g,this._uiHash())})}if(this!==this.currentContainer){if(!e){f.push(function(g){this._trigger("remove",g,this._uiHash())});f.push((function(g){return function(h){g._trigger("receive",h,this._uiHash(this))}}).call(this,this.currentContainer));f.push((function(g){return function(h){g._trigger("update",h,this._uiHash(this))}}).call(this,this.currentContainer))}}for(var c=this.containers.length-1;c>=0;c--){if(!e){f.push((function(g){return function(h){g._trigger("deactivate",h,this._uiHash(this))}}).call(this,this.containers[c]))}if(this.containers[c].containerCache.over){f.push((function(g){return function(h){g._trigger("out",h,this._uiHash(this))}}).call(this,this.containers[c]));this.containers[c].containerCache.over=0}}if(this._storedCursor){a("body").css("cursor",this._storedCursor)}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)}this.dragging=false;if(this.cancelHelperRemoval){if(!e){this._trigger("beforeStop",d,this._uiHash());for(var c=0;c<f.length;c++){f[c].call(this,d)}this._trigger("stop",d,this._uiHash())}this.fromOutside=false;return false}if(!e){this._trigger("beforeStop",d,this._uiHash())}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(this.helper[0]!=this.currentItem[0]){this.helper.remove()}this.helper=null;if(!e){for(var c=0;c<f.length;c++){f[c].call(this,d)}this._trigger("stop",d,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){if(a.Widget.prototype._trigger.apply(this,arguments)===false){this.cancel()}},_uiHash:function(c){var d=c||this;return{helper:d.helper,placeholder:d.placeholder||a([]),position:d.position,originalPosition:d.originalPosition,offset:d.positionAbs,item:d.currentItem,sender:c?c.element:null}}})})(jQuery);(jQuery.effects||(function(b,d){var a=b.uiBackCompat!==false,c="ui-effects-";b.effects={effect:{}};
/*!
 * jQuery Color Animations v2.0.0
 * http://jquery.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Mon Aug 13 13:41:02 2012 -0500
 */
(function(s,h){var o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),l=/^([\-+])=\s*(\d+\.?\d*)/,k=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1]*2.55,t[2]*2.55,t[3]*2.55,t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],i=s.Color=function(u,v,t,w){return new s.Color.fn.parse(u,v,t,w)},n={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},r={"byte":{floor:true,max:255},percent:{max:1},degrees:{mod:360,floor:true}},q=i.support={},f=s("<p>")[0],e,p=s.each;f.style.cssText="background-color:rgba(1,1,1,.5)";q.rgba=f.style.backgroundColor.indexOf("rgba")>-1;p(n,function(t,u){u.cache="_"+t;u.props.alpha={idx:3,type:"percent",def:1}});function m(u,w,v){var t=r[w.type]||{};if(u==null){return(v||!w.def)?null:w.def}u=t.floor?~~u:parseFloat(u);if(isNaN(u)){return w.def}if(t.mod){return(u+t.mod)%t.mod}return 0>u?0:t.max<u?t.max:u}function j(t){var v=i(),u=v._rgba=[];t=t.toLowerCase();p(k,function(B,C){var z,A=C.re.exec(t),y=A&&C.parse(A),w=C.space||"rgba";if(y){z=v[w](y);v[n[w].cache]=z[n[w].cache];u=v._rgba=z._rgba;return false}});if(u.length){if(u.join()==="0,0,0,0"){s.extend(u,e.transparent)}return v}return e[t]}i.fn=s.extend(i.prototype,{parse:function(A,y,t,z){if(A===h){this._rgba=[null,null,null,null];return this}if(A.jquery||A.nodeType){A=s(A).css(y);y=h}var w=this,v=s.type(A),u=this._rgba=[];if(y!==h){A=[A,y,t,z];v="array"}if(v==="string"){return this.parse(j(A)||e._default)}if(v==="array"){p(n.rgba.props,function(B,C){u[C.idx]=m(A[C.idx],C)});return this}if(v==="object"){if(A instanceof i){p(n,function(B,C){if(A[C.cache]){w[C.cache]=A[C.cache].slice()}})}else{p(n,function(C,D){var B=D.cache;p(D.props,function(E,F){if(!w[B]&&D.to){if(E==="alpha"||A[E]==null){return}w[B]=D.to(w._rgba)}w[B][F.idx]=m(A[E],F,true)});if(w[B]&&b.inArray(null,w[B].slice(0,3))<0){w[B][3]=1;if(D.from){w._rgba=D.from(w[B])}}})}return this}},is:function(v){var t=i(v),w=true,u=this;p(n,function(y,A){var B,z=t[A.cache];if(z){B=u[A.cache]||A.to&&A.to(u._rgba)||[];p(A.props,function(C,D){if(z[D.idx]!=null){w=(z[D.idx]===B[D.idx]);return w}})}return w});return w},_space:function(){var t=[],u=this;p(n,function(v,w){if(u[w.cache]){t.push(v)}});return t.pop()},transition:function(u,B){var v=i(u),w=v._space(),y=n[w],z=this.alpha()===0?i("transparent"):this,A=z[y.cache]||y.to(z._rgba),t=A.slice();v=v[y.cache];p(y.props,function(F,H){var E=H.idx,D=A[E],C=v[E],G=r[H.type]||{};if(C===null){return}if(D===null){t[E]=C}else{if(G.mod){if(C-D>G.mod/2){D+=G.mod}else{if(D-C>G.mod/2){D-=G.mod}}}t[E]=m((C-D)*B+D,H)}});return this[w](t)},blend:function(w){if(this._rgba[3]===1){return this}var v=this._rgba.slice(),u=v.pop(),t=i(w)._rgba;return i(s.map(v,function(y,z){return(1-u)*t[z]+u*y}))},toRgbaString:function(){var u="rgba(",t=s.map(this._rgba,function(w,y){return w==null?(y>2?1:0):w});if(t[3]===1){t.pop();u="rgb("}return u+t.join()+")"},toHslaString:function(){var u="hsla(",t=s.map(this.hsla(),function(w,y){if(w==null){w=y>2?1:0}if(y&&y<3){w=Math.round(w*100)+"%"}return w});if(t[3]===1){t.pop();u="hsl("}return u+t.join()+")"},toHexString:function(t){var u=this._rgba.slice(),v=u.pop();if(t){u.push(~~(v*255))}return"#"+s.map(u,function(w){w=(w||0).toString(16);return w.length===1?"0"+w:w}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}});i.fn.parse.prototype=i.fn;function g(v,u,t){t=(t+1)%1;if(t*6<1){return v+(u-v)*t*6}if(t*2<1){return u}if(t*3<2){return v+(u-v)*((2/3)-t)*6}return v}n.hsla.to=function(v){if(v[0]==null||v[1]==null||v[2]==null){return[null,null,null,v[3]]}var t=v[0]/255,z=v[1]/255,A=v[2]/255,C=v[3],B=Math.max(t,z,A),w=Math.min(t,z,A),D=B-w,E=B+w,u=E*0.5,y,F;if(w===B){y=0}else{if(t===B){y=(60*(z-A)/D)+360}else{if(z===B){y=(60*(A-t)/D)+120}else{y=(60*(t-z)/D)+240}}}if(u===0||u===1){F=u}else{if(u<=0.5){F=D/E}else{F=D/(2-E)}}return[Math.round(y)%360,F,u,C==null?1:C]};n.hsla.from=function(y){if(y[0]==null||y[1]==null||y[2]==null){return[null,null,null,y[3]]}var w=y[0]/360,v=y[1],u=y[2],t=y[3],z=u<=0.5?u*(1+v):u+v-u*v,A=2*u-z;return[Math.round(g(A,z,w+(1/3))*255),Math.round(g(A,z,w)*255),Math.round(g(A,z,w-(1/3))*255),t]};p(n,function(u,w){var v=w.props,t=w.cache,z=w.to,y=w.from;i.fn[u]=function(E){if(z&&!this[t]){this[t]=z(this._rgba)}if(E===h){return this[t].slice()}var B,D=s.type(E),A=(D==="array"||D==="object")?E:arguments,C=this[t].slice();p(v,function(F,H){var G=A[D==="object"?F:H.idx];if(G==null){G=C[H.idx]}C[H.idx]=m(G,H)});if(y){B=i(y(C));B[t]=C;return B}else{return i(C)}};p(v,function(A,B){if(i.fn[A]){return}i.fn[A]=function(F){var H=s.type(F),E=(A==="alpha"?(this._hsla?"hsla":"rgba"):u),D=this[E](),G=D[B.idx],C;if(H==="undefined"){return G}if(H==="function"){F=F.call(this,G);H=s.type(F)}if(F==null&&B.empty){return this}if(H==="string"){C=l.exec(F);if(C){F=G+parseFloat(C[2])*(C[1]==="+"?1:-1)}}D[B.idx]=F;return this[E](D)}})});p(o,function(t,u){s.cssHooks[u]={set:function(A,B){var w,z,v="";if(s.type(B)!=="string"||(w=j(B))){B=i(w||B);if(!q.rgba&&B._rgba[3]!==1){z=u==="backgroundColor"?A.parentNode:A;while((v===""||v==="transparent")&&z&&z.style){try{v=s.css(z,"backgroundColor");z=z.parentNode}catch(C){}}B=B.blend(v&&v!=="transparent"?v:"_default")}B=B.toRgbaString()}try{A.style[u]=B}catch(y){}}};s.fx.step[u]=function(v){if(!v.colorInit){v.start=i(v.elem,u);v.end=i(v.end);v.colorInit=true}s.cssHooks[u].set(v.elem,v.start.transition(v.end,v.pos))}});s.cssHooks.borderColor={expand:function(u){var t={};p(["Top","Right","Bottom","Left"],function(w,v){t["border"+v+"Color"]=u});return t}};e=s.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}})(jQuery);(function(){var f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};b.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(i,j){b.fx.step[j]=function(k){if(k.end!=="none"&&!k.setAttr||k.pos===1&&!k.setAttr){jQuery.style(k.elem,j,k.end);k.setAttr=true}}});function h(){var k=this.ownerDocument.defaultView?this.ownerDocument.defaultView.getComputedStyle(this,null):this.currentStyle,l={},j,i;if(k&&k.length&&k[0]&&k[k[0]]){i=k.length;while(i--){j=k[i];if(typeof k[j]==="string"){l[b.camelCase(j)]=k[j]}}}else{for(j in k){if(typeof k[j]==="string"){l[j]=k[j]}}}return l}function e(i,k){var m={},j,l;for(j in k){l=k[j];if(i[j]!==l){if(!g[j]){if(b.fx.step[j]||!isNaN(parseFloat(l))){m[j]=l}}}}return m}b.effects.animateClass=function(i,j,m,l){var k=b.speed(j,m,l);return this.queue(function(){var p=b(this),n=p.attr("class")||"",o,q=k.children?p.find("*").andSelf():p;q=q.map(function(){var r=b(this);return{el:r,start:h.call(this)}});o=function(){b.each(f,function(r,s){if(i[s]){p[s+"Class"](i[s])}})};o();q=q.map(function(){this.end=h.call(this.el[0]);this.diff=e(this.start,this.end);return this});p.attr("class",n);q=q.map(function(){var t=this,r=b.Deferred(),s=jQuery.extend({},k,{queue:false,complete:function(){r.resolve(t)}});this.el.animate(this.diff,s);return r.promise()});b.when.apply(b,q.get()).done(function(){o();b.each(arguments,function(){var r=this.el;b.each(this.diff,function(s){r.css(s,"")})});k.complete.call(p[0])})})};b.fn.extend({_addClass:b.fn.addClass,addClass:function(j,i,l,k){return i?b.effects.animateClass.call(this,{add:j},i,l,k):this._addClass(j)},_removeClass:b.fn.removeClass,removeClass:function(j,i,l,k){return i?b.effects.animateClass.call(this,{remove:j},i,l,k):this._removeClass(j)},_toggleClass:b.fn.toggleClass,toggleClass:function(k,j,i,m,l){if(typeof j==="boolean"||j===d){if(!i){return this._toggleClass(k,j)}else{return b.effects.animateClass.call(this,(j?{add:k}:{remove:k}),i,m,l)}}else{return b.effects.animateClass.call(this,{toggle:k},j,i,m)}},switchClass:function(i,k,j,m,l){return b.effects.animateClass.call(this,{add:k,remove:i},j,m,l)}})})();(function(){b.extend(b.effects,{version:"1.9.2",save:function(h,j){for(var g=0;g<j.length;g++){if(j[g]!==null){h.data(c+j[g],h[0].style[j[g]])}}},restore:function(h,k){var j,g;for(g=0;g<k.length;g++){if(k[g]!==null){j=h.data(c+k[g]);if(j===d){j=""}h.css(k[g],j)}}},setMode:function(g,h){if(h==="toggle"){h=g.is(":hidden")?"show":"hide"}return h},getBaseline:function(h,i){var j,g;switch(h[0]){case"top":j=0;break;case"middle":j=0.5;break;case"bottom":j=1;break;default:j=h[0]/i.height}switch(h[1]){case"left":g=0;break;case"center":g=0.5;break;case"right":g=1;break;default:g=h[1]/i.width}return{x:g,y:j}},createWrapper:function(h){if(h.parent().is(".ui-effects-wrapper")){return h.parent()}var i={width:h.outerWidth(true),height:h.outerHeight(true),"float":h.css("float")},l=b("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),g={width:h.width(),height:h.height()},k=document.activeElement;try{k.id}catch(j){k=document.body}h.wrap(l);if(h[0]===k||b.contains(h[0],k)){b(k).focus()}l=h.parent();if(h.css("position")==="static"){l.css({position:"relative"});h.css({position:"relative"})}else{b.extend(i,{position:h.css("position"),zIndex:h.css("z-index")});b.each(["top","left","bottom","right"],function(m,n){i[n]=h.css(n);if(isNaN(parseInt(i[n],10))){i[n]="auto"}});h.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}h.css(g);return l.css(i).show()},removeWrapper:function(g){var h=document.activeElement;if(g.parent().is(".ui-effects-wrapper")){g.parent().replaceWith(g);if(g[0]===h||b.contains(g[0],h)){b(h).focus()}}return g},setTransition:function(h,j,g,i){i=i||{};b.each(j,function(l,k){var m=h.cssUnit(k);if(m[0]>0){i[k]=m[0]*g+m[1]}});return i}});function e(h,g,i,j){if(b.isPlainObject(h)){g=h;h=h.effect}h={effect:h};if(g==null){g={}}if(b.isFunction(g)){j=g;i=null;g={}}if(typeof g==="number"||b.fx.speeds[g]){j=i;i=g;g={}}if(b.isFunction(i)){j=i;i=null}if(g){b.extend(h,g)}i=i||g.duration;h.duration=b.fx.off?0:typeof i==="number"?i:i in b.fx.speeds?b.fx.speeds[i]:b.fx.speeds._default;h.complete=j||g.complete;return h}function f(g){if(!g||typeof g==="number"||b.fx.speeds[g]){return true}if(typeof g==="string"&&!b.effects.effect[g]){if(a&&b.effects[g]){return false}return true}return false}b.fn.extend({effect:function(){var i=e.apply(this,arguments),l=i.mode,g=i.queue,h=b.effects.effect[i.effect],j=!h&&a&&b.effects[i.effect];if(b.fx.off||!(h||j)){if(l){return this[l](i.duration,i.complete)}else{return this.each(function(){if(i.complete){i.complete.call(this)}})}}function k(o){var p=b(this),n=i.complete,q=i.mode;function m(){if(b.isFunction(n)){n.call(p[0])}if(b.isFunction(o)){o()}}if(p.is(":hidden")?q==="hide":q==="show"){m()}else{h.call(p[0],i,m)}}if(h){return g===false?this.each(k):this.queue(g||"fx",k)}else{return j.call(this,{options:i,duration:i.duration,callback:i.complete,mode:i.mode})}},_show:b.fn.show,show:function(h){if(f(h)){return this._show.apply(this,arguments)}else{var g=e.apply(this,arguments);g.mode="show";return this.effect.call(this,g)}},_hide:b.fn.hide,hide:function(h){if(f(h)){return this._hide.apply(this,arguments)}else{var g=e.apply(this,arguments);g.mode="hide";return this.effect.call(this,g)}},__toggle:b.fn.toggle,toggle:function(h){if(f(h)||typeof h==="boolean"||b.isFunction(h)){return this.__toggle.apply(this,arguments)}else{var g=e.apply(this,arguments);g.mode="toggle";return this.effect.call(this,g)}},cssUnit:function(g){var h=this.css(g),i=[];b.each(["em","px","%","pt"],function(j,k){if(h.indexOf(k)>0){i=[parseFloat(h),k]}});return i}})})();(function(){var e={};b.each(["Quad","Cubic","Quart","Quint","Expo"],function(g,f){e[f]=function(h){return Math.pow(h,g+2)}});b.extend(e,{Sine:function(f){return 1-Math.cos(f*Math.PI/2)},Circ:function(f){return 1-Math.sqrt(1-f*f)},Elastic:function(f){return f===0||f===1?f:-Math.pow(2,8*(f-1))*Math.sin(((f-1)*80-7.5)*Math.PI/15)},Back:function(f){return f*f*(3*f-2)},Bounce:function(h){var f,g=4;while(h<((f=Math.pow(2,--g))-1)/11){}return 1/Math.pow(4,3-g)-7.5625*Math.pow((f*3-2)/22-h,2)}});b.each(e,function(g,f){b.easing["easeIn"+g]=f;b.easing["easeOut"+g]=function(h){return 1-f(1-h)};b.easing["easeInOut"+g]=function(h){return h<0.5?f(h*2)/2:1-f(h*-2+2)/2}})})()})(jQuery));(function(d,e){var b=0,c={},a={};c.height=c.paddingTop=c.paddingBottom=c.borderTopWidth=c.borderBottomWidth="hide";a.height=a.paddingTop=a.paddingBottom=a.borderTopWidth=a.borderBottomWidth="show";d.widget("ui.accordion",{version:"1.9.2",options:{active:0,animate:{},collapsible:false,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var g=this.accordionId="ui-accordion-"+(this.element.attr("id")||++b),f=this.options;this.prevShow=this.prevHide=d();this.element.addClass("ui-accordion ui-widget ui-helper-reset");this.headers=this.element.find(f.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");this._hoverable(this.headers);this._focusable(this.headers);this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();if(!f.collapsible&&(f.active===false||f.active==null)){f.active=0}if(f.active<0){f.active+=this.headers.length}this.active=this._findActive(f.active).addClass("ui-accordion-header-active ui-state-active").toggleClass("ui-corner-all ui-corner-top");this.active.next().addClass("ui-accordion-content-active").show();this._createIcons();this.refresh();this.element.attr("role","tablist");this.headers.attr("role","tab").each(function(l){var m=d(this),k=m.attr("id"),h=m.next(),j=h.attr("id");if(!k){k=g+"-header-"+l;m.attr("id",k)}if(!j){j=g+"-panel-"+l;h.attr("id",j)}m.attr("aria-controls",j);h.attr("aria-labelledby",k)}).next().attr("role","tabpanel");this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide();if(!this.active.length){this.headers.eq(0).attr("tabIndex",0)}else{this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"})}this._on(this.headers,{keydown:"_keydown"});this._on(this.headers.next(),{keydown:"_panelKeyDown"});this._setupEvents(f.event)},_getCreateEventData:function(){return{header:this.active,content:!this.active.length?d():this.active.next()}},_createIcons:function(){var f=this.options.icons;if(f){d("<span>").addClass("ui-accordion-header-icon ui-icon "+f.header).prependTo(this.headers);this.active.children(".ui-accordion-header-icon").removeClass(f.header).addClass(f.activeHeader);this.headers.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var f;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){if(/^ui-accordion/.test(this.id)){this.removeAttribute("id")}});this._destroyIcons();f=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){if(/^ui-accordion/.test(this.id)){this.removeAttribute("id")}});if(this.options.heightStyle!=="content"){f.css("height","")}},_setOption:function(f,g){if(f==="active"){this._activate(g);return}if(f==="event"){if(this.options.event){this._off(this.headers,this.options.event)}this._setupEvents(g)}this._super(f,g);if(f==="collapsible"&&!g&&this.options.active===false){this._activate(0)}if(f==="icons"){this._destroyIcons();if(g){this._createIcons()}}if(f==="disabled"){this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!g)}},_keydown:function(i){if(i.altKey||i.ctrlKey){return}var j=d.ui.keyCode,h=this.headers.length,f=this.headers.index(i.target),g=false;switch(i.keyCode){case j.RIGHT:case j.DOWN:g=this.headers[(f+1)%h];break;case j.LEFT:case j.UP:g=this.headers[(f-1+h)%h];break;case j.SPACE:case j.ENTER:this._eventHandler(i);break;case j.HOME:g=this.headers[0];break;case j.END:g=this.headers[h-1];break}if(g){d(i.target).attr("tabIndex",-1);d(g).attr("tabIndex",0);g.focus();i.preventDefault()}},_panelKeyDown:function(f){if(f.keyCode===d.ui.keyCode.UP&&f.ctrlKey){d(f.currentTarget).prev().focus()}},refresh:function(){var h,i,f=this.options.heightStyle,g=this.element.parent();if(f==="fill"){if(!d.support.minHeight){i=g.css("overflow");g.css("overflow","hidden")}h=g.height();this.element.siblings(":visible").each(function(){var k=d(this),j=k.css("position");if(j==="absolute"||j==="fixed"){return}h-=k.outerHeight(true)});if(i){g.css("overflow",i)}this.headers.each(function(){h-=d(this).outerHeight(true)});this.headers.next().each(function(){d(this).height(Math.max(0,h-d(this).innerHeight()+d(this).height()))}).css("overflow","auto")}else{if(f==="auto"){h=0;this.headers.next().each(function(){h=Math.max(h,d(this).css("height","").height())}).height(h)}}},_activate:function(f){var g=this._findActive(f)[0];if(g===this.active[0]){return}g=g||this.active[0];this._eventHandler({target:g,currentTarget:g,preventDefault:d.noop})},_findActive:function(f){return typeof f==="number"?this.headers.eq(f):d()},_setupEvents:function(g){var f={};if(!g){return}d.each(g.split(" "),function(i,h){f[h]="_eventHandler"});this._on(this.headers,f)},_eventHandler:function(f){var n=this.options,i=this.active,j=d(f.currentTarget),l=j[0]===i[0],g=l&&n.collapsible,h=g?d():j.next(),k=i.next(),m={oldHeader:i,oldPanel:k,newHeader:g?d():j,newPanel:h};f.preventDefault();if((l&&!n.collapsible)||(this._trigger("beforeActivate",f,m)===false)){return}n.active=g?false:this.headers.index(j);this.active=l?d():j;this._toggle(m);i.removeClass("ui-accordion-header-active ui-state-active");if(n.icons){i.children(".ui-accordion-header-icon").removeClass(n.icons.activeHeader).addClass(n.icons.header)}if(!l){j.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top");if(n.icons){j.children(".ui-accordion-header-icon").removeClass(n.icons.header).addClass(n.icons.activeHeader)}j.next().addClass("ui-accordion-content-active")}},_toggle:function(h){var f=h.newPanel,g=this.prevShow.length?this.prevShow:h.oldPanel;this.prevShow.add(this.prevHide).stop(true,true);this.prevShow=f;this.prevHide=g;if(this.options.animate){this._animate(f,g,h)}else{g.hide();f.show();this._toggleComplete(h)}g.attr({"aria-expanded":"false","aria-hidden":"true"});g.prev().attr("aria-selected","false");if(f.length&&g.length){g.prev().attr("tabIndex",-1)}else{if(f.length){this.headers.filter(function(){return d(this).attr("tabIndex")===0}).attr("tabIndex",-1)}}f.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(f,n,j){var m,l,i,k=this,o=0,p=f.length&&(!n.length||(f.index()<n.index())),h=this.options.animate||{},q=p&&h.down||h,g=function(){k._toggleComplete(j)};if(typeof q==="number"){i=q}if(typeof q==="string"){l=q}l=l||q.easing||h.easing;i=i||q.duration||h.duration;if(!n.length){return f.animate(a,i,l,g)}if(!f.length){return n.animate(c,i,l,g)}m=f.show().outerHeight();n.animate(c,{duration:i,easing:l,step:function(r,s){s.now=Math.round(r)}});f.hide().animate(a,{duration:i,easing:l,complete:g,step:function(r,s){s.now=Math.round(r);if(s.prop!=="height"){o+=s.now}else{if(k.options.heightStyle!=="content"){s.now=Math.round(m-n.outerHeight()-o);o=0}}}})},_toggleComplete:function(g){var f=g.oldPanel;f.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all");if(f.length){f.parent()[0].className=f.parent()[0].className}this._trigger("activate",null,g)}});if(d.uiBackCompat!==false){(function(g,f){g.extend(f.options,{navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}});var h=f._create;f._create=function(){if(this.options.navigation){var j=this,l=this.element.find(this.options.header),i=l.next(),k=l.add(i).find("a").filter(this.options.navigationFilter)[0];if(k){l.add(i).each(function(m){if(g.contains(this,k)){j.options.active=Math.floor(m/2);return false}})}}h.call(this)}}(jQuery,jQuery.ui.accordion.prototype));(function(h,f){h.extend(f.options,{heightStyle:null,autoHeight:true,clearStyle:false,fillSpace:false});var i=f._create,g=f._setOption;h.extend(f,{_create:function(){this.options.heightStyle=this.options.heightStyle||this._mergeHeightStyle();i.call(this)},_setOption:function(j){if(j==="autoHeight"||j==="clearStyle"||j==="fillSpace"){this.options.heightStyle=this._mergeHeightStyle()}g.apply(this,arguments)},_mergeHeightStyle:function(){var j=this.options;if(j.fillSpace){return"fill"}if(j.clearStyle){return"content"}if(j.autoHeight){return"auto"}}})}(jQuery,jQuery.ui.accordion.prototype));(function(h,g){h.extend(g.options.icons,{activeHeader:null,headerSelected:"ui-icon-triangle-1-s"});var f=g._createIcons;g._createIcons=function(){if(this.options.icons){this.options.icons.activeHeader=this.options.icons.activeHeader||this.options.icons.headerSelected}f.call(this)}}(jQuery,jQuery.ui.accordion.prototype));(function(h,g){g.activate=g._activate;var f=g._findActive;g._findActive=function(i){if(i===-1){i=false}if(i&&typeof i!=="number"){i=this.headers.index(this.headers.filter(i));if(i===-1){i=false}}return f.call(this,i)}}(jQuery,jQuery.ui.accordion.prototype));jQuery.ui.accordion.prototype.resize=jQuery.ui.accordion.prototype.refresh;(function(h,g){h.extend(g.options,{change:null,changestart:null});var f=g._trigger;g._trigger=function(j,k,l){var i=f.apply(this,arguments);if(!i){return false}if(j==="beforeActivate"){i=f.call(this,"changestart",k,{oldHeader:l.oldHeader,oldContent:l.oldPanel,newHeader:l.newHeader,newContent:l.newPanel})}else{if(j==="activate"){i=f.call(this,"change",k,{oldHeader:l.oldHeader,oldContent:l.oldPanel,newHeader:l.newHeader,newContent:l.newPanel})}}return i}}(jQuery,jQuery.ui.accordion.prototype));(function(g,f){g.extend(f.options,{animate:null,animated:"slide"});var h=f._create;f._create=function(){var i=this.options;if(i.animate===null){if(!i.animated){i.animate=false}else{if(i.animated==="slide"){i.animate=300}else{if(i.animated==="bounceslide"){i.animate={duration:200,down:{easing:"easeOutBounce",duration:1000}}}else{i.animate=i.animated}}}}h.call(this)}}(jQuery,jQuery.ui.accordion.prototype))}})(jQuery);(function(a,b){var c=0;a.widget("ui.autocomplete",{version:"1.9.2",defaultElement:"<input>",options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var e,d,f;this.isMultiLine=this._isMultiLine();this.valueMethod=this.element[this.element.is("input,textarea")?"val":"text"];this.isNewMenu=true;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off");this._on(this.element,{keydown:function(g){if(this.element.prop("readOnly")){e=true;f=true;d=true;return}e=false;f=false;d=false;var h=a.ui.keyCode;switch(g.keyCode){case h.PAGE_UP:e=true;this._move("previousPage",g);break;case h.PAGE_DOWN:e=true;this._move("nextPage",g);break;case h.UP:e=true;this._keyEvent("previous",g);break;case h.DOWN:e=true;this._keyEvent("next",g);break;case h.ENTER:case h.NUMPAD_ENTER:if(this.menu.active){e=true;g.preventDefault();this.menu.select(g)}break;case h.TAB:if(this.menu.active){this.menu.select(g)}break;case h.ESCAPE:if(this.menu.element.is(":visible")){this._value(this.term);this.close(g);g.preventDefault()}break;default:d=true;this._searchTimeout(g);break}},keypress:function(g){if(e){e=false;g.preventDefault();return}if(d){return}var h=a.ui.keyCode;switch(g.keyCode){case h.PAGE_UP:this._move("previousPage",g);break;case h.PAGE_DOWN:this._move("nextPage",g);break;case h.UP:this._keyEvent("previous",g);break;case h.DOWN:this._keyEvent("next",g);break}},input:function(g){if(f){f=false;g.preventDefault();return}this._searchTimeout(g)},focus:function(){this.selectedItem=null;this.previous=this._value()},blur:function(g){if(this.cancelBlur){delete this.cancelBlur;return}clearTimeout(this.searching);this.close(g);this._change(g)}});this._initSource();this.menu=a("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo||"body")[0]).menu({input:a(),role:null}).zIndex(this.element.zIndex()+1).hide().data("menu");this._on(this.menu.element,{mousedown:function(g){g.preventDefault();this.cancelBlur=true;this._delay(function(){delete this.cancelBlur});var h=this.menu.element[0];if(!a(g.target).closest(".ui-menu-item").length){this._delay(function(){var i=this;this.document.one("mousedown",function(j){if(j.target!==i.element[0]&&j.target!==h&&!a.contains(h,j.target)){i.close()}})})}},menufocus:function(h,i){if(this.isNewMenu){this.isNewMenu=false;if(h.originalEvent&&/^mouse/.test(h.originalEvent.type)){this.menu.blur();this.document.one("mousemove",function(){a(h.target).trigger(h.originalEvent)});return}}var g=i.item.data("ui-autocomplete-item")||i.item.data("item.autocomplete");if(false!==this._trigger("focus",h,{item:g})){if(h.originalEvent&&/^key/.test(h.originalEvent.type)){this._value(g.value)}}else{this.liveRegion.text(g.value)}},menuselect:function(i,j){var h=j.item.data("ui-autocomplete-item")||j.item.data("item.autocomplete"),g=this.previous;if(this.element[0]!==this.document[0].activeElement){this.element.focus();this.previous=g;this._delay(function(){this.previous=g;this.selectedItem=h})}if(false!==this._trigger("select",i,{item:h})){this._value(h.value)}this.term=this._value();this.close(i);this.selectedItem=h}});this.liveRegion=a("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element);if(a.fn.bgiframe){this.menu.element.bgiframe()}this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching);this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");this.menu.element.remove();this.liveRegion.remove()},_setOption:function(d,e){this._super(d,e);if(d==="source"){this._initSource()}if(d==="appendTo"){this.menu.element.appendTo(this.document.find(e||"body")[0])}if(d==="disabled"&&e&&this.xhr){this.xhr.abort()}},_isMultiLine:function(){if(this.element.is("textarea")){return true}if(this.element.is("input")){return false}return this.element.prop("isContentEditable")},_initSource:function(){var f,d,e=this;if(a.isArray(this.options.source)){f=this.options.source;this.source=function(h,g){g(a.ui.autocomplete.filter(f,h.term))}}else{if(typeof this.options.source==="string"){d=this.options.source;this.source=function(h,g){if(e.xhr){e.xhr.abort()}e.xhr=a.ajax({url:d,data:h,dataType:"json",success:function(i){g(i)},error:function(){g([])}})}}else{this.source=this.options.source}}},_searchTimeout:function(d){clearTimeout(this.searching);this.searching=this._delay(function(){if(this.term!==this._value()){this.selectedItem=null;this.search(null,d)}},this.options.delay)},search:function(e,d){e=e!=null?e:this._value();this.term=this._value();if(e.length<this.options.minLength){return this.close(d)}if(this._trigger("search",d)===false){return}return this._search(e)},_search:function(d){this.pending++;this.element.addClass("ui-autocomplete-loading");this.cancelSearch=false;this.source({term:d},this._response())},_response:function(){var e=this,d=++c;return function(f){if(d===c){e.__response(f)}e.pending--;if(!e.pending){e.element.removeClass("ui-autocomplete-loading")}}},__response:function(d){if(d){d=this._normalize(d)}this._trigger("response",null,{content:d});if(!this.options.disabled&&d&&d.length&&!this.cancelSearch){this._suggest(d);this._trigger("open")}else{this._close()}},close:function(d){this.cancelSearch=true;this._close(d)},_close:function(d){if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.blur();this.isNewMenu=true;this._trigger("close",d)}},_change:function(d){if(this.previous!==this._value()){this._trigger("change",d,{item:this.selectedItem})}},_normalize:function(d){if(d.length&&d[0].label&&d[0].value){return d}return a.map(d,function(e){if(typeof e==="string"){return{label:e,value:e}}return a.extend({label:e.label||e.value,value:e.value||e.label},e)})},_suggest:function(d){var e=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(e,d);this.menu.refresh();e.show();this._resizeMenu();e.position(a.extend({of:this.element},this.options.position));if(this.options.autoFocus){this.menu.next()}},_resizeMenu:function(){var d=this.menu.element;d.outerWidth(Math.max(d.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,d){var f=this;a.each(d,function(g,h){f._renderItemData(e,h)})},_renderItemData:function(d,e){return this._renderItem(d,e).data("ui-autocomplete-item",e)},_renderItem:function(d,e){return a("<li>").append(a("<a>").text(e.label)).appendTo(d)},_move:function(e,d){if(!this.menu.element.is(":visible")){this.search(null,d);return}if(this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)){this._value(this.term);this.menu.blur();return}this.menu[e](d)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,d){if(!this.isMultiLine||this.menu.element.is(":visible")){this._move(e,d);d.preventDefault()}}});a.extend(a.ui.autocomplete,{escapeRegex:function(d){return d.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(f,d){var e=new RegExp(a.ui.autocomplete.escapeRegex(d),"i");return a.grep(f,function(g){return e.test(g.label||g.value||g)})}});a.widget("ui.autocomplete",a.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(d){return d+(d>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var d;this._superApply(arguments);if(this.options.disabled||this.cancelSearch){return}if(e&&e.length){d=this.options.messages.results(e.length)}else{d=this.options.messages.noResults}this.liveRegion.text(d)}})}(jQuery));(function(f,b){var k,e,a,h,i="ui-button ui-widget ui-state-default ui-corner-all",c="ui-state-hover ui-state-active ",g="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",j=function(){var l=f(this).find(":ui-button");setTimeout(function(){l.button("refresh")},1)},d=function(m){var l=m.name,n=m.form,o=f([]);if(l){if(n){o=f(n).find("[name='"+l+"']")}else{o=f("[name='"+l+"']",m.ownerDocument).filter(function(){return !this.form})}}return o};f.widget("ui.button",{version:"1.9.2",defaultElement:"<button>",options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,j);if(typeof this.options.disabled!=="boolean"){this.options.disabled=!!this.element.prop("disabled")}else{this.element.prop("disabled",this.options.disabled)}this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var o=this,m=this.options,p=this.type==="checkbox"||this.type==="radio",n=!p?"ui-state-active":"",l="ui-state-focus";if(m.label===null){m.label=(this.type==="input"?this.buttonElement.val():this.buttonElement.html())}this._hoverable(this.buttonElement);this.buttonElement.addClass(i).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){if(m.disabled){return}if(this===k){f(this).addClass("ui-state-active")}}).bind("mouseleave"+this.eventNamespace,function(){if(m.disabled){return}f(this).removeClass(n)}).bind("click"+this.eventNamespace,function(q){if(m.disabled){q.preventDefault();q.stopImmediatePropagation()}});this.element.bind("focus"+this.eventNamespace,function(){o.buttonElement.addClass(l)}).bind("blur"+this.eventNamespace,function(){o.buttonElement.removeClass(l)});if(p){this.element.bind("change"+this.eventNamespace,function(){if(h){return}o.refresh()});this.buttonElement.bind("mousedown"+this.eventNamespace,function(q){if(m.disabled){return}h=false;e=q.pageX;a=q.pageY}).bind("mouseup"+this.eventNamespace,function(q){if(m.disabled){return}if(e!==q.pageX||a!==q.pageY){h=true}})}if(this.type==="checkbox"){this.buttonElement.bind("click"+this.eventNamespace,function(){if(m.disabled||h){return false}f(this).toggleClass("ui-state-active");o.buttonElement.attr("aria-pressed",o.element[0].checked)})}else{if(this.type==="radio"){this.buttonElement.bind("click"+this.eventNamespace,function(){if(m.disabled||h){return false}f(this).addClass("ui-state-active");o.buttonElement.attr("aria-pressed","true");var q=o.element[0];d(q).not(q).map(function(){return f(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")})}else{this.buttonElement.bind("mousedown"+this.eventNamespace,function(){if(m.disabled){return false}f(this).addClass("ui-state-active");k=this;o.document.one("mouseup",function(){k=null})}).bind("mouseup"+this.eventNamespace,function(){if(m.disabled){return false}f(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(q){if(m.disabled){return false}if(q.keyCode===f.ui.keyCode.SPACE||q.keyCode===f.ui.keyCode.ENTER){f(this).addClass("ui-state-active")}}).bind("keyup"+this.eventNamespace,function(){f(this).removeClass("ui-state-active")});if(this.buttonElement.is("a")){this.buttonElement.keyup(function(q){if(q.keyCode===f.ui.keyCode.SPACE){f(this).click()}})}}}this._setOption("disabled",m.disabled);this._resetButton()},_determineButtonType:function(){var l,n,m;if(this.element.is("[type=checkbox]")){this.type="checkbox"}else{if(this.element.is("[type=radio]")){this.type="radio"}else{if(this.element.is("input")){this.type="input"}else{this.type="button"}}}if(this.type==="checkbox"||this.type==="radio"){l=this.element.parents().last();n="label[for='"+this.element.attr("id")+"']";this.buttonElement=l.find(n);if(!this.buttonElement.length){l=l.length?l.siblings():this.element.siblings();this.buttonElement=l.filter(n);if(!this.buttonElement.length){this.buttonElement=l.find(n)}}this.element.addClass("ui-helper-hidden-accessible");m=this.element.is(":checked");if(m){this.buttonElement.addClass("ui-state-active")}this.buttonElement.prop("aria-pressed",m)}else{this.buttonElement=this.element}},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass(i+" "+c+" "+g).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());if(!this.hasTitle){this.buttonElement.removeAttr("title")}},_setOption:function(l,m){this._super(l,m);if(l==="disabled"){if(m){this.element.prop("disabled",true)}else{this.element.prop("disabled",false)}return}this._resetButton()},refresh:function(){var l=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");if(l!==this.options.disabled){this._setOption("disabled",l)}if(this.type==="radio"){d(this.element[0]).each(function(){if(f(this).is(":checked")){f(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true")}else{f(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}})}else{if(this.type==="checkbox"){if(this.element.is(":checked")){this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true")}else{this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false")}}}},_resetButton:function(){if(this.type==="input"){if(this.options.label){this.element.val(this.options.label)}return}var p=this.buttonElement.removeClass(g),n=f("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(p.empty()).text(),m=this.options.icons,l=m.primary&&m.secondary,o=[];if(m.primary||m.secondary){if(this.options.text){o.push("ui-button-text-icon"+(l?"s":(m.primary?"-primary":"-secondary")))}if(m.primary){p.prepend("<span class='ui-button-icon-primary ui-icon "+m.primary+"'></span>")}if(m.secondary){p.append("<span class='ui-button-icon-secondary ui-icon "+m.secondary+"'></span>")}if(!this.options.text){o.push(l?"ui-button-icons-only":"ui-button-icon-only");if(!this.hasTitle){p.attr("title",f.trim(n))}}}else{o.push("ui-button-text-only")}p.addClass(o.join(" "))}});f.widget("ui.buttonset",{version:"1.9.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(l,m){if(l==="disabled"){this.buttons.button("option",l,m)}this._super(l,m)},refresh:function(){var l=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return f(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(l?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(l?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return f(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})}(jQuery));(function($,undefined){$.extend($.ui,{datepicker:{version:"1.9.2"}});var PROP_NAME="datepicker";var dpuuid=new Date().getTime();var instActive;function Datepicker(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._datepickerShowing=false;this._inDialog=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false,holidayDaysSimple:null};$.extend(this._defaults,this.regional[""]);this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){if(this.debug){console.log.apply("",arguments)}},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase();var inline=(nodeName=="div"||nodeName=="span");if(!target.id){this.uuid+=1;target.id="dp"+this.uuid}var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{});if(nodeName=="input"){this._connectDatepicker(target,inst)}else{if(inline){this._inlineDatepicker(target,inst)}}},_newInst:function(target,inline){var id=target[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))}},_connectDatepicker:function(target,inst){var input=$(target);inst.append=$([]);inst.trigger=$([]);if(input.hasClass(this.markerClassName)){return}this._attachments(input,inst);input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});this._autoSize(inst);$.data(target,PROP_NAME,inst);if(inst.settings.disabled){this._disableDatepicker(target)}},_attachments:function(input,inst){var appendText=this._get(inst,"appendText");var isRTL=this._get(inst,"isRTL");if(inst.append){inst.append.remove()}if(appendText){inst.append=$('<span class="'+this._appendClass+'">'+appendText+"</span>");input[isRTL?"before":"after"](inst.append)}input.unbind("focus",this._showDatepicker);if(inst.trigger){inst.trigger.remove()}var showOn=this._get(inst,"showOn");if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");var buttonImage=this._get(inst,"buttonImage");inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));input[isRTL?"before":"after"](inst.trigger);inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==input[0]){$.datepicker._hideDatepicker()}else{if($.datepicker._datepickerShowing&&$.datepicker._lastInput!=input[0]){$.datepicker._hideDatepicker();$.datepicker._showDatepicker(input[0])}else{$.datepicker._showDatepicker(input[0])}}return false})}},_autoSize:function(inst){if(this._get(inst,"autoSize")&&!inst.inline){var date=new Date(2009,12-1,20);var dateFormat=this._get(inst,"dateFormat");if(dateFormat.match(/[DM]/)){var findMax=function(names){var max=0;var maxI=0;for(var i=0;i<names.length;i++){if(names[i].length>max){max=names[i].length;maxI=i}}return maxI};date.setMonth(findMax(this._get(inst,(dateFormat.match(/MM/)?"monthNames":"monthNamesShort"))));date.setDate(findMax(this._get(inst,(dateFormat.match(/DD/)?"dayNames":"dayNamesShort")))+20-date.getDay())}inst.input.attr("size",this._formatDate(inst,date).length)}},_inlineDatepicker:function(target,inst){var divSpan=$(target);if(divSpan.hasClass(this.markerClassName)){return}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst);this._setDate(inst,this._getDefaultDate(inst),true);this._updateDatepicker(inst);this._updateAlternate(inst);if(inst.settings.disabled){this._disableDatepicker(target)}inst.dpDiv.css("display","block")},_dialogDatepicker:function(input,date,onSelect,settings,pos){var inst=this._dialogInst;if(!inst){this.uuid+=1;var id="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+id+'" style="position: absolute; top: -100px; width: 0px;"/>');this._dialogInput.keydown(this._doKeyDown);$("body").append(this._dialogInput);inst=this._dialogInst=this._newInst(this._dialogInput,false);inst.settings={};$.data(this._dialogInput[0],PROP_NAME,inst)}extendRemove(inst.settings,settings||{});date=(date&&date.constructor==Date?this._formatDate(inst,date):date);this._dialogInput.val(date);this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);if(!this._pos){var browserWidth=document.documentElement.clientWidth;var browserHeight=document.documentElement.clientHeight;var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]}this._dialogInput.css("left",(this._pos[0]+20)+"px").css("top",this._pos[1]+"px");inst.settings.onSelect=onSelect;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);if($.blockUI){$.blockUI(this.dpDiv)}$.data(this._dialogInput[0],PROP_NAME,inst);return this},_destroyDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();$.removeData(target,PROP_NAME);if(nodeName=="input"){inst.append.remove();inst.trigger.remove();$target.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()}}},_enableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=false;inst.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().removeClass("ui-state-disabled");inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",false)}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)})},_disableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=true;inst.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().addClass("ui-state-disabled");inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",true)}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)});this._disabledInputs[this._disabledInputs.length]=target},_isDisabledDatepicker:function(target){if(!target){return false}for(var i=0;i<this._disabledInputs.length;i++){if(this._disabledInputs[i]==target){return true}}return false},_getInst:function(target){try{return $.data(target,PROP_NAME)}catch(err){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(target,name,value){var inst=this._getInst(target);if(arguments.length==2&&typeof name=="string"){return(name=="defaults"?$.extend({},$.datepicker._defaults):(inst?(name=="all"?$.extend({},inst.settings):this._get(inst,name)):null))}var settings=name||{};if(typeof name=="string"){settings={};settings[name]=value}if(inst){if(this._curInst==inst){this._hideDatepicker()}var date=this._getDateDatepicker(target,true);var minDate=this._getMinMaxDate(inst,"min");var maxDate=this._getMinMaxDate(inst,"max");extendRemove(inst.settings,settings);if(minDate!==null&&settings.dateFormat!==undefined&&settings.minDate===undefined){inst.settings.minDate=this._formatDate(inst,minDate)}if(maxDate!==null&&settings.dateFormat!==undefined&&settings.maxDate===undefined){inst.settings.maxDate=this._formatDate(inst,maxDate)}this._attachments($(target),inst);this._autoSize(inst);this._setDate(inst,date);this._updateAlternate(inst);this._updateDatepicker(inst)}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)},_refreshDatepicker:function(target){var inst=this._getInst(target);if(inst){this._updateDatepicker(inst)}},_setDateDatepicker:function(target,date){var inst=this._getInst(target);if(inst){this._setDate(inst,date);this._updateDatepicker(inst);this._updateAlternate(inst)}},_getDateDatepicker:function(target,noDefault){var inst=this._getInst(target);if(inst&&!inst.inline){this._setDateFromField(inst,noDefault)}return(inst?this._getDate(inst):null)},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);var handled=true;var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");inst._keyEvent=true;if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker();handled=false;break;case 13:var sel=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",inst.dpDiv);if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])}var onSelect=$.datepicker._get(inst,"onSelect");if(onSelect){var dateStr=$.datepicker._formatDate(inst);onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])}else{$.datepicker._hideDatepicker()}return false;break;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");break;case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");break;case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)}handled=event.ctrlKey||event.metaKey;break;case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)}handled=event.ctrlKey||event.metaKey;break;case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")}break;case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")}handled=event.ctrlKey||event.metaKey;break;case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")}break;case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")}handled=event.ctrlKey||event.metaKey;break;default:handled=false}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)}else{handled=false}}if(handled){event.preventDefault();event.stopPropagation()}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);return event.ctrlKey||event.metaKey||(chr<" "||!chars||chars.indexOf(chr)>-1)}},_doKeyUp:function(event){var inst=$.datepicker._getInst(event.target);if(inst.input.val()!=inst.lastVal){try{var date=$.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),(inst.input?inst.input.val():null),$.datepicker._getFormatConfig(inst));if(date){$.datepicker._setDateFromField(inst);$.datepicker._updateAlternate(inst);$.datepicker._updateDatepicker(inst)}}catch(err){$.datepicker.log(err)}}return true},_showDatepicker:function(input){input=input.target||input;if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return}var inst=$.datepicker._getInst(input);if($.datepicker._curInst&&$.datepicker._curInst!=inst){$.datepicker._curInst.dpDiv.stop(true,true);if(inst&&$.datepicker._datepickerShowing){$.datepicker._hideDatepicker($.datepicker._curInst.input[0])}}extendRemove(inst.settings,beforeShowSettings);inst.lastVal=null;$.datepicker._lastInput=input;$.datepicker._setDateFromField(inst);if($.datepicker._inDialog){input.value=""}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);$.datepicker._pos[1]+=input.offsetHeight}var isFixed=false;$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";return !isFixed});var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null;inst.dpDiv.empty();inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});$.datepicker._updateDatepicker(inst);offset=$.datepicker._checkOffset(inst,offset,isFixed);inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim");var duration=$.datepicker._get(inst,"duration");var postProcess=function(){var cover=inst.dpDiv.find("iframe.ui-datepicker-cover");if(!!cover.length){var borders=$.datepicker._getBorders(inst.dpDiv);cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})}};inst.dpDiv.zIndex($(input).zIndex()+1);$.datepicker._datepickerShowing=true;if($.effects&&($.effects.effect[showAnim]||$.effects[showAnim])){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[showAnim||"show"]((showAnim?duration:null),postProcess)}if(!showAnim||!duration){postProcess()}if(inst.input.is(":visible")&&!inst.input.is(":disabled")){inst.input.focus()}$.datepicker._curInst=inst;var beforeShow=$.datepicker._get(inst,"beforeShow");var beforeShowSettings=beforeShow?beforeShow.apply(input,[input,inst]):{};if(beforeShowSettings===false){return}}},_updateDatepicker:function(inst){this.maxRows=4;var borders=$.datepicker._getBorders(inst.dpDiv);instActive=inst;inst.dpDiv.empty().append(this._generateHTML(inst));this._attachHandlers(inst);var cover=inst.dpDiv.find("iframe.ui-datepicker-cover");if(!!cover.length){cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})}var numMonths=this._getNumberOfMonths(inst);var cols=numMonths[1];var width=17;inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width","415px")}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");if(inst==$.datepicker._curInst&&$.datepicker._datepickerShowing&&inst.input&&inst.input.is(":visible")&&!inst.input.is(":disabled")&&inst.input[0]!=document.activeElement){inst.input.focus()}if(inst.yearshtml){var origyearshtml=inst.yearshtml;setTimeout(function(){if(origyearshtml===inst.yearshtml&&inst.yearshtml){inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml)}origyearshtml=inst.yearshtml=null},0)}},_getBorders:function(elem){var convert=function(value){return{thin:1,medium:2,thick:3}[value]||value};return[parseFloat(convert(elem.css("border-left-width"))),parseFloat(convert(elem.css("border-top-width")))]},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();var dpHeight=inst.dpDiv.outerHeight();var inputWidth=inst.input?inst.input.outerWidth():0;var inputHeight=inst.input?inst.input.outerHeight():0;var viewWidth=document.documentElement.clientWidth+(isFixed?0:$(document).scrollLeft());var viewHeight=document.documentElement.clientHeight+(isFixed?0:$(document).scrollTop());offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;offset.left-=Math.min(offset.left,(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0);offset.top-=Math.min(offset.top,(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(dpHeight+inputHeight):0);return offset},_findPos:function(obj){var inst=this._getInst(obj);var isRTL=this._get(inst,"isRTL");while(obj&&(obj.type=="hidden"||obj.nodeType!=1||$.expr.filters.hidden(obj))){obj=obj[isRTL?"previousSibling":"nextSibling"]}var position=$(obj).offset();return[position.left,position.top]},_hideDatepicker:function(input){var inst=this._curInst;if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return}if(this._datepickerShowing){var showAnim=this._get(inst,"showAnim");var duration=this._get(inst,"duration");var postProcess=function(){$.datepicker._tidyDialog(inst)};if($.effects&&($.effects.effect[showAnim]||$.effects[showAnim])){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide"))]((showAnim?duration:null),postProcess)}if(!showAnim){postProcess()}this._datepickerShowing=false;var onClose=this._get(inst,"onClose");if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])}this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if($.blockUI){$.unblockUI();$("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(event){if(!$.datepicker._curInst){return}var $target=$(event.target),inst=$.datepicker._getInst($target[0]);if((($target[0].id!=$.datepicker._mainDivId&&$target.parents("#"+$.datepicker._mainDivId).length==0&&!$target.hasClass($.datepicker.markerClassName)&&!$target.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)))||($target.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=inst)){$.datepicker._hideDatepicker()}},_adjustDate:function(id,offset,period){var target=$(id);var inst=this._getInst(target[0]);if(this._isDisabledDatepicker(target[0])){return}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);this._updateDatepicker(inst);if(typeof(setSelectedDays)!="undefined"){setSelectedDays()}},_gotoToday:function(id){var target=$(id);var inst=this._getInst(target[0]);if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;inst.drawMonth=inst.selectedMonth=inst.currentMonth;inst.drawYear=inst.selectedYear=inst.currentYear}else{var date=new Date();inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear()}this._notifyChange(inst);this._adjustDate(target)},_selectMonthYear:function(id,select,period){var target=$(id);var inst=this._getInst(target[0]);inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);this._notifyChange(inst);this._adjustDate(target)},_selectDay:function(id,month,year,td){var target=$(id);if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return}var inst=this._getInst(target[0]);inst.selectedDay=inst.currentDay=$("a",td).attr("data-day");inst.selectedMonth=inst.currentMonth=month;inst.selectedYear=inst.currentYear=year;this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))},_clearDate:function(id){var target=$(id);var inst=this._getInst(target[0]);this._selectDate(target,"")},_selectDate:function(id,dateStr){var target=$(id);var inst=this._getInst(target[0]);dateStr=(dateStr!=null?dateStr:this._formatDate(inst));if(inst.input){inst.input.val(dateStr)}this._updateAlternate(inst);var onSelect=this._get(inst,"onSelect");if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])}else{if(inst.input){inst.input.trigger("change")}}if(inst.inline){this._updateDatepicker(inst)}else{this._hideDatepicker();this._lastInput=inst.input[0];if(typeof(inst.input[0])!="object"){inst.input.focus()}this._lastInput=null}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");var date=this._getDate(inst);var dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));$(altField).each(function(){$(this).val(dateStr)})}},noWeekends:function(date){var day=date.getDay();return[(day>0&&day<6),""]},iso8601Week:function(date){var checkDate=new Date(date.getTime());checkDate.setDate(checkDate.getDate()+4-(checkDate.getDay()||7));var time=checkDate.getTime();checkDate.setMonth(0);checkDate.setDate(1);return Math.floor(Math.round((time-checkDate)/86400000)/7)+1},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"}value=(typeof value=="object"?value.toString():value+"");if(value==""){return null}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var year=-1;var month=-1;var day=-1;var doy=-1;var literal=false;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var getNumber=function(match){var isDoubled=lookAhead(match);var size=(match=="@"?14:(match=="!"?20:(match=="y"&&isDoubled?4:(match=="o"?3:2))));var digits=new RegExp("^\\d{1,"+size+"}");var num=value.substring(iValue).match(digits);if(!num){throw"Missing number at position "+iValue}iValue+=num[0].length;return parseInt(num[0],10)};var getName=function(match,shortNames,longNames){var names=$.map(lookAhead(match)?longNames:shortNames,function(v,k){return[[k,v]]}).sort(function(a,b){return -(a[1].length-b[1].length)});var index=-1;$.each(names,function(i,pair){var name=pair[1];if(value.substr(iValue,name.length).toLowerCase()==name.toLowerCase()){index=pair[0];iValue+=name.length;return false}});if(index!=-1){return index+1}else{throw"Unknown name at position "+iValue}};var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue}iValue++};var iValue=0;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{checkLiteral()}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");break;case"D":getName("D",dayNamesShort,dayNames);break;case"o":doy=getNumber("o");break;case"m":month=getNumber("m");break;case"M":month=getName("M",monthNamesShort,monthNames);break;case"y":year=getNumber("y");break;case"@":var date=new Date(getNumber("@"));year=date.getFullYear();month=date.getMonth()+1;day=date.getDate();break;case"!":var date=new Date((getNumber("!")-this._ticksTo1970)/10000);year=date.getFullYear();month=date.getMonth()+1;day=date.getDate();break;case"'":if(lookAhead("'")){checkLiteral()}else{literal=true}break;default:checkLiteral()}}}if(iValue<value.length){var extra=value.substr(iValue);if(!/^\s+/.test(extra)){throw"Extra/unparsed characters found in date: "+extra}}if(year==-1){year=new Date().getFullYear()}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)}}if(doy>-1){month=1;day=doy;do{var dim=this._getDaysInMonth(year,month-1);if(day<=dim){break}month++;day-=dim}while(true)}var date=this._daylightSavingAdjust(new Date(year,month-1,day));if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"}return date},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(((1970-1)*365+Math.floor(1970/4)-Math.floor(1970/100)+Math.floor(1970/400))*24*60*60*10000000),formatDate:function(format,date,settings){if(!date){return""}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var formatNumber=function(match,value,len){var num=""+value;if(lookAhead(match)){while(num.length<len){num="0"+num}}return num};var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])};var output="";var literal=false;if(date){for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{output+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);break;case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);break;case"o":output+=formatNumber("o",Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime()-new Date(date.getFullYear(),0,0).getTime())/86400000),3);break;case"m":output+=formatNumber("m",date.getMonth()+1,2);break;case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);break;case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);break;case"@":output+=date.getTime();break;case"!":output+=date.getTime()*10000+this._ticksTo1970;break;case"'":if(lookAhead("'")){output+="'"}else{literal=true}break;default:output+=format.charAt(iFormat)}}}}return output},_possibleChars:function(format){var chars="";var literal=false;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{chars+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";break;case"D":case"M":return null;case"'":if(lookAhead("'")){chars+="'"}else{literal=true}break;default:chars+=format.charAt(iFormat)}}}return chars},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]},_setDateFromField:function(inst,noDefault){if(inst.input.val()==inst.lastVal){return}var dateFormat=this._get(inst,"dateFormat");var dates=inst.lastVal=inst.input?inst.input.val():null;var date,defaultDate;date=defaultDate=this._getDefaultDate(inst);var settings=this._getFormatConfig(inst);try{date=this.parseDate(dateFormat,dates,settings)||defaultDate}catch(event){this.log(event);dates=(noDefault?"":dates)}inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();inst.currentDay=(dates?date.getDate():0);inst.currentMonth=(dates?date.getMonth():0);inst.currentYear=(dates?date.getFullYear():0);this._adjustInstDate(inst)},_getDefaultDate:function(inst){return this._restrictMinMax(inst,this._determineDate(inst,this._get(inst,"defaultDate"),new Date()))},_determineDate:function(inst,date,defaultDate){var offsetNumeric=function(offset){var date=new Date();date.setDate(date.getDate()+offset);return date};var offsetString=function(offset){try{return $.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),offset,$.datepicker._getFormatConfig(inst))}catch(e){}var date=(offset.toLowerCase().match(/^c/)?$.datepicker._getDate(inst):null)||new Date();var year=date.getFullYear();var month=date.getMonth();var day=date.getDate();var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;var matches=pattern.exec(offset);while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);break;case"w":case"W":day+=parseInt(matches[1],10)*7;break;case"m":case"M":month+=parseInt(matches[1],10);day=Math.min(day,$.datepicker._getDaysInMonth(year,month));break;case"y":case"Y":year+=parseInt(matches[1],10);day=Math.min(day,$.datepicker._getDaysInMonth(year,month));break}matches=pattern.exec(offset)}return new Date(year,month,day)};var newDate=(date==null||date===""?defaultDate:(typeof date=="string"?offsetString(date):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):new Date(date.getTime()))));newDate=(newDate&&newDate.toString()=="Invalid Date"?defaultDate:newDate);if(newDate){newDate.setHours(0);newDate.setMinutes(0);newDate.setSeconds(0);newDate.setMilliseconds(0)}return this._daylightSavingAdjust(newDate)},_daylightSavingAdjust:function(date){if(!date){return null}date.setHours(date.getHours()>12?date.getHours()+2:0);return date},_setDate:function(inst,date,noChange){var clear=!date;var origMonth=inst.selectedMonth;var origYear=inst.selectedYear;var newDate=this._restrictMinMax(inst,this._determineDate(inst,date,new Date()));inst.selectedDay=inst.currentDay=newDate.getDate();inst.drawMonth=inst.selectedMonth=inst.currentMonth=newDate.getMonth();inst.drawYear=inst.selectedYear=inst.currentYear=newDate.getFullYear();if((origMonth!=inst.selectedMonth||origYear!=inst.selectedYear)&&!noChange){this._notifyChange(inst)}this._adjustInstDate(inst);if(inst.input){inst.input.val(clear?"":this._formatDate(inst))}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return startDate},_attachHandlers:function(inst){var stepMonths=this._get(inst,"stepMonths");var id="#"+inst.id.replace(/\\\\/g,"\\");inst.dpDiv.find("[data-handler]").map(function(){var handler={prev:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(id,-stepMonths,"M")},next:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(id,+stepMonths,"M")},hide:function(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(id)},selectDay:function(){window["DP_jQuery_"+dpuuid].datepicker._selectDay(id,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this);return false},selectMonth:function(){window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(id,this,"M");return false},selectYear:function(){window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(id,this,"Y");return false}};$(this).bind(this.getAttribute("data-event"),handler[this.getAttribute("data-handler")])})},_generateHTML:function(inst){var today=new Date();today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));var isRTL=this._get(inst,"isRTL");var showButtonPanel=this._get(inst,"showButtonPanel");var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");var numMonths=this._getNumberOfMonths(inst);var showCurrentAtPos=this._get(inst,"showCurrentAtPos");var stepMonths=this._get(inst,"stepMonths");var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));var minDate=this._getMinMaxDate(inst,"min");var maxDate=this._getMinMaxDate(inst,"max");var drawMonth=inst.drawMonth-showCurrentAtPos;var drawYear=inst.drawYear;if(drawMonth<0){drawMonth+=12;drawYear--}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-(numMonths[0]*numMonths[1])+1,maxDate.getDate()));maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;if(drawMonth<0){drawMonth=11;drawYear--}}}inst.drawMonth=drawMonth;inst.drawYear=drawYear;var prevText=this._get(inst,"prevText");prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));var nextText=this._get(inst,"nextText");nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));var currentText=this._get(inst,"currentText");var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(inst,"closeText")+"</button>":"");var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";var firstDay=parseInt(this._get(inst,"firstDay"),10);firstDay=(isNaN(firstDay)?0:firstDay);var showWeek=this._get(inst,"showWeek");var dayNames=this._get(inst,"dayNames");var dayNamesShort=this._get(inst,"dayNamesShort");var dayNamesMin=this._get(inst,"dayNamesMin");var monthNames=this._get(inst,"monthNames");var monthNamesShort=this._get(inst,"monthNamesShort");var beforeShowDay=this._get(inst,"beforeShowDay");var showOtherMonths=this._get(inst,"showOtherMonths");var selectOtherMonths=this._get(inst,"selectOtherMonths");var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;var defaultDate=this._getDefaultDate(inst);var holidayDaysSimple=this._get(inst,"holidayDaysSimple");var html="";var holidaySimpleName="";for(var row=0;row<numMonths[0];row++){var group="";this.maxRows=4;for(var col=0;col<numMonths[1];col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));var cornerClass=" ui-corner-all";var calender="";if(isMultiMonth){calender+='<div class="ui-datepicker-group';if(numMonths[1]>1){switch(col){case 0:calender+=" ui-datepicker-group-first";cornerClass=" ui-corner-"+(isRTL?"right":"left");break;case numMonths[1]-1:calender+=" ui-datepicker-group-last";cornerClass=" ui-corner-"+(isRTL?"left":"right");break;default:calender+=" ui-datepicker-group-middle";cornerClass="";break}}calender+='">'}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var thead=(showWeek?'<th class="ui-datepicker-week-col">'+this._get(inst,"weekHeader")+"</th>":"");for(var dow=0;dow<7;dow++){var day=(dow+firstDay)%7;thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"}calender+=thead+"</tr></thead><tbody>";var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;var curRows=Math.ceil((leadDays+daysInMonth)/7);var numRows=(isMultiMonth?this.maxRows>curRows?this.maxRows:curRows:curRows);this.maxRows=numRows;var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));for(var dRow=0;dRow<numRows;dRow++){calender+="<tr>";var tbody=(!showWeek?"":'<td class="ui-datepicker-week-col">'+this._get(inst,"calculateWeek")(printDate)+"</td>");for(var dow=0;dow<7;dow++){if(printDate.getTime()==today.getTime()){holidaySimpleName="今日"}if(holidayDaysSimple){for(x=0;x<holidayDaysSimple.length;x++){if(printDate.getMonth()==(holidayDaysSimple[x][0]-1)&&printDate.getDate()==holidayDaysSimple[x][1]&&printDate.getFullYear()==holidayDaysSimple[x][2]){holidaySimpleName=holidayDaysSimple[x][3]}}}var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);var otherMonth=(printDate.getMonth()!=drawMonth);var unselectable=(otherMonth&&!selectOtherMonths)||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()==currentDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":' data-handler="selectDay" data-event="click" data-month="'+printDate.getMonth()+'" data-year="'+printDate.getFullYear()+'"')+">"+(otherMonth&&!showOtherMonths?"&#xa0;":(unselectable?'<span class="ui-state-default-sp" data-day="'+printDate.getDate()+'" holidaySimpleName="'+(holidaySimpleName?holidaySimpleName:"")+'">'+(holidaySimpleName?holidaySimpleName:printDate.getDate())+"</span>":'<a class="ui-state-default'+(otherMonth?" ui-priority-secondary":"")+'" href="#" data-day="'+printDate.getDate()+'" holidaySimpleName="'+(holidaySimpleName?holidaySimpleName:"")+'">'+(holidaySimpleName?holidaySimpleName:printDate.getDate())+"</a>"))+"</td>";printDate.setDate(printDate.getDate()+1);printDate=this._daylightSavingAdjust(printDate);holidaySimpleName=null}calender+=tbody+"</tr>"}drawMonth++;if(drawMonth>11){drawMonth=0;drawYear++}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");group+=calender}html+=group}html+=buttonPanel+($.ui.ie6&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");inst._keyEvent=false;return html},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,secondary,monthNames,monthNamesShort){var changeMonth=this._get(inst,"changeMonth");var changeYear=this._get(inst,"changeYear");var showMonthAfterYear=this._get(inst,"showMonthAfterYear");var html='<div class="ui-datepicker-title">';if(!inst.yearshtml){inst.yearshtml="";if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"}else{var years=this._get(inst,"yearRange").split(":");var thisYear=new Date().getFullYear();var determineYear=function(value){var year=(value.match(/c[+-].*/)?drawYear+parseInt(value.substring(1),10):(value.match(/[+-].*/)?thisYear+parseInt(value,10):parseInt(value,10)));return(isNaN(year)?thisYear:year)};var year=determineYear(years[0]);var endYear=Math.max(year,determineYear(years[1]||""));year=(minDate?Math.max(year,minDate.getFullYear()):year);endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);inst.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';for(;year<=endYear;year++){inst.yearshtml+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"}inst.yearshtml+="</select>";html+=inst.yearshtml;inst.yearshtml=null}}var monthHtml="";if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span>"}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);monthHtml+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for(var month=0;month<12;month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"}}monthHtml+="</select>"}if(!showMonthAfterYear){html+=monthHtml+(secondary||!(changeMonth&&changeYear)?"&#xa0;":"")}html+=this._get(inst,"yearSuffix");if(showMonthAfterYear){html+=(secondary||!(changeMonth&&changeYear)?"&#xa0;":"")+monthHtml}html+="</div>";return html},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);var month=inst.drawMonth+(period=="M"?offset:0);var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);var date=this._restrictMinMax(inst,this._daylightSavingAdjust(new Date(year,month,day)));inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();if(period=="M"||period=="Y"){this._notifyChange(inst)}},_restrictMinMax:function(inst,date){var minDate=this._getMinMaxDate(inst,"min");var maxDate=this._getMinMaxDate(inst,"max");var newDate=(minDate&&date<minDate?minDate:date);newDate=(maxDate&&newDate>maxDate?maxDate:newDate);return newDate},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))},_getMinMaxDate:function(inst,minMax){return this._determineDate(inst,this._get(inst,minMax+"Date"),null)},_getDaysInMonth:function(year,month){return 32-this._daylightSavingAdjust(new Date(year,month,32)).getDate()},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[0]*numMonths[1]),1));if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))}return this._isInRange(inst,date)},_isInRange:function(inst,date){var minDate=this._getMinMaxDate(inst,"min");var maxDate=this._getMinMaxDate(inst,"max");return((!minDate||date.getTime()>=minDate.getTime())&&(!maxDate||date.getTime()<=maxDate.getTime()))},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;inst.currentMonth=inst.selectedMonth;inst.currentYear=inst.selectedYear}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))}});function bindHover(dpDiv){var selector="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return dpDiv.delegate(selector,"mouseout",function(){$(this).removeClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).removeClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).removeClass("ui-datepicker-next-hover")}}).delegate(selector,"mouseover",function(){if(!$.datepicker._isDisabledDatepicker(instActive.inline?dpDiv.parent()[0]:instActive.input[0])){$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");if(this.className.indexOf("ui-state-default")!=-1){$(this).addClass("ui-state-hover")}if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).addClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).addClass("ui-datepicker-next-hover")}}})}function extendRemove(target,props){$.extend(target,props);for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]}}return target}$.fn.datepicker=function(options){if(!this.length){return this}if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv);$.datepicker.initialized=true}var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=="string"&&(options=="isDisabled"||options=="getDate"||options=="widget")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)})};$.datepicker=new Datepicker();$.datepicker.initialized=false;$.datepicker.uuid=new Date().getTime();$.datepicker.version="1.9.2";window["DP_jQuery_"+dpuuid]=$})(jQuery);(function(d,e){var b="ui-dialog ui-widget ui-widget-content ui-corner-all ",a={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},c={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true};d.widget("ui.dialog",{version:"1.9.2",options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",of:window,collision:"fit",using:function(g){var f=d(this).css(g).offset().top;if(f<0){d(this).css("top",g.top-f)}}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string"){this.originalTitle=""}this.oldPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)};this.options.title=this.options.title||this.originalTitle;var k=this,j=this.options,m=j.title||"&#160;",h,l,f,i,g;h=(this.uiDialog=d("<div>")).addClass(b+j.dialogClass).css({display:"none",outline:0,zIndex:j.zIndex}).attr("tabIndex",-1).keydown(function(n){if(j.closeOnEscape&&!n.isDefaultPrevented()&&n.keyCode&&n.keyCode===d.ui.keyCode.ESCAPE){k.close(n);n.preventDefault()}}).mousedown(function(n){k.moveToTop(false,n)}).appendTo("body");this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(h);l=(this.uiDialogTitlebar=d("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown",function(){h.focus()}).prependTo(h);f=d("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role","button").click(function(n){n.preventDefault();k.close(n)}).appendTo(l);(this.uiDialogTitlebarCloseText=d("<span>")).addClass("ui-icon ui-icon-closethick").text(j.closeText).appendTo(f);i=d("<span>").uniqueId().addClass("ui-dialog-title").html(m).prependTo(l);g=(this.uiDialogButtonPane=d("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");(this.uiButtonSet=d("<div>")).addClass("ui-dialog-buttonset").appendTo(g);h.attr({role:"dialog","aria-labelledby":i.attr("id")});l.find("*").add(l).disableSelection();this._hoverable(f);this._focusable(f);if(j.draggable&&d.fn.draggable){this._makeDraggable()}if(j.resizable&&d.fn.resizable){this._makeResizable()}this._createButtons(j.buttons);this._isOpen=false;if(d.fn.bgiframe){h.bgiframe()}this._on(h,{keydown:function(p){if(!j.modal||p.keyCode!==d.ui.keyCode.TAB){return}var o=d(":tabbable",h),q=o.filter(":first"),n=o.filter(":last");if(p.target===n[0]&&!p.shiftKey){q.focus(1);return false}else{if(p.target===q[0]&&p.shiftKey){n.focus(1);return false}}}})},_init:function(){if(this.options.autoOpen){this.open()}},_destroy:function(){var g,f=this.oldPosition;if(this.overlay){this.overlay.destroy()}this.uiDialog.hide();this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");this.uiDialog.remove();if(this.originalTitle){this.element.attr("title",this.originalTitle)}g=f.parent.children().eq(f.index);if(g.length&&g[0]!==this.element[0]){g.before(this.element)}else{f.parent.append(this.element)}},widget:function(){return this.uiDialog},close:function(i){var h=this,g,f;if(!this._isOpen){return}if(false===this._trigger("beforeClose",i)){return}this._isOpen=false;if(this.overlay){this.overlay.destroy()}if(this.options.hide){this._hide(this.uiDialog,this.options.hide,function(){h._trigger("close",i)})}else{this.uiDialog.hide();this._trigger("close",i)}d.ui.dialog.overlay.resize();if(this.options.modal){g=0;d(".ui-dialog").each(function(){if(this!==h.uiDialog[0]){f=d(this).css("z-index");if(!isNaN(f)){g=Math.max(g,f)}}});d.ui.dialog.maxZ=g}return this},isOpen:function(){return this._isOpen},moveToTop:function(i,h){var g=this.options,f;if((g.modal&&!i)||(!g.stack&&!g.modal)){return this._trigger("focus",h)}if(g.zIndex>d.ui.dialog.maxZ){d.ui.dialog.maxZ=g.zIndex}if(this.overlay){d.ui.dialog.maxZ+=1;d.ui.dialog.overlay.maxZ=d.ui.dialog.maxZ;this.overlay.$el.css("z-index",d.ui.dialog.overlay.maxZ)}f={scrollTop:this.element.scrollTop(),scrollLeft:this.element.scrollLeft()};d.ui.dialog.maxZ+=1;this.uiDialog.css("z-index",d.ui.dialog.maxZ);this.element.attr(f);this._trigger("focus",h);return this},open:function(){if(this._isOpen){return}var h,g=this.options,f=this.uiDialog;this._size();this._position(g.position);f.show(g.show);this.overlay=g.modal?new d.ui.dialog.overlay(this):null;this.moveToTop(true);h=this.element.find(":tabbable");if(!h.length){h=this.uiDialogButtonPane.find(":tabbable");if(!h.length){h=f}}h.eq(0).focus();this._isOpen=true;this._trigger("open");return this},_createButtons:function(h){var g=this,f=false;this.uiDialogButtonPane.remove();this.uiButtonSet.empty();if(typeof h==="object"&&h!==null){d.each(h,function(){return !(f=true)})}if(f){d.each(h,function(i,k){var j,l;k=d.isFunction(k)?{click:k,text:i}:k;k=d.extend({type:"button"},k);l=k.click;k.click=function(){l.apply(g.element[0],arguments)};j=d("<button></button>",k).appendTo(g.uiButtonSet);if(d.fn.button){j.button()}});this.uiDialog.addClass("ui-dialog-buttons");this.uiDialogButtonPane.appendTo(this.uiDialog)}else{this.uiDialog.removeClass("ui-dialog-buttons")}},_makeDraggable:function(){var h=this,g=this.options;function f(i){return{position:i.position,offset:i.offset}}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(i,j){d(this).addClass("ui-dialog-dragging");h._trigger("dragStart",i,f(j))},drag:function(i,j){h._trigger("drag",i,f(j))},stop:function(i,j){g.position=[j.position.left-h.document.scrollLeft(),j.position.top-h.document.scrollTop()];d(this).removeClass("ui-dialog-dragging");h._trigger("dragStop",i,f(j));d.ui.dialog.overlay.resize()}})},_makeResizable:function(j){j=(j===e?this.options.resizable:j);var k=this,i=this.options,f=this.uiDialog.css("position"),h=typeof j==="string"?j:"n,e,s,w,se,sw,ne,nw";function g(l){return{originalPosition:l.originalPosition,originalSize:l.originalSize,position:l.position,size:l.size}}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:i.maxWidth,maxHeight:i.maxHeight,minWidth:i.minWidth,minHeight:this._minHeight(),handles:h,start:function(l,m){d(this).addClass("ui-dialog-resizing");k._trigger("resizeStart",l,g(m))},resize:function(l,m){k._trigger("resize",l,g(m))},stop:function(l,m){d(this).removeClass("ui-dialog-resizing");i.height=d(this).height();i.width=d(this).width();k._trigger("resizeStop",l,g(m));d.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var f=this.options;if(f.height==="auto"){return f.minHeight}else{return Math.min(f.minHeight,f.height)}},_position:function(g){var h=[],i=[0,0],f;if(g){if(typeof g==="string"||(typeof g==="object"&&"0" in g)){h=g.split?g.split(" "):[g[0],g[1]];if(h.length===1){h[1]=h[0]}d.each(["left","top"],function(k,j){if(+h[k]===h[k]){i[k]=h[k];h[k]=j}});g={my:h[0]+(i[0]<0?i[0]:"+"+i[0])+" "+h[1]+(i[1]<0?i[1]:"+"+i[1]),at:h.join(" ")}}g=d.extend({},d.ui.dialog.prototype.options.position,g)}else{g=d.ui.dialog.prototype.options.position}f=this.uiDialog.is(":visible");if(!f){this.uiDialog.show()}this.uiDialog.position(g);if(!f){this.uiDialog.hide()}},_setOptions:function(h){var i=this,f={},g=false;d.each(h,function(j,k){i._setOption(j,k);if(j in a){g=true}if(j in c){f[j]=k}});if(g){this._size()}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option",f)}},_setOption:function(h,i){var g,j,f=this.uiDialog;switch(h){case"buttons":this._createButtons(i);break;case"closeText":this.uiDialogTitlebarCloseText.text(""+i);break;case"dialogClass":f.removeClass(this.options.dialogClass).addClass(b+i);break;case"disabled":if(i){f.addClass("ui-dialog-disabled")}else{f.removeClass("ui-dialog-disabled")}break;case"draggable":g=f.is(":data(draggable)");if(g&&!i){f.draggable("destroy")}if(!g&&i){this._makeDraggable()}break;case"position":this._position(i);break;case"resizable":j=f.is(":data(resizable)");if(j&&!i){f.resizable("destroy")}if(j&&typeof i==="string"){f.resizable("option","handles",i)}if(!j&&i!==false){this._makeResizable(i)}break;case"title":d(".ui-dialog-title",this.uiDialogTitlebar).html(""+(i||"&#160;"));break}this._super(h,i)},_size:function(){var g,j,i,h=this.options,f=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(h.minWidth>h.width){h.width=h.minWidth}g=this.uiDialog.css({height:"auto",width:h.width}).outerHeight();j=Math.max(0,h.minHeight-g);if(h.height==="auto"){if(d.support.minHeight){this.element.css({minHeight:j,height:"auto"})}else{this.uiDialog.show();i=this.element.css("height","auto").height();if(!f){this.uiDialog.hide()}this.element.height(Math.max(i,j))}}else{this.element.height(Math.max(h.height-g,0))}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())}}});d.extend(d.ui.dialog,{uuid:0,maxZ:0,getTitleId:function(f){var g=f.attr("id");if(!g){this.uuid+=1;g=this.uuid}return"ui-dialog-title-"+g},overlay:function(f){this.$el=d.ui.dialog.overlay.create(f)}});d.extend(d.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:d.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(f){return f+".dialog-overlay"}).join(" "),create:function(g){if(this.instances.length===0){setTimeout(function(){if(d.ui.dialog.overlay.instances.length){d(document).bind(d.ui.dialog.overlay.events,function(h){if(d(h.target).zIndex()<d.ui.dialog.overlay.maxZ){return false}})}},1);d(window).bind("resize.dialog-overlay",d.ui.dialog.overlay.resize)}var f=(this.oldInstances.pop()||d("<div>").addClass("ui-widget-overlay"));d(document).bind("keydown.dialog-overlay",function(h){var i=d.ui.dialog.overlay.instances;if(i.length!==0&&i[i.length-1]===f&&g.options.closeOnEscape&&!h.isDefaultPrevented()&&h.keyCode&&h.keyCode===d.ui.keyCode.ESCAPE){g.close(h);h.preventDefault()}});f.appendTo(document.body).css({width:this.width(),height:this.height()});if(d.fn.bgiframe){f.bgiframe()}this.instances.push(f);return f},destroy:function(f){var g=d.inArray(f,this.instances),h=0;if(g!==-1){this.oldInstances.push(this.instances.splice(g,1)[0])}if(this.instances.length===0){d([document,window]).unbind(".dialog-overlay")}f.height(0).width(0).remove();d.each(this.instances,function(){h=Math.max(h,this.css("z-index"))});this.maxZ=h},height:function(){var g,f;if(d.ui.ie){g=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);f=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(g<f){return d(window).height()+"px"}else{return g+"px"}}else{return d(document).height()+"px"}},width:function(){var f,g;if(d.ui.ie){f=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);g=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(f<g){return d(window).width()+"px"}else{return f+"px"}}else{return d(document).width()+"px"}},resize:function(){var f=d([]);d.each(d.ui.dialog.overlay.instances,function(){f=f.add(this)});f.css({width:0,height:0}).css({width:d.ui.dialog.overlay.width(),height:d.ui.dialog.overlay.height()})}});d.extend(d.ui.dialog.overlay.prototype,{destroy:function(){d.ui.dialog.overlay.destroy(this.$el)}})}(jQuery));(function(b,d){var a=/up|down|vertical/,c=/up|left|vertical|horizontal/;b.effects.effect.blind=function(g,m){var h=b(this),q=["position","top","bottom","left","right","height","width"],n=b.effects.setMode(h,g.mode||"hide"),r=g.direction||"up",j=a.test(r),i=j?"height":"width",p=j?"top":"left",t=c.test(r),l={},s=n==="show",f,e,k;if(h.parent().is(".ui-effects-wrapper")){b.effects.save(h.parent(),q)}else{b.effects.save(h,q)}h.show();f=b.effects.createWrapper(h).css({overflow:"hidden"});e=f[i]();k=parseFloat(f.css(p))||0;l[i]=s?e:0;if(!t){h.css(j?"bottom":"right",0).css(j?"top":"left","auto").css({position:"absolute"});l[p]=s?k:e+k}if(s){f.css(i,0);if(!t){f.css(p,k+e)}}f.animate(l,{duration:g.duration,easing:g.easing,queue:false,complete:function(){if(n==="hide"){h.hide()}b.effects.restore(h,q);b.effects.removeWrapper(h);m()}})}})(jQuery);(function(a,b){a.effects.effect.bounce=function(m,l){var c=a(this),d=["position","top","bottom","left","right","height","width"],k=a.effects.setMode(c,m.mode||"effect"),j=k==="hide",v=k==="show",w=m.direction||"up",e=m.distance,h=m.times||5,y=h*2+(v||j?1:0),u=m.duration/y,p=m.easing,f=(w==="up"||w==="down")?"top":"left",n=(w==="up"||w==="left"),t,g,s,q=c.queue(),r=q.length;if(v||j){d.push("opacity")}a.effects.save(c,d);c.show();a.effects.createWrapper(c);if(!e){e=c[f==="top"?"outerHeight":"outerWidth"]()/3}if(v){s={opacity:1};s[f]=0;c.css("opacity",0).css(f,n?-e*2:e*2).animate(s,u,p)}if(j){e=e/Math.pow(2,h-1)}s={};s[f]=0;for(t=0;t<h;t++){g={};g[f]=(n?"-=":"+=")+e;c.animate(g,u,p).animate(s,u,p);e=j?e*2:e/2}if(j){g={opacity:0};g[f]=(n?"-=":"+=")+e;c.animate(g,u,p)}c.queue(function(){if(j){c.hide()}a.effects.restore(c,d);a.effects.removeWrapper(c);l()});if(r>1){q.splice.apply(q,[1,0].concat(q.splice(r,y+1)))}c.dequeue()}})(jQuery);(function(a,b){a.effects.effect.clip=function(f,i){var g=a(this),m=["position","top","bottom","left","right","height","width"],l=a.effects.setMode(g,f.mode||"hide"),p=l==="show",n=f.direction||"vertical",k=n==="vertical",q=k?"height":"width",j=k?"top":"left",h={},d,e,c;a.effects.save(g,m);g.show();d=a.effects.createWrapper(g).css({overflow:"hidden"});e=(g[0].tagName==="IMG")?d:g;c=e[q]();if(p){e.css(q,0);e.css(j,c/2)}h[q]=p?c:0;h[j]=p?0:c/2;e.animate(h,{queue:false,duration:f.duration,easing:f.easing,complete:function(){if(!p){g.hide()}a.effects.restore(g,m);a.effects.removeWrapper(g);i()}})}})(jQuery);(function(a,b){a.effects.effect.drop=function(d,h){var e=a(this),j=["position","top","bottom","left","right","opacity","height","width"],i=a.effects.setMode(e,d.mode||"hide"),l=i==="show",k=d.direction||"left",f=(k==="up"||k==="down")?"top":"left",m=(k==="up"||k==="left")?"pos":"neg",g={opacity:l?1:0},c;a.effects.save(e,j);e.show();a.effects.createWrapper(e);c=d.distance||e[f==="top"?"outerHeight":"outerWidth"](true)/2;if(l){e.css("opacity",0).css(f,m==="pos"?-c:c)}g[f]=(l?(m==="pos"?"+=":"-="):(m==="pos"?"-=":"+="))+c;e.animate(g,{queue:false,duration:d.duration,easing:d.easing,complete:function(){if(i==="hide"){e.hide()}a.effects.restore(e,j);a.effects.removeWrapper(e);h()}})}})(jQuery);(function(a,b){a.effects.effect.explode=function(s,r){var k=s.pieces?Math.round(Math.sqrt(s.pieces)):3,d=k,c=a(this),m=a.effects.setMode(c,s.mode||"hide"),w=m==="show",g=c.show().css("visibility","hidden").offset(),t=Math.ceil(c.outerWidth()/d),q=Math.ceil(c.outerHeight()/k),h=[],v,u,e,p,n,l;function y(){h.push(this);if(h.length===k*d){f()}}for(v=0;v<k;v++){p=g.top+v*q;l=v-(k-1)/2;for(u=0;u<d;u++){e=g.left+u*t;n=u-(d-1)/2;c.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-u*t,top:-v*q}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:t,height:q,left:e+(w?n*t:0),top:p+(w?l*q:0),opacity:w?0:1}).animate({left:e+(w?0:n*t),top:p+(w?0:l*q),opacity:w?1:0},s.duration||500,s.easing,y)}}function f(){c.css({visibility:"visible"});a(h).remove();if(!w){c.hide()}r()}}})(jQuery);(function(a,b){a.effects.effect.fade=function(f,c){var d=a(this),e=a.effects.setMode(d,f.mode||"toggle");d.animate({opacity:e},{queue:false,duration:f.duration,easing:f.easing,complete:c})}})(jQuery);(function(a,b){a.effects.effect.fold=function(e,i){var f=a(this),n=["position","top","bottom","left","right","height","width"],k=a.effects.setMode(f,e.mode||"hide"),r=k==="show",l=k==="hide",t=e.size||15,m=/([0-9]+)%/.exec(t),s=!!e.horizFirst,j=r!==s,g=j?["width","height"]:["height","width"],h=e.duration/2,d,c,q={},p={};a.effects.save(f,n);f.show();d=a.effects.createWrapper(f).css({overflow:"hidden"});c=j?[d.width(),d.height()]:[d.height(),d.width()];if(m){t=parseInt(m[1],10)/100*c[l?0:1]}if(r){d.css(s?{height:0,width:t}:{height:t,width:0})}q[g[0]]=r?c[0]:t;p[g[1]]=r?c[1]:0;d.animate(q,h,e.easing).animate(p,h,e.easing,function(){if(l){f.hide()}a.effects.restore(f,n);a.effects.removeWrapper(f);i()})}})(jQuery);(function(a,b){a.effects.effect.highlight=function(h,c){var e=a(this),d=["backgroundImage","backgroundColor","opacity"],g=a.effects.setMode(e,h.mode||"show"),f={backgroundColor:e.css("backgroundColor")};if(g==="hide"){f.opacity=0}a.effects.save(e,d);e.show().css({backgroundImage:"none",backgroundColor:h.color||"#ffff99"}).animate(f,{queue:false,duration:h.duration,easing:h.easing,complete:function(){if(g==="hide"){e.hide()}a.effects.restore(e,d);c()}})}})(jQuery);(function(a,b){a.effects.effect.pulsate=function(c,g){var e=a(this),k=a.effects.setMode(e,c.mode||"show"),p=k==="show",l=k==="hide",q=(p||k==="hide"),m=((c.times||5)*2)+(q?1:0),f=c.duration/m,n=0,j=e.queue(),d=j.length,h;if(p||!e.is(":visible")){e.css("opacity",0).show();n=1}for(h=1;h<m;h++){e.animate({opacity:n},f,c.easing);n=1-n}e.animate({opacity:n},f,c.easing);e.queue(function(){if(l){e.hide()}g()});if(d>1){j.splice.apply(j,[1,0].concat(j.splice(d,m+1)))}e.dequeue()}})(jQuery);(function(a,b){a.effects.effect.puff=function(j,c){var h=a(this),i=a.effects.setMode(h,j.mode||"hide"),f=i==="hide",g=parseInt(j.percent,10)||150,e=g/100,d={height:h.height(),width:h.width(),outerHeight:h.outerHeight(),outerWidth:h.outerWidth()};a.extend(j,{effect:"scale",queue:false,fade:true,mode:i,complete:c,percent:f?g:100,from:f?d:{height:d.height*e,width:d.width*e,outerHeight:d.outerHeight*e,outerWidth:d.outerWidth*e}});h.effect(j)};a.effects.effect.scale=function(c,f){var d=a(this),l=a.extend(true,{},c),g=a.effects.setMode(d,c.mode||"effect"),h=parseInt(c.percent,10)||(parseInt(c.percent,10)===0?0:(g==="hide"?0:100)),j=c.direction||"both",k=c.origin,e={height:d.height(),width:d.width(),outerHeight:d.outerHeight(),outerWidth:d.outerWidth()},i={y:j!=="horizontal"?(h/100):1,x:j!=="vertical"?(h/100):1};l.effect="size";l.queue=false;l.complete=f;if(g!=="effect"){l.origin=k||["middle","center"];l.restore=true}l.from=c.from||(g==="show"?{height:0,width:0,outerHeight:0,outerWidth:0}:e);l.to={height:e.height*i.y,width:e.width*i.x,outerHeight:e.outerHeight*i.y,outerWidth:e.outerWidth*i.x};if(l.fade){if(g==="show"){l.from.opacity=0;l.to.opacity=1}if(g==="hide"){l.from.opacity=1;l.to.opacity=0}}d.effect(l)};a.effects.effect.size=function(l,k){var q,i,j,c=a(this),p=["position","top","bottom","left","right","width","height","overflow","opacity"],n=["position","top","bottom","left","right","overflow","opacity"],m=["width","height","overflow"],g=["fontSize"],s=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],d=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],h=a.effects.setMode(c,l.mode||"effect"),r=l.restore||h!=="effect",v=l.scale||"both",t=l.origin||["middle","center"],u=c.css("position"),e=r?p:n,f={height:0,width:0,outerHeight:0,outerWidth:0};if(h==="show"){c.show()}q={height:c.height(),width:c.width(),outerHeight:c.outerHeight(),outerWidth:c.outerWidth()};if(l.mode==="toggle"&&h==="show"){c.from=l.to||f;c.to=l.from||q}else{c.from=l.from||(h==="show"?f:q);c.to=l.to||(h==="hide"?f:q)}j={from:{y:c.from.height/q.height,x:c.from.width/q.width},to:{y:c.to.height/q.height,x:c.to.width/q.width}};if(v==="box"||v==="both"){if(j.from.y!==j.to.y){e=e.concat(s);c.from=a.effects.setTransition(c,s,j.from.y,c.from);c.to=a.effects.setTransition(c,s,j.to.y,c.to)}if(j.from.x!==j.to.x){e=e.concat(d);c.from=a.effects.setTransition(c,d,j.from.x,c.from);c.to=a.effects.setTransition(c,d,j.to.x,c.to)}}if(v==="content"||v==="both"){if(j.from.y!==j.to.y){e=e.concat(g).concat(m);c.from=a.effects.setTransition(c,g,j.from.y,c.from);c.to=a.effects.setTransition(c,g,j.to.y,c.to)}}a.effects.save(c,e);c.show();a.effects.createWrapper(c);c.css("overflow","hidden").css(c.from);if(t){i=a.effects.getBaseline(t,q);c.from.top=(q.outerHeight-c.outerHeight())*i.y;c.from.left=(q.outerWidth-c.outerWidth())*i.x;c.to.top=(q.outerHeight-c.to.outerHeight)*i.y;c.to.left=(q.outerWidth-c.to.outerWidth)*i.x}c.css(c.from);if(v==="content"||v==="both"){s=s.concat(["marginTop","marginBottom"]).concat(g);d=d.concat(["marginLeft","marginRight"]);m=p.concat(s).concat(d);c.find("*[width]").each(function(){var w=a(this),o={height:w.height(),width:w.width(),outerHeight:w.outerHeight(),outerWidth:w.outerWidth()};if(r){a.effects.save(w,m)}w.from={height:o.height*j.from.y,width:o.width*j.from.x,outerHeight:o.outerHeight*j.from.y,outerWidth:o.outerWidth*j.from.x};w.to={height:o.height*j.to.y,width:o.width*j.to.x,outerHeight:o.height*j.to.y,outerWidth:o.width*j.to.x};if(j.from.y!==j.to.y){w.from=a.effects.setTransition(w,s,j.from.y,w.from);w.to=a.effects.setTransition(w,s,j.to.y,w.to)}if(j.from.x!==j.to.x){w.from=a.effects.setTransition(w,d,j.from.x,w.from);w.to=a.effects.setTransition(w,d,j.to.x,w.to)}w.css(w.from);w.animate(w.to,l.duration,l.easing,function(){if(r){a.effects.restore(w,m)}})})}c.animate(c.to,{queue:false,duration:l.duration,easing:l.easing,complete:function(){if(c.to.opacity===0){c.css("opacity",c.from.opacity)}if(h==="hide"){c.hide()}a.effects.restore(c,e);if(!r){if(u==="static"){c.css({position:"relative",top:c.to.top,left:c.to.left})}else{a.each(["top","left"],function(o,w){c.css(w,function(z,B){var A=parseInt(B,10),y=o?c.to.left:c.to.top;if(B==="auto"){return y+"px"}return A+y+"px"})})}}a.effects.removeWrapper(c);k()}})}})(jQuery);(function(a,b){a.effects.effect.shake=function(l,k){var c=a(this),d=["position","top","bottom","left","right","height","width"],j=a.effects.setMode(c,l.mode||"effect"),u=l.direction||"left",e=l.distance||20,h=l.times||3,v=h*2+1,q=Math.round(l.duration/v),g=(u==="up"||u==="down")?"top":"left",f=(u==="up"||u==="left"),t={},s={},r={},p,m=c.queue(),n=m.length;a.effects.save(c,d);c.show();a.effects.createWrapper(c);t[g]=(f?"-=":"+=")+e;s[g]=(f?"+=":"-=")+e*2;r[g]=(f?"-=":"+=")+e*2;c.animate(t,q,l.easing);for(p=1;p<h;p++){c.animate(s,q,l.easing).animate(r,q,l.easing)}c.animate(s,q,l.easing).animate(t,q/2,l.easing).queue(function(){if(j==="hide"){c.hide()}a.effects.restore(c,d);a.effects.removeWrapper(c);k()});if(n>1){m.splice.apply(m,[1,0].concat(m.splice(n,v+1)))}c.dequeue()}})(jQuery);(function(a,b){a.effects.effect.slide=function(e,i){var f=a(this),k=["position","top","bottom","left","right","width","height"],j=a.effects.setMode(f,e.mode||"show"),m=j==="show",l=e.direction||"left",g=(l==="up"||l==="down")?"top":"left",d=(l==="up"||l==="left"),c,h={};a.effects.save(f,k);f.show();c=e.distance||f[g==="top"?"outerHeight":"outerWidth"](true);a.effects.createWrapper(f).css({overflow:"hidden"});if(m){f.css(g,d?(isNaN(c)?"-"+c:-c):c)}h[g]=(m?(d?"+=":"-="):(d?"-=":"+="))+c;f.animate(h,{queue:false,duration:e.duration,easing:e.easing,complete:function(){if(j==="hide"){f.hide()}a.effects.restore(f,k);a.effects.removeWrapper(f);i()}})}})(jQuery);(function(a,b){a.effects.effect.transfer=function(d,h){var f=a(this),k=a(d.to),n=k.css("position")==="fixed",j=a("body"),l=n?j.scrollTop():0,m=n?j.scrollLeft():0,c=k.offset(),g={top:c.top-l,left:c.left-m,height:k.innerHeight(),width:k.innerWidth()},i=f.offset(),e=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(d.className).css({top:i.top-l,left:i.left-m,height:f.innerHeight(),width:f.innerWidth(),position:n?"fixed":"absolute"}).animate(g,d.duration,d.easing,function(){e.remove();h()})}})(jQuery);(function(b,c){var a=false;b.widget("http://jci.xiaozhustatic1.com/e19061101/ui.menu",{version:"1.9.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element;this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,b.proxy(function(d){if(this.options.disabled){d.preventDefault()}},this));if(this.options.disabled){this.element.addClass("ui-state-disabled").attr("aria-disabled","true")}this._on({"mousedown .ui-menu-item > a":function(d){d.preventDefault()},"click .ui-state-disabled > a":function(d){d.preventDefault()},"click .ui-menu-item:has(a)":function(d){var e=b(d.target).closest(".ui-menu-item");if(!a&&e.not(".ui-state-disabled").length){a=true;this.select(d);if(e.has(".ui-menu").length){this.expand(d)}else{if(!this.element.is(":focus")){this.element.trigger("focus",[true]);if(this.active&&this.active.parents(".ui-menu").length===1){clearTimeout(this.timer)}}}}},"mouseenter .ui-menu-item":function(d){var e=b(d.currentTarget);e.siblings().children(".ui-state-active").removeClass("ui-state-active");this.focus(d,e)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(f,d){var e=this.active||this.element.children(".ui-menu-item").eq(0);if(!d){this.focus(f,e)}},blur:function(d){this._delay(function(){if(!b.contains(this.element[0],this.document[0].activeElement)){this.collapseAll(d)}})},keydown:"_keydown"});this.refresh();this._on(this.document,{click:function(d){if(!b(d.target).closest(".ui-menu").length){this.collapseAll(d)}a=false}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var d=b(this);if(d.data("ui-menu-submenu-carat")){d.remove()}});this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(j){var e,i,k,h,g,d=true;function f(l){return l.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}switch(j.keyCode){case b.ui.keyCode.PAGE_UP:this.previousPage(j);break;case b.ui.keyCode.PAGE_DOWN:this.nextPage(j);break;case b.ui.keyCode.HOME:this._move("first","first",j);break;case b.ui.keyCode.END:this._move("last","last",j);break;case b.ui.keyCode.UP:this.previous(j);break;case b.ui.keyCode.DOWN:this.next(j);break;case b.ui.keyCode.LEFT:this.collapse(j);break;case b.ui.keyCode.RIGHT:if(this.active&&!this.active.is(".ui-state-disabled")){this.expand(j)}break;case b.ui.keyCode.ENTER:case b.ui.keyCode.SPACE:this._activate(j);break;case b.ui.keyCode.ESCAPE:this.collapse(j);break;default:d=false;i=this.previousFilter||"";k=String.fromCharCode(j.keyCode);h=false;clearTimeout(this.filterTimer);if(k===i){h=true}else{k=i+k}g=new RegExp("^"+f(k),"i");e=this.activeMenu.children(".ui-menu-item").filter(function(){return g.test(b(this).children("a").text())});e=h&&e.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):e;if(!e.length){k=String.fromCharCode(j.keyCode);g=new RegExp("^"+f(k),"i");e=this.activeMenu.children(".ui-menu-item").filter(function(){return g.test(b(this).children("a").text())})}if(e.length){this.focus(j,e);if(e.length>1){this.previousFilter=k;this.filterTimer=this._delay(function(){delete this.previousFilter},1000)}else{delete this.previousFilter}}else{delete this.previousFilter}}if(d){j.preventDefault()}},_activate:function(d){if(!this.active.is(".ui-state-disabled")){if(this.active.children("a[aria-haspopup='true']").length){this.expand(d)}else{this.select(d)}}},refresh:function(){var f,e=this.options.icons.submenu,d=this.element.find(this.options.menus);d.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var i=b(this),h=i.prev("a"),g=b("<span>").addClass("ui-menu-icon ui-icon "+e).data("ui-menu-submenu-carat",true);h.attr("aria-haspopup","true").prepend(g);i.attr("aria-labelledby",h.attr("id"))});f=d.add(this.element);f.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()});f.children(":not(.ui-menu-item)").each(function(){var g=b(this);if(!/[^\-—–\s]/.test(g.text())){g.addClass("ui-widget-content ui-menu-divider")}});f.children(".ui-state-disabled").attr("aria-disabled","true");if(this.active&&!b.contains(this.element[0],this.active[0])){this.blur()}},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},focus:function(e,d){var g,f;this.blur(e,e&&e.type==="focus");this._scrollIntoView(d);this.active=d.first();f=this.active.children("a").addClass("ui-state-focus");if(this.options.role){this.element.attr("aria-activedescendant",f.attr("id"))}this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");if(e&&e.type==="keydown"){this._close()}else{this.timer=this._delay(function(){this._close()},this.delay)}g=d.children(".ui-menu");if(g.length&&(/^mouse/.test(e.type))){this._startOpening(g)}this.activeMenu=d.parent();this._trigger("focus",e,{item:d})},_scrollIntoView:function(g){var j,f,h,d,e,i;if(this._hasScroll()){j=parseFloat(b.css(this.activeMenu[0],"borderTopWidth"))||0;f=parseFloat(b.css(this.activeMenu[0],"paddingTop"))||0;h=g.offset().top-this.activeMenu.offset().top-j-f;d=this.activeMenu.scrollTop();e=this.activeMenu.height();i=g.height();if(h<0){this.activeMenu.scrollTop(d+h)}else{if(h+i>e){this.activeMenu.scrollTop(d+h-e+i)}}}},blur:function(e,d){if(!d){clearTimeout(this.timer)}if(!this.active){return}this.active.children("a").removeClass("ui-state-focus");this.active=null;this._trigger("blur",e,{item:this.active})},_startOpening:function(d){clearTimeout(this.timer);if(d.attr("aria-hidden")!=="true"){return}this.timer=this._delay(function(){this._close();this._open(d)},this.delay)},_open:function(e){var d=b.extend({of:this.active},this.options.position);clearTimeout(this.timer);this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true");e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(d)},collapseAll:function(e,d){clearTimeout(this.timer);this.timer=this._delay(function(){var f=d?this.element:b(e&&e.target).closest(this.element.find(".ui-menu"));if(!f.length){f=this.element}this._close(f);this.blur(e);this.activeMenu=f},this.delay)},_close:function(d){if(!d){d=this.active?this.active.parent():this.element}d.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var d=this.active&&this.active.parent().closest(".ui-menu-item",this.element);if(d&&d.length){this._close();this.focus(e,d)}},expand:function(e){var d=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();if(d&&d.length){this._open(d.parent());this._delay(function(){this.focus(e,d)})}},next:function(d){this._move("next","first",d)},previous:function(d){this._move("prev","last",d)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(g,e,f){var d;if(this.active){if(g==="first"||g==="last"){d=this.active[g==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1)}else{d=this.active[g+"All"](".ui-menu-item").eq(0)}}if(!d||!d.length||!this.active){d=this.activeMenu.children(".ui-menu-item")[e]()}this.focus(f,d)},nextPage:function(f){var e,g,d;if(!this.active){this.next(f);return}if(this.isLastItem()){return}if(this._hasScroll()){g=this.active.offset().top;d=this.element.height();this.active.nextAll(".ui-menu-item").each(function(){e=b(this);return e.offset().top-g-d<0});this.focus(f,e)}else{this.focus(f,this.activeMenu.children(".ui-menu-item")[!this.active?"first":"last"]())}},previousPage:function(f){var e,g,d;if(!this.active){this.next(f);return}if(this.isFirstItem()){return}if(this._hasScroll()){g=this.active.offset().top;d=this.element.height();this.active.prevAll(".ui-menu-item").each(function(){e=b(this);return e.offset().top-g+d>0});this.focus(f,e)}else{this.focus(f,this.activeMenu.children(".ui-menu-item").first())}},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(d){this.active=this.active||b(d.target).closest(".ui-menu-item");var e={item:this.active};if(!this.active.has(".ui-menu").length){this.collapseAll(d,true)}this._trigger("select",d,e)}})}(jQuery));(function(e,c){e.ui=e.ui||{};var i,j=Math.max,n=Math.abs,l=Math.round,d=/left|center|right/,g=/top|center|bottom/,a=/[\+\-]\d+%?/,k=/^\w+/,b=/%$/,f=e.fn.position;function m(q,p,o){return[parseInt(q[0],10)*(b.test(q[0])?p/100:1),parseInt(q[1],10)*(b.test(q[1])?o/100:1)]}function h(o,p){return parseInt(e.css(o,p),10)||0}e.position={scrollbarWidth:function(){if(i!==c){return i}var p,o,r=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),q=r.children()[0];e("body").append(r);p=q.offsetWidth;r.css("overflow","scroll");o=q.offsetWidth;if(p===o){o=r[0].clientWidth}r.remove();return(i=p-o)},getScrollInfo:function(s){var r=s.isWindow?"":s.element.css("overflow-x"),q=s.isWindow?"":s.element.css("overflow-y"),p=r==="scroll"||(r==="auto"&&s.width<s.element[0].scrollWidth),o=q==="scroll"||(q==="auto"&&s.height<s.element[0].scrollHeight);return{width:p?e.position.scrollbarWidth():0,height:o?e.position.scrollbarWidth():0}},getWithinInfo:function(p){var q=e(p||window),o=e.isWindow(q[0]);return{element:q,isWindow:o,offset:q.offset()||{left:0,top:0},scrollLeft:q.scrollLeft(),scrollTop:q.scrollTop(),width:o?q.width():q.outerWidth(),height:o?q.height():q.outerHeight()}}};e.fn.position=function(z){if(!z||!z.of){return f.apply(this,arguments)}z=e.extend({},z);var A,v,s,y,r,u=e(z.of),q=e.position.getWithinInfo(z.within),o=e.position.getScrollInfo(q),t=u[0],w=(z.collision||"flip").split(" "),p={};if(t.nodeType===9){v=u.width();s=u.height();y={top:0,left:0}}else{if(e.isWindow(t)){v=u.width();s=u.height();y={top:u.scrollTop(),left:u.scrollLeft()}}else{if(t.preventDefault){z.at="left top";v=s=0;y={top:t.pageY,left:t.pageX}}else{v=u.outerWidth();s=u.outerHeight();y=u.offset()}}}r=e.extend({},y);e.each(["my","at"],function(){var D=(z[this]||"").split(" "),C,B;if(D.length===1){D=d.test(D[0])?D.concat(["center"]):g.test(D[0])?["center"].concat(D):["center","center"]}D[0]=d.test(D[0])?D[0]:"center";D[1]=g.test(D[1])?D[1]:"center";C=a.exec(D[0]);B=a.exec(D[1]);p[this]=[C?C[0]:0,B?B[0]:0];z[this]=[k.exec(D[0])[0],k.exec(D[1])[0]]});if(w.length===1){w[1]=w[0]}if(z.at[0]==="right"){r.left+=v}else{if(z.at[0]==="center"){r.left+=v/2}}if(z.at[1]==="bottom"){r.top+=s}else{if(z.at[1]==="center"){r.top+=s/2}}A=m(p.at,v,s);r.left+=A[0];r.top+=A[1];return this.each(function(){var C,L,E=e(this),G=E.outerWidth(),D=E.outerHeight(),F=h(this,"marginLeft"),B=h(this,"marginTop"),K=G+F+h(this,"marginRight")+o.width,J=D+B+h(this,"marginBottom")+o.height,H=e.extend({},r),I=m(p.my,E.outerWidth(),E.outerHeight());if(z.my[0]==="right"){H.left-=G}else{if(z.my[0]==="center"){H.left-=G/2}}if(z.my[1]==="bottom"){H.top-=D}else{if(z.my[1]==="center"){H.top-=D/2}}H.left+=I[0];H.top+=I[1];if(!e.support.offsetFractions){H.left=l(H.left);H.top=l(H.top)}C={marginLeft:F,marginTop:B};e.each(["left","top"],function(N,M){if(e.ui.position[w[N]]){e.ui.position[w[N]][M](H,{targetWidth:v,targetHeight:s,elemWidth:G,elemHeight:D,collisionPosition:C,collisionWidth:K,collisionHeight:J,offset:[A[0]+I[0],A[1]+I[1]],my:z.my,at:z.at,within:q,elem:E})}});if(e.fn.bgiframe){E.bgiframe()}if(z.using){L=function(P){var R=y.left-H.left,O=R+v-G,Q=y.top-H.top,N=Q+s-D,M={target:{element:u,left:y.left,top:y.top,width:v,height:s},element:{element:E,left:H.left,top:H.top,width:G,height:D},horizontal:O<0?"left":R>0?"right":"center",vertical:N<0?"top":Q>0?"bottom":"middle"};if(v<G&&n(R+O)<v){M.horizontal="center"}if(s<D&&n(Q+N)<s){M.vertical="middle"}if(j(n(R),n(O))>j(n(Q),n(N))){M.important="horizontal"}else{M.important="vertical"}z.using.call(this,P,M)}}E.offset(e.extend(H,{using:L}))})};e.ui.position={fit:{left:function(s,r){var q=r.within,u=q.isWindow?q.scrollLeft:q.offset.left,w=q.width,t=s.left-r.collisionPosition.marginLeft,v=u-t,p=t+r.collisionWidth-w-u,o;if(r.collisionWidth>w){if(v>0&&p<=0){o=s.left+v+r.collisionWidth-w-u;s.left+=v-o}else{if(p>0&&v<=0){s.left=u}else{if(v>p){s.left=u+w-r.collisionWidth}else{s.left=u}}}}else{if(v>0){s.left+=v}else{if(p>0){s.left-=p}else{s.left=j(s.left-t,s.left)}}}},top:function(r,q){var p=q.within,v=p.isWindow?p.scrollTop:p.offset.top,w=q.within.height,t=r.top-q.collisionPosition.marginTop,u=v-t,s=t+q.collisionHeight-w-v,o;if(q.collisionHeight>w){if(u>0&&s<=0){o=r.top+u+q.collisionHeight-w-v;r.top+=u-o}else{if(s>0&&u<=0){r.top=v}else{if(u>s){r.top=v+w-q.collisionHeight}else{r.top=v}}}}else{if(u>0){r.top+=u}else{if(s>0){r.top-=s}else{r.top=j(r.top-t,r.top)}}}}},flip:{left:function(u,t){var s=t.within,z=s.offset.left+s.scrollLeft,C=s.width,q=s.isWindow?s.scrollLeft:s.offset.left,v=u.left-t.collisionPosition.marginLeft,A=v-q,p=v+t.collisionWidth-C-q,y=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,B=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,r=-2*t.offset[0],o,w;if(A<0){o=u.left+y+B+r+t.collisionWidth-C-z;if(o<0||o<n(A)){u.left+=y+B+r}}else{if(p>0){w=u.left-t.collisionPosition.marginLeft+y+B+r-q;if(w>0||n(w)<p){u.left+=y+B+r}}}},top:function(t,s){var r=s.within,B=r.offset.top+r.scrollTop,C=r.height,o=r.isWindow?r.scrollTop:r.offset.top,v=t.top-s.collisionPosition.marginTop,y=v-o,u=v+s.collisionHeight-C-o,z=s.my[1]==="top",w=z?-s.elemHeight:s.my[1]==="bottom"?s.elemHeight:0,D=s.at[1]==="top"?s.targetHeight:s.at[1]==="bottom"?-s.targetHeight:0,q=-2*s.offset[1],A,p;if(y<0){p=t.top+w+D+q+s.collisionHeight-C-B;if((t.top+w+D+q)>y&&(p<0||p<n(y))){t.top+=w+D+q}}else{if(u>0){A=t.top-s.collisionPosition.marginTop+w+D+q-o;if((t.top+w+D+q)>u&&(A>0||n(A)<u)){t.top+=w+D+q}}}}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments);e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments);e.ui.position.fit.top.apply(this,arguments)}}};(function(){var s,u,p,r,q,o=document.getElementsByTagName("body")[0],t=document.createElement("div");s=document.createElement(o?"div":"body");p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(o){e.extend(p,{position:"absolute",left:"-1000px",top:"-1000px"})}for(q in p){s.style[q]=p[q]}s.appendChild(t);u=o||document.documentElement;u.insertBefore(s,u.firstChild);t.style.cssText="position: absolute; left: 10.7432222px;";r=e(t).offset().left;e.support.offsetFractions=r>10&&r<11;s.innerHTML="";u.removeChild(s)})();if(e.uiBackCompat!==false){(function(p){var o=p.fn.position;p.fn.position=function(r){if(!r||!r.offset){return o.call(this,r)}var s=r.offset.split(" "),q=r.at.split(" ");if(s.length===1){s[1]=s[0]}if(/^\d/.test(s[0])){s[0]="+"+s[0]}if(/^\d/.test(s[1])){s[1]="+"+s[1]}if(q.length===1){if(/left|center|right/.test(q[0])){q[1]="center"}else{q[1]=q[0];q[0]="center"}}return o.call(this,p.extend(r,{at:q[0]+s[0]+" "+q[1]+s[1],offset:c}))}}(jQuery))}}(jQuery));(function(a,b){a.widget("ui.progressbar",{version:"1.9.2",options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");this.valueDiv.remove()},value:function(c){if(c===b){return this._value()}this._setOption("value",c);return this},_setOption:function(c,d){if(c==="value"){this.options.value=d;this._refreshValue();if(this._value()===this.options.max){this._trigger("complete")}}this._super(c,d)},_value:function(){var c=this.options.value;if(typeof c!=="number"){c=0}return Math.min(this.options.max,Math.max(this.min,c))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var d=this.value(),c=this._percentage();if(this.oldValue!==d){this.oldValue=d;this._trigger("change")}this.valueDiv.toggle(d>this.min).toggleClass("ui-corner-right",d===this.options.max).width(c.toFixed(0)+"%");this.element.attr("aria-valuenow",d)}})})(jQuery);(function(b,c){var a=5;b.widget("ui.slider",b.ui.mouse,{version:"1.9.2",widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var f,d,j=this.options,h=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),g="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",e=[];this._keySliding=false;this._mouseSliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(j.disabled?" ui-slider-disabled ui-disabled":""));this.range=b([]);if(j.range){if(j.range===true){if(!j.values){j.values=[this._valueMin(),this._valueMin()]}if(j.values.length&&j.values.length!==2){j.values=[j.values[0],j.values[0]]}}this.range=b("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+((j.range==="min"||j.range==="max")?" ui-slider-range-"+j.range:""))}d=(j.values&&j.values.length)||1;for(f=h.length;f<d;f++){e.push(g)}this.handles=h.add(b(e.join("")).appendTo(this.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(i){i.preventDefault()}).mouseenter(function(){if(!j.disabled){b(this).addClass("ui-state-hover")}}).mouseleave(function(){b(this).removeClass("ui-state-hover")}).focus(function(){if(!j.disabled){b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");b(this).addClass("ui-state-focus")}else{b(this).blur()}}).blur(function(){b(this).removeClass("ui-state-focus")});this.handles.each(function(k){b(this).data("ui-slider-handle-index",k)});this._on(this.handles,{keydown:function(n){var o,l,k,m,i=b(n.target).data("ui-slider-handle-index");switch(n.keyCode){case b.ui.keyCode.HOME:case b.ui.keyCode.END:case b.ui.keyCode.PAGE_UP:case b.ui.keyCode.PAGE_DOWN:case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:n.preventDefault();if(!this._keySliding){this._keySliding=true;b(n.target).addClass("ui-state-active");o=this._start(n,i);if(o===false){return}}break}m=this.options.step;if(this.options.values&&this.options.values.length){l=k=this.values(i)}else{l=k=this.value()}switch(n.keyCode){case b.ui.keyCode.HOME:k=this._valueMin();break;case b.ui.keyCode.END:k=this._valueMax();break;case b.ui.keyCode.PAGE_UP:k=this._trimAlignValue(l+((this._valueMax()-this._valueMin())/a));break;case b.ui.keyCode.PAGE_DOWN:k=this._trimAlignValue(l-((this._valueMax()-this._valueMin())/a));break;case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:if(l===this._valueMax()){return}k=this._trimAlignValue(l+m);break;case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:if(l===this._valueMin()){return}k=this._trimAlignValue(l-m);break}this._slide(n,i,k)},keyup:function(k){var i=b(k.target).data("ui-slider-handle-index");if(this._keySliding){this._keySliding=false;this._stop(k,i);this._change(k,i);b(k.target).removeClass("ui-state-active")}}});this._refreshValue();this._animateOff=false},_destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all");this._mouseDestroy()},_mouseCapture:function(f){var j,m,e,h,l,n,i,d,k=this,g=this.options;if(g.disabled){return false}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();j={x:f.pageX,y:f.pageY};m=this._normValueFromMouse(j);e=this._valueMax()-this._valueMin()+1;this.handles.each(function(o){var p=Math.abs(m-k.values(o));if(e>p){e=p;h=b(this);l=o}});if(g.range===true&&this.values(1)===g.min){l+=1;h=b(this.handles[l])}n=this._start(f,l);if(n===false){return false}this._mouseSliding=true;this._handleIndex=l;h.addClass("ui-state-active").focus();i=h.offset();d=!b(f.target).parents().andSelf().is(".ui-slider-handle");this._clickOffset=d?{left:0,top:0}:{left:f.pageX-i.left-(h.width()/2),top:f.pageY-i.top-(h.height()/2)-(parseInt(h.css("borderTopWidth"),10)||0)-(parseInt(h.css("borderBottomWidth"),10)||0)+(parseInt(h.css("marginTop"),10)||0)};if(!this.handles.hasClass("ui-state-hover")){this._slide(f,l,m)}this._animateOff=true;return true},_mouseStart:function(){return true},_mouseDrag:function(f){var d={x:f.pageX,y:f.pageY},e=this._normValueFromMouse(d);this._slide(f,this._handleIndex,e);return false},_mouseStop:function(d){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(d,this._handleIndex);this._change(d,this._handleIndex);this._handleIndex=null;this._clickOffset=null;this._animateOff=false;return false},_detectOrientation:function(){this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal"},_normValueFromMouse:function(e){var d,h,g,f,i;if(this.orientation==="horizontal"){d=this.elementSize.width;h=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{d=this.elementSize.height;h=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}g=(h/d);if(g>1){g=1}if(g<0){g=0}if(this.orientation==="vertical"){g=1-g}f=this._valueMax()-this._valueMin();i=this._valueMin()+g*f;return this._trimAlignValue(i)},_start:function(f,e){var d={handle:this.handles[e],value:this.value()};if(this.options.values&&this.options.values.length){d.value=this.values(e);d.values=this.values()}return this._trigger("start",f,d)},_slide:function(h,g,f){var d,e,i;if(this.options.values&&this.options.values.length){d=this.values(g?0:1);if((this.options.values.length===2&&this.options.range===true)&&((g===0&&f>d)||(g===1&&f<d))){f=d}if(f!==this.values(g)){e=this.values();e[g]=f;i=this._trigger("slide",h,{handle:this.handles[g],value:f,values:e});d=this.values(g?0:1);if(i!==false){this.values(g,f,true)}}}else{if(f!==this.value()){i=this._trigger("slide",h,{handle:this.handles[g],value:f});if(i!==false){this.value(f)}}}},_stop:function(f,e){var d={handle:this.handles[e],value:this.value()};if(this.options.values&&this.options.values.length){d.value=this.values(e);d.values=this.values()}this._trigger("stop",f,d)},_change:function(f,e){if(!this._keySliding&&!this._mouseSliding){var d={handle:this.handles[e],value:this.value()};if(this.options.values&&this.options.values.length){d.value=this.values(e);d.values=this.values()}this._trigger("change",f,d)}},value:function(d){if(arguments.length){this.options.value=this._trimAlignValue(d);this._refreshValue();this._change(null,0);return}return this._value()},values:function(e,h){var g,d,f;if(arguments.length>1){this.options.values[e]=this._trimAlignValue(h);this._refreshValue();this._change(null,e);return}if(arguments.length){if(b.isArray(arguments[0])){g=this.options.values;d=arguments[0];for(f=0;f<g.length;f+=1){g[f]=this._trimAlignValue(d[f]);this._change(null,f)}this._refreshValue()}else{if(this.options.values&&this.options.values.length){return this._values(e)}else{return this.value()}}}else{return this._values()}},_setOption:function(e,f){var d,g=0;if(b.isArray(this.options.values)){g=this.options.values.length}b.Widget.prototype._setOption.apply(this,arguments);switch(e){case"disabled":if(f){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.prop("disabled",true);this.element.addClass("ui-disabled")}else{this.handles.prop("disabled",false);this.element.removeClass("ui-disabled")}break;case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case"value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case"values":this._animateOff=true;this._refreshValue();for(d=0;d<g;d+=1){this._change(null,d)}this._animateOff=false;break;case"min":case"max":this._animateOff=true;this._refreshValue();this._animateOff=false;break}},_value:function(){var d=this.options.value;d=this._trimAlignValue(d);return d},_values:function(d){var g,f,e;if(arguments.length){g=this.options.values[d];g=this._trimAlignValue(g);return g}else{f=this.options.values.slice();for(e=0;e<f.length;e+=1){f[e]=this._trimAlignValue(f[e])}return f}},_trimAlignValue:function(g){if(g<=this._valueMin()){return this._valueMin()}if(g>=this._valueMax()){return this._valueMax()}var d=(this.options.step>0)?this.options.step:1,f=(g-this._valueMin())%d,e=g-f;if(Math.abs(f)*2>=d){e+=(f>0)?d:(-d)}return parseFloat(e.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var i,h,l,j,m,g=this.options.range,f=this.options,k=this,e=(!this._animateOff)?f.animate:false,d={};if(this.options.values&&this.options.values.length){this.handles.each(function(n){h=(k.values(n)-k._valueMin())/(k._valueMax()-k._valueMin())*100;d[k.orientation==="horizontal"?"left":"bottom"]=h+"%";b(this).stop(1,1)[e?"animate":"css"](d,f.animate);if(k.options.range===true){if(k.orientation==="horizontal"){if(n===0){k.range.stop(1,1)[e?"animate":"css"]({left:h+"%"},f.animate)}if(n===1){k.range[e?"animate":"css"]({width:(h-i)+"%"},{queue:false,duration:f.animate})}}else{if(n===0){k.range.stop(1,1)[e?"animate":"css"]({bottom:(h)+"%"},f.animate)}if(n===1){k.range[e?"animate":"css"]({height:(h-i)+"%"},{queue:false,duration:f.animate})}}}i=h})}else{l=this.value();j=this._valueMin();m=this._valueMax();h=(m!==j)?(l-j)/(m-j)*100:0;d[this.orientation==="horizontal"?"left":"bottom"]=h+"%";this.handle.stop(1,1)[e?"animate":"css"](d,f.animate);if(g==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[e?"animate":"css"]({width:h+"%"},f.animate)}if(g==="max"&&this.orientation==="horizontal"){this.range[e?"animate":"css"]({width:(100-h)+"%"},{queue:false,duration:f.animate})}if(g==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[e?"animate":"css"]({height:h+"%"},f.animate)}if(g==="max"&&this.orientation==="vertical"){this.range[e?"animate":"css"]({height:(100-h)+"%"},{queue:false,duration:f.animate})}}}})}(jQuery));(function(b){function a(c){return function(){var d=this.element.val();c.apply(this,arguments);this._refresh();if(d!==this.element.val()){this._trigger("change")}}}b.widget("ui.spinner",{version:"1.9.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:true,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max);this._setOption("min",this.options.min);this._setOption("step",this.options.step);this._value(this.element.val(),true);this._draw();this._on(this._events);this._refresh();this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var c={},d=this.element;b.each(["min","max","step"],function(e,f){var g=d.attr(f);if(g!==undefined&&g.length){c[f]=g}});return c},_events:{keydown:function(c){if(this._start(c)&&this._keydown(c)){c.preventDefault()}},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(c){if(this.cancelBlur){delete this.cancelBlur;return}this._refresh();if(this.previous!==this.element.val()){this._trigger("change",c)}},mousewheel:function(c,d){if(!d){return}if(!this.spinning&&!this._start(c)){return false}this._spin((d>0?1:-1)*this.options.step,c);clearTimeout(this.mousewheelTimer);this.mousewheelTimer=this._delay(function(){if(this.spinning){this._stop(c)}},100);c.preventDefault()},"mousedown .ui-spinner-button":function(d){var c;c=this.element[0]===this.document[0].activeElement?this.previous:this.element.val();function e(){var f=this.element[0]===this.document[0].activeElement;if(!f){this.element.focus();this.previous=c;this._delay(function(){this.previous=c})}}d.preventDefault();e.call(this);this.cancelBlur=true;this._delay(function(){delete this.cancelBlur;e.call(this)});if(this._start(d)===false){return}this._repeat(null,b(d.currentTarget).hasClass("ui-spinner-up")?1:-1,d)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(c){if(!b(c.currentTarget).hasClass("ui-state-active")){return}if(this._start(c)===false){return false}this._repeat(null,b(c.currentTarget).hasClass("ui-spinner-up")?1:-1,c)},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var c=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton");this.buttons=c.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all");if(this.buttons.height()>Math.ceil(c.height()*0.5)&&c.height()>0){c.height(c.height())}if(this.options.disabled){this.disable()}},_keydown:function(d){var c=this.options,e=b.ui.keyCode;switch(d.keyCode){case e.UP:this._repeat(null,1,d);return true;case e.DOWN:this._repeat(null,-1,d);return true;case e.PAGE_UP:this._repeat(null,c.page,d);return true;case e.PAGE_DOWN:this._repeat(null,-c.page,d);return true}return false},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon "+this.options.icons.down+"'>&#9660;</span></a>"},_start:function(c){if(!this.spinning&&this._trigger("start",c)===false){return false}if(!this.counter){this.counter=1}this.spinning=true;return true},_repeat:function(d,c,e){d=d||500;clearTimeout(this.timer);this.timer=this._delay(function(){this._repeat(40,c,e)},d);this._spin(c*this.options.step,e)},_spin:function(d,c){var e=this.value()||0;if(!this.counter){this.counter=1}e=this._adjustValue(e+d*this._increment(this.counter));if(!this.spinning||this._trigger("spin",c,{value:e})!==false){this._value(e);this.counter++}},_increment:function(c){var d=this.options.incremental;if(d){return b.isFunction(d)?d(c):Math.floor(c*c*c/50000-c*c/500+17*c/200+1)}return 1},_precision:function(){var c=this._precisionOf(this.options.step);if(this.options.min!==null){c=Math.max(c,this._precisionOf(this.options.min))}return c},_precisionOf:function(d){var e=d.toString(),c=e.indexOf(".");return c===-1?0:e.length-c-1},_adjustValue:function(e){var d,f,c=this.options;d=c.min!==null?c.min:0;f=e-d;f=Math.round(f/c.step)*c.step;e=d+f;e=parseFloat(e.toFixed(this._precision()));if(c.max!==null&&e>c.max){return c.max}if(c.min!==null&&e<c.min){return c.min}return e},_stop:function(c){if(!this.spinning){return}clearTimeout(this.timer);clearTimeout(this.mousewheelTimer);this.counter=0;this.spinning=false;this._trigger("stop",c)},_setOption:function(c,d){if(c==="culture"||c==="numberFormat"){var e=this._parse(this.element.val());this.options[c]=d;this.element.val(this._format(e));return}if(c==="max"||c==="min"||c==="step"){if(typeof d==="string"){d=this._parse(d)}}this._super(c,d);if(c==="disabled"){if(d){this.element.prop("disabled",true);this.buttons.button("disable")}else{this.element.prop("disabled",false);this.buttons.button("enable")}}},_setOptions:a(function(c){this._super(c);this._value(this.element.val())}),_parse:function(c){if(typeof c==="string"&&c!==""){c=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(c,10,this.options.culture):+c}return c===""||isNaN(c)?null:c},_format:function(c){if(c===""){return""}return window.Globalize&&this.options.numberFormat?Globalize.format(c,this.options.numberFormat,this.options.culture):c},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(e,c){var d;if(e!==""){d=this._parse(e);if(d!==null){if(!c){d=this._adjustValue(d)}e=this._format(d)}}this.element.val(e);this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");this.uiSpinner.replaceWith(this.element)},stepUp:a(function(c){this._stepUp(c)}),_stepUp:function(c){this._spin((c||1)*this.options.step)},stepDown:a(function(c){this._stepDown(c)}),_stepDown:function(c){this._spin((c||1)*-this.options.step)},pageUp:a(function(c){this._stepUp((c||1)*this.options.page)}),pageDown:a(function(c){this._stepDown((c||1)*this.options.page)}),value:function(c){if(!arguments.length){return this._parse(this.element.val())}a(this._value).call(this,c)},widget:function(){return this.uiSpinner}})}(jQuery));(function(c,e){var a=0,f=/#.*$/;function d(){return ++a}function b(g){return g.hash.length>1&&g.href.replace(f,"")===location.href.replace(f,"").replace(/\s/g,"%20")}c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",{version:"1.9.2",delay:300,options:{active:null,collapsible:false,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var h=this,g=this.options,i=g.active,j=location.hash.substring(1);this.running=false;this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",g.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(k){if(c(this).is(".ui-state-disabled")){k.preventDefault()}}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){if(c(this).closest("li").is(".ui-state-disabled")){this.blur()}});this._processTabs();if(i===null){if(j){this.tabs.each(function(k,l){if(c(l).attr("aria-controls")===j){i=k;return false}})}if(i===null){i=this.tabs.index(this.tabs.filter(".ui-tabs-active"))}if(i===null||i===-1){i=this.tabs.length?0:false}}if(i!==false){i=this.tabs.index(this.tabs.eq(i));if(i===-1){i=g.collapsible?false:0}}g.active=i;if(!g.collapsible&&g.active===false&&this.anchors.length){g.active=0}if(c.isArray(g.disabled)){g.disabled=c.unique(g.disabled.concat(c.map(this.tabs.filter(".ui-state-disabled"),function(k){return h.tabs.index(k)}))).sort()}if(this.options.active!==false&&this.anchors.length){this.active=this._findActive(this.options.active)}else{this.active=c()}this._refresh();if(this.active.length){this.load(g.active)}},_getCreateEventData:function(){return{tab:this.active,panel:!this.active.length?c():this._getPanelForTab(this.active)}},_tabKeydown:function(i){var h=c(this.document[0].activeElement).closest("li"),g=this.tabs.index(h),j=true;if(this._handlePageNav(i)){return}switch(i.keyCode){case c.ui.keyCode.RIGHT:case c.ui.keyCode.DOWN:g++;break;case c.ui.keyCode.UP:case c.ui.keyCode.LEFT:j=false;g--;break;case c.ui.keyCode.END:g=this.anchors.length-1;break;case c.ui.keyCode.HOME:g=0;break;case c.ui.keyCode.SPACE:i.preventDefault();clearTimeout(this.activating);this._activate(g);return;case c.ui.keyCode.ENTER:i.preventDefault();clearTimeout(this.activating);this._activate(g===this.options.active?false:g);return;default:return}i.preventDefault();clearTimeout(this.activating);g=this._focusNextTab(g,j);if(!i.ctrlKey){h.attr("aria-selected","false");this.tabs.eq(g).attr("aria-selected","true");this.activating=this._delay(function(){this.option("active",g)},this.delay)}},_panelKeydown:function(g){if(this._handlePageNav(g)){return}if(g.ctrlKey&&g.keyCode===c.ui.keyCode.UP){g.preventDefault();this.active.focus()}},_handlePageNav:function(g){if(g.altKey&&g.keyCode===c.ui.keyCode.PAGE_UP){this._activate(this._focusNextTab(this.options.active-1,false));return true}if(g.altKey&&g.keyCode===c.ui.keyCode.PAGE_DOWN){this._activate(this._focusNextTab(this.options.active+1,true));return true}},_findNextTab:function(h,i){var g=this.tabs.length-1;function j(){if(h>g){h=0}if(h<0){h=g}return h}while(c.inArray(j(),this.options.disabled)!==-1){h=i?h+1:h-1}return h},_focusNextTab:function(g,h){g=this._findNextTab(g,h);this.tabs.eq(g).focus();return g},_setOption:function(g,h){if(g==="active"){this._activate(h);return}if(g==="disabled"){this._setupDisabled(h);return}this._super(g,h);if(g==="collapsible"){this.element.toggleClass("ui-tabs-collapsible",h);if(!h&&this.options.active===false){this._activate(0)}}if(g==="event"){this._setupEvents(h)}if(g==="heightStyle"){this._setupHeightStyle(h)}},_tabId:function(g){return g.attr("aria-controls")||"ui-tabs-"+d()},_sanitizeSelector:function(g){return g?g.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var h=this.options,g=this.tablist.children(":has(a[href])");h.disabled=c.map(g.filter(".ui-state-disabled"),function(i){return g.index(i)});this._processTabs();if(h.active===false||!this.anchors.length){h.active=false;this.active=c()}else{if(this.active.length&&!c.contains(this.tablist[0],this.active[0])){if(this.tabs.length===h.disabled.length){h.active=false;this.active=c()}else{this._activate(this._findNextTab(Math.max(0,h.active-1),false))}}else{h.active=this.tabs.index(this.active)}}this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled);this._setupEvents(this.options.event);this._setupHeightStyle(this.options.heightStyle);this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1});this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"});if(!this.active.length){this.tabs.eq(0).attr("tabIndex",0)}else{this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0});this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})}},_processTabs:function(){var g=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist");this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1});this.anchors=this.tabs.map(function(){return c("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1});this.panels=c();this.anchors.each(function(n,l){var h,j,m,k=c(l).uniqueId().attr("id"),o=c(l).closest("li"),p=o.attr("aria-controls");if(b(l)){h=l.hash;j=g.element.find(g._sanitizeSelector(h))}else{m=g._tabId(o);h="#"+m;j=g.element.find(h);if(!j.length){j=g._createPanel(m);j.insertAfter(g.panels[n-1]||g.tablist)}j.attr("aria-live","polite")}if(j.length){g.panels=g.panels.add(j)}if(p){o.data("ui-tabs-aria-controls",p)}o.attr({"aria-controls":h.substring(1),"aria-labelledby":k});j.attr("aria-labelledby",k)});this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(g){return c("<div>").attr("id",g).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",true)},_setupDisabled:function(j){if(c.isArray(j)){if(!j.length){j=false}else{if(j.length===this.anchors.length){j=true}}}for(var h=0,g;(g=this.tabs[h]);h++){if(j===true||c.inArray(h,j)!==-1){c(g).addClass("ui-state-disabled").attr("aria-disabled","true")}else{c(g).removeClass("ui-state-disabled").removeAttr("aria-disabled")}}this.options.disabled=j},_setupEvents:function(h){var g={click:function(i){i.preventDefault()}};if(h){c.each(h.split(" "),function(j,i){g[i]="_eventHandler"})}this._off(this.anchors.add(this.tabs).add(this.panels));this._on(this.anchors,g);this._on(this.tabs,{keydown:"_tabKeydown"});this._on(this.panels,{keydown:"_panelKeydown"});this._focusable(this.tabs);this._hoverable(this.tabs)},_setupHeightStyle:function(g){var i,j,h=this.element.parent();if(g==="fill"){if(!c.support.minHeight){j=h.css("overflow");h.css("overflow","hidden")}i=h.height();this.element.siblings(":visible").each(function(){var l=c(this),k=l.css("position");if(k==="absolute"||k==="fixed"){return}i-=l.outerHeight(true)});if(j){h.css("overflow",j)}this.element.children().not(this.panels).each(function(){i-=c(this).outerHeight(true)});this.panels.each(function(){c(this).height(Math.max(0,i-c(this).innerHeight()+c(this).height()))}).css("overflow","auto")}else{if(g==="auto"){i=0;this.panels.each(function(){i=Math.max(i,c(this).height("").height())}).height(i)}}},_eventHandler:function(g){var p=this.options,k=this.active,l=c(g.currentTarget),j=l.closest("li"),n=j[0]===k[0],h=n&&p.collapsible,i=h?c():this._getPanelForTab(j),m=!k.length?c():this._getPanelForTab(k),o={oldTab:k,oldPanel:m,newTab:h?c():j,newPanel:i};g.preventDefault();if(j.hasClass("ui-state-disabled")||j.hasClass("ui-tabs-loading")||this.running||(n&&!p.collapsible)||(this._trigger("beforeActivate",g,o)===false)){return}p.active=h?false:this.tabs.index(j);this.active=n?c():j;if(this.xhr){this.xhr.abort()}if(!m.length&&!i.length){c.error("jQuery UI Tabs: Mismatching fragment identifier.")}if(i.length){this.load(this.tabs.index(j),g)}this._toggle(g,o)},_toggle:function(m,l){var k=this,g=l.newPanel,j=l.oldPanel;this.running=true;function i(){k.running=false;k._trigger("activate",m,l)}function h(){l.newTab.closest("li").addClass("ui-tabs-active ui-state-active");if(g.length&&k.options.show){k._show(g,k.options.show,i)}else{g.show();i()}}if(j.length&&this.options.hide){this._hide(j,this.options.hide,function(){l.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");h()})}else{l.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");j.hide();h()}j.attr({"aria-expanded":"false","aria-hidden":"true"});l.oldTab.attr("aria-selected","false");if(g.length&&j.length){l.oldTab.attr("tabIndex",-1)}else{if(g.length){this.tabs.filter(function(){return c(this).attr("tabIndex")===0}).attr("tabIndex",-1)}}g.attr({"aria-expanded":"true","aria-hidden":"false"});l.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(h){var g,i=this._findActive(h);if(i[0]===this.active[0]){return}if(!i.length){i=this.active}g=i.find(".ui-tabs-anchor")[0];this._eventHandler({target:g,currentTarget:g,preventDefault:c.noop})},_findActive:function(g){return g===false?c():this.tabs.eq(g)},_getIndex:function(g){if(typeof g==="string"){g=this.anchors.index(this.anchors.filter("[href$='"+g+"']"))}return g},_destroy:function(){if(this.xhr){this.xhr.abort()}this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("http://jci.xiaozhustatic1.com/e19061101/href.tabs").removeData("http://jci.xiaozhustatic1.com/e19061101/load.tabs").removeUniqueId();this.tabs.add(this.panels).each(function(){if(c.data(this,"ui-tabs-destroy")){c(this).remove()}else{c(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}});this.tabs.each(function(){var g=c(this),h=g.data("ui-tabs-aria-controls");if(h){g.attr("aria-controls",h)}else{g.removeAttr("aria-controls")}});this.panels.show();if(this.options.heightStyle!=="content"){this.panels.css("height","")}},enable:function(g){var h=this.options.disabled;if(h===false){return}if(g===e){h=false}else{g=this._getIndex(g);if(c.isArray(h)){h=c.map(h,function(i){return i!==g?i:null})}else{h=c.map(this.tabs,function(i,j){return j!==g?j:null})}}this._setupDisabled(h)},disable:function(g){var h=this.options.disabled;if(h===true){return}if(g===e){h=true}else{g=this._getIndex(g);if(c.inArray(g,h)!==-1){return}if(c.isArray(h)){h=c.merge([g],h).sort()}else{h=[g]}}this._setupDisabled(h)},load:function(i,m){i=this._getIndex(i);var l=this,j=this.tabs.eq(i),h=j.find(".ui-tabs-anchor"),g=this._getPanelForTab(j),k={tab:j,panel:g};if(b(h[0])){return}this.xhr=c.ajax(this._ajaxSettings(h,m,k));if(this.xhr&&this.xhr.statusText!=="canceled"){j.addClass("ui-tabs-loading");g.attr("aria-busy","true");this.xhr.success(function(n){setTimeout(function(){g.html(n);l._trigger("load",m,k)},1)}).complete(function(o,n){setTimeout(function(){if(n==="abort"){l.panels.stop(false,true)}j.removeClass("ui-tabs-loading");g.removeAttr("aria-busy");if(o===l.xhr){delete l.xhr}},1)})}},_ajaxSettings:function(g,j,i){var h=this;return{url:g.attr("href"),beforeSend:function(l,k){return h._trigger("beforeLoad",j,c.extend({jqXHR:l,ajaxSettings:k},i))}}},_getPanelForTab:function(g){var h=c(g).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+h))}});if(c.uiBackCompat!==false){c.ui.tabs.prototype._ui=function(h,g){return{tab:h,panel:g,index:this.anchors.index(h)}};c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{url:function(h,g){this.anchors.eq(h).attr("href",g)}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{ajaxOptions:null,cache:false},_create:function(){this._super();var g=this;this._on({tabsbeforeload:function(h,i){if(c.data(i.tab[0],"http://jci.xiaozhustatic1.com/e19061101/cache.tabs")){h.preventDefault();return}i.jqXHR.success(function(){if(g.options.cache){c.data(i.tab[0],"http://jci.xiaozhustatic1.com/e19061101/cache.tabs",true)}})}})},_ajaxSettings:function(h,i,j){var g=this.options.ajaxOptions;return c.extend({},g,{error:function(m,k){try{g.error(m,k,j.tab.closest("li").index(),j.tab[0])}catch(l){}}},this._superApply(arguments))},_setOption:function(g,h){if(g==="cache"&&h===false){this.anchors.removeData("http://jci.xiaozhustatic1.com/e19061101/cache.tabs")}this._super(g,h)},_destroy:function(){this.anchors.removeData("http://jci.xiaozhustatic1.com/e19061101/cache.tabs");this._super()},url:function(g){this.anchors.eq(g).removeData("http://jci.xiaozhustatic1.com/e19061101/cache.tabs");this._superApply(arguments)}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{abort:function(){if(this.xhr){this.xhr.abort()}}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{spinner:"<em>Loading&#8230;</em>"},_create:function(){this._super();this._on({tabsbeforeload:function(i,j){if(i.target!==this.element[0]||!this.options.spinner){return}var h=j.tab.find("span"),g=h.html();h.html(this.options.spinner);j.jqXHR.complete(function(){h.html(g)})}})}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{enable:null,disable:null},enable:function(i){var h=this.options,g;if(i&&h.disabled===true||(c.isArray(h.disabled)&&c.inArray(i,h.disabled)!==-1)){g=true}this._superApply(arguments);if(g){this._trigger("enable",null,this._ui(this.anchors[i],this.panels[i]))}},disable:function(i){var h=this.options,g;if(i&&h.disabled===false||(c.isArray(h.disabled)&&c.inArray(i,h.disabled)===-1)){g=true}this._superApply(arguments);if(g){this._trigger("disable",null,this._ui(this.anchors[i],this.panels[i]))}}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{add:null,remove:null,tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},add:function(l,k,j){if(j===e){j=this.anchors.length}var m,h,i=this.options,g=c(i.tabTemplate.replace(/#\{href\}/g,l).replace(/#\{label\}/g,k)),n=!l.indexOf("#")?l.replace("#",""):this._tabId(g);g.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy",true);g.attr("aria-controls",n);m=j>=this.tabs.length;h=this.element.find("#"+n);if(!h.length){h=this._createPanel(n);if(m){if(j>0){h.insertAfter(this.panels.eq(-1))}else{h.appendTo(this.element)}}else{h.insertBefore(this.panels[j])}}h.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide();if(m){g.appendTo(this.tablist)}else{g.insertBefore(this.tabs[j])}i.disabled=c.map(i.disabled,function(o){return o>=j?++o:o});this.refresh();if(this.tabs.length===1&&i.active===false){this.option("active",0)}this._trigger("add",null,this._ui(this.anchors[j],this.panels[j]));return this},remove:function(i){i=this._getIndex(i);var h=this.options,j=this.tabs.eq(i).remove(),g=this._getPanelForTab(j).remove();if(j.hasClass("ui-tabs-active")&&this.anchors.length>2){this._activate(i+(i+1<this.anchors.length?1:-1))}h.disabled=c.map(c.grep(h.disabled,function(k){return k!==i}),function(k){return k>=i?--k:k});this.refresh();this._trigger("remove",null,this._ui(j.find("a")[0],g[0]));return this}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{length:function(){return this.anchors.length}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{idPrefix:"ui-tabs-"},_tabId:function(h){var g=h.is("li")?h.find("a[href]"):h;g=g[0];return c(g).closest("li").attr("aria-controls")||g.title&&g.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF\-]/g,"")||this.options.idPrefix+d()}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{panelTemplate:"<div></div>"},_createPanel:function(g){return c(this.options.panelTemplate).attr("id",g).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",true)}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{_create:function(){var g=this.options;if(g.active===null&&g.selected!==e){g.active=g.selected===-1?false:g.selected}this._super();g.selected=g.active;if(g.selected===false){g.selected=-1}},_setOption:function(h,i){if(h!=="selected"){return this._super(h,i)}var g=this.options;this._super("active",i===-1?false:i);g.selected=g.active;if(g.selected===false){g.selected=-1}},_eventHandler:function(){this._superApply(arguments);this.options.selected=this.options.active;if(this.options.selected===false){this.options.selected=-1}}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{show:null,select:null},_create:function(){this._super();if(this.options.active!==false){this._trigger("show",null,this._ui(this.active.find(".ui-tabs-anchor")[0],this._getPanelForTab(this.active)[0]))}},_trigger:function(j,k,l){var i,g,h=this._superApply(arguments);if(!h){return false}if(j==="beforeActivate"){i=l.newTab.length?l.newTab:l.oldTab;g=l.newPanel.length?l.newPanel:l.oldPanel;h=this._super("select",k,{tab:i.find(".ui-tabs-anchor")[0],panel:g[0],index:i.closest("li").index()})}else{if(j==="activate"&&l.newTab.length){h=this._super("show",k,{tab:l.newTab.find(".ui-tabs-anchor")[0],panel:l.newPanel[0],index:l.newTab.closest("li").index()})}}return h}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{select:function(g){g=this._getIndex(g);if(g===-1){if(this.options.collapsible&&this.options.selected!==-1){g=this.options.selected}else{return}}this.anchors.eq(g).trigger(this.options.event+this.eventNamespace)}});(function(){var g=0;c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{cookie:null},_create:function(){var h=this.options,i;if(h.active==null&&h.cookie){i=parseInt(this._cookie(),10);if(i===-1){i=false}h.active=i}this._super()},_cookie:function(i){var h=[this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+(++g))];if(arguments.length){h.push(i===false?-1:i);h.push(this.options.cookie)}return c.cookie.apply(null,h)},_refresh:function(){this._super();if(this.options.cookie){this._cookie(this.options.active,this.options.cookie)}},_eventHandler:function(){this._superApply(arguments);if(this.options.cookie){this._cookie(this.options.active,this.options.cookie)}},_destroy:function(){this._super();if(this.options.cookie){this._cookie(null,this.options.cookie)}}})})();c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{_trigger:function(h,i,j){var g=c.extend({},j);if(h==="load"){g.panel=g.panel[0];g.tab=g.tab.find(".ui-tabs-anchor")[0]}return this._super(h,i,g)}});c.widget("http://jci.xiaozhustatic1.com/e19061101/ui.tabs",c.ui.tabs,{options:{fx:null},_getFx:function(){var h,g,i=this.options.fx;if(i){if(c.isArray(i)){h=i[0];g=i[1]}else{h=g=i}}return i?{show:g,hide:h}:null},_toggle:function(n,m){var l=this,g=m.newPanel,j=m.oldPanel,k=this._getFx();if(!k){return this._super(n,m)}l.running=true;function i(){l.running=false;l._trigger("activate",n,m)}function h(){m.newTab.closest("li").addClass("ui-tabs-active ui-state-active");if(g.length&&k.show){g.animate(k.show,k.show.duration,function(){i()})}else{g.show();i()}}if(j.length&&k.hide){j.animate(k.hide,k.hide.duration,function(){m.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");h()})}else{m.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");j.hide();h()}}})}})(jQuery);(function(d){var b=0;function c(f,g){var e=(f.attr("aria-describedby")||"").split(/\s+/);e.push(g);f.data("ui-tooltip-id",g).attr("aria-describedby",d.trim(e.join(" ")))}function a(g){var h=g.data("ui-tooltip-id"),f=(g.attr("aria-describedby")||"").split(/\s+/),e=d.inArray(h,f);if(e!==-1){f.splice(e,1)}g.removeData("ui-tooltip-id");f=d.trim(f.join(" "));if(f){g.attr("aria-describedby",f)}else{g.removeAttr("aria-describedby")}}d.widget("ui.tooltip",{version:"1.9.2",options:{content:function(){return d(this).attr("title")},hide:true,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:true,tooltipClass:null,track:false,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"});this.tooltips={};this.parents={};if(this.options.disabled){this._disable()}},_setOption:function(e,g){var f=this;if(e==="disabled"){this[g?"_disable":"_enable"]();this.options[e]=g;return}this._super(e,g);if(e==="content"){d.each(this.tooltips,function(i,h){f._updateContent(h)})}},_disable:function(){var e=this;d.each(this.tooltips,function(h,f){var g=d.Event("blur");g.target=g.currentTarget=f[0];e.close(g,true)});this.element.find(this.options.items).andSelf().each(function(){var f=d(this);if(f.is("[title]")){f.data("ui-tooltip-title",f.attr("title")).attr("title","")}})},_enable:function(){this.element.find(this.options.items).andSelf().each(function(){var e=d(this);if(e.data("ui-tooltip-title")){e.attr("title",e.data("ui-tooltip-title"))}})},open:function(f){var e=this,g=d(f?f.target:this.element).closest(this.options.items);if(!g.length||g.data("ui-tooltip-id")){return}if(g.attr("title")){g.data("ui-tooltip-title",g.attr("title"))}g.data("ui-tooltip-open",true);if(f&&f.type==="mouseover"){g.parents().each(function(){var i=d(this),h;if(i.data("ui-tooltip-open")){h=d.Event("blur");h.target=h.currentTarget=this;e.close(h,true)}if(i.attr("title")){i.uniqueId();e.parents[this.id]={element:this,title:i.attr("title")};i.attr("title","")}})}this._updateContent(g,f)},_updateContent:function(j,i){var h,e=this.options.content,g=this,f=i?i.type:null;if(typeof e==="string"){return this._open(i,j,e)}h=e.call(j[0],function(k){if(!j.data("ui-tooltip-open")){return}g._delay(function(){if(i){i.type=f}this._open(i,j,k)})});if(h){this._open(i,j,h)}},_open:function(i,k,h){var j,g,f,l=d.extend({},this.options.position);if(!h){return}j=this._find(k);if(j.length){j.find(".ui-tooltip-content").html(h);return}if(k.is("[title]")){if(i&&i.type==="mouseover"){k.attr("title","")}else{k.removeAttr("title")}}j=this._tooltip(k);c(k,j.attr("id"));j.find(".ui-tooltip-content").html(h);function e(m){l.of=m;if(j.is(":hidden")){return}j.position(l)}if(this.options.track&&i&&/^mouse/.test(i.type)){this._on(this.document,{mousemove:e});e(i)}else{j.position(d.extend({of:k},this.options.position))}j.hide();this._show(j,this.options.show);if(this.options.show&&this.options.show.delay){f=setInterval(function(){if(j.is(":visible")){e(l.of);clearInterval(f)}},d.fx.interval)}this._trigger("open",i,{tooltip:j});g={keyup:function(m){if(m.keyCode===d.ui.keyCode.ESCAPE){var n=d.Event(m);n.currentTarget=k[0];this.close(n,true)}},remove:function(){this._removeTooltip(j)}};if(!i||i.type==="mouseover"){g.mouseleave="close"}if(!i||i.type==="focusin"){g.focusout="close"}this._on(true,k,g)},close:function(f){var e=this,h=d(f?f.currentTarget:this.element),g=this._find(h);if(this.closing){return}if(h.data("ui-tooltip-title")){h.attr("title",h.data("ui-tooltip-title"))}a(h);g.stop(true);this._hide(g,this.options.hide,function(){e._removeTooltip(d(this))});h.removeData("ui-tooltip-open");this._off(h,"mouseleave focusout keyup");if(h[0]!==this.element[0]){this._off(h,"remove")}this._off(this.document,"mousemove");if(f&&f.type==="mouseleave"){d.each(this.parents,function(j,i){d(i.element).attr("title",i.title);delete e.parents[j]})}this.closing=true;this._trigger("close",f,{tooltip:g});this.closing=false},_tooltip:function(e){var g="ui-tooltip-"+b++,f=d("<div>").attr({id:g,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));d("<div>").addClass("ui-tooltip-content").appendTo(f);f.appendTo(this.document[0].body);if(d.fn.bgiframe){f.bgiframe()}this.tooltips[g]=e;return f},_find:function(e){var f=e.data("ui-tooltip-id");return f?d("#"+f):d()},_removeTooltip:function(e){e.remove();delete this.tooltips[e.attr("id")]},_destroy:function(){var e=this;d.each(this.tooltips,function(h,f){var g=d.Event("blur");g.target=g.currentTarget=f[0];e.close(g,true);d("#"+h).remove();if(f.data("ui-tooltip-title")){f.attr("title",f.data("ui-tooltip-title"));f.removeData("ui-tooltip-title")}})}})}(jQuery)); 
 
 
 // @flow
(function($){
   $.fn.uploadify = function(opts){
      var defaults = {
         fileTypesExts:'',
         uploader:'',
         auto:true,
         method:'post',
         multi:false,
         formData:null,
         fileObjName:'Filedata',
         buttonClass:'defaultButtonClass',
         buttonText:'选择文件',
         fileSizeLimit:'20MB',
         fileTypeExts:null,
         onUploadProgress:null,
         onUploadStart:null,
         onUploadSuccess:null,
         onUploadComplete:null,
         onUploadError:null,
         onInit:null,
         onCancel:null
      };

      var option = $.extend(defaults,opts);

      function convertURL(url) {
         var timstamp = (new Date()).valueOf();
         if (url.indexOf("?") >= 0) {
            url = url + "&t=" + timstamp;
         } else {
            url = url + "?t=" + timstamp;
         }
         return url;
      }

      var formatFileSize = function(size){
         var t = option.fileSizeLimit.charAt(option.fileSizeLimit.length - 2).toLowerCase();
         if (t == 'm'){
            size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
         }
         else if(t == 'k'){
            size = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
         }
         return size;
      }

      var getFile = function(index,files){
         for(var i=0;i<files.length;i++){
            if(files[i].index == index){
               return files[i];
            }
         }
         return false;
      }

      var getFileTypes = function(str){
         var result = [];
         var arr1 = str.split(";");
         for(var i=0,len=arr1.length;i<len;i++){
            result.push(arr1[i].split(".").pop());
         }
         return result;
      }


      this.each(function(){
         var _this = $(this);
         !option.multi?
            _this.removeAttr("multiple"):
            _this.attr("multiple", "true");
         _this.attr("accept", getFileTypes(option.fileTypeExts).join(","));
         _this.attr("class", option.buttonClass);
         // _this.attr("style", "opacity:0");
         $('#upwords').attr("style", "cursor:pointer");

         var fileObj = {
            fileInput : _this,
            url : option.uploader,
            fileFilter : [],
            filter : function(files){
               var arr = [];
               var typeArray = getFileTypes(option.fileTypeExts);
               if(typeArray.length > 0){
                  for(var i=0,len=files.length;i<len;i++){
                     var thisFile = files[i];
                     if(parseInt(formatFileSize(thisFile.size)) >= parseInt(option.fileSizeLimit)){
                        alert('图片 [' + thisFile.name + '] 大小超出系统限制的' + option.fileSizeLimit + "大小!");
                        continue;
                     }
                     if($.inArray(thisFile.name.split('.').pop(), typeArray) >= 0){
                        arr.push(thisFile);
                     }
                     else{
                        alert('文件' + thisFile.name + '类型不允许!');
                     }
                  }
               }
               return arr;
            },
            onSelect : function(files){
               for(var i=0,len=files.length;i<len;i++){
                  var file = files[i];
                  if(option.auto)
                     this.funUploadFile(file);
               }
            },
            onProgress : function(file, loaded, total){
            },
            funGetFiles : function(e){
               var files = e.target.files;
               files = this.filter(files);
               for(var i=0,len=files.length;i<len;i++){
                  this.fileFilter.push(files[i]);
               }
               this.funDealFiles(files);
               return this;
            },
            funDealFiles : function(files){
               var fileCount = 0;
               for(var i=0,len=files.length;i<len;i++){
                  files[i].index = ++fileCount;
                  files[i].id = files[i].index;
               }
               this.onSelect(files);
               return this;
            },
            funUploadFile : function(file){
               var xhr = false;
               try{
                  xhr = new XMLHttpRequest();
               }catch(e){
                  xhr = ActiveXobject("Msxml12.XMLHTTP");
               }
               if(xhr.upload){
                  if(option.onUploadProgress){
                     xhr.upload.addEventListener("progress", function(e) {
                        option.onUploadProgress(file, e.loaded, e.total)
                     }, false);
                  }
                  xhr.onreadystatechange = function(e){
                     if(xhr.readyState == 4){
                        if(xhr.status == 200){
                           option.onUploadSuccess&&option.onUploadSuccess(file, xhr.responseText);
                        }else{
                           option.onUploadError && option.onUploadError(file, xhr.responseText);
                        }
                        option.onUploadComplete && option.onUploadComplete(file, xhr.responseText);
                        fileObj.fileInput.val('');
                     }
                  };

                  option.onUploadStart && option.onUploadStart();
                  xhr.open(option.method, convertURL(this.url), true);
                  var fd = new FormData();
                  fd.append(option.fileObjName, file);
                  xhr.send(fd);
               }
            },
            init : function(){
               if(this.fileInput.length > 0){
                  this.fileInput.change(function(e){
                     fileObj.funGetFiles(e);
                  });
               }
               $('#upwords').on('click', function(){
                  _this.trigger('click');
               });
               option.onInit && option.onInit();
            }
         };
         fileObj.init();
      });
   }

})(jQuery)

 
 queueSizeLimitFeedback = 5;
$(document).bind("click",function(e){
    var target = $(e.target);
    if(target.closest(".feedback_con").length == 0 && target.closest(".feedback_wraper").length == 0){
        $(".feedback_con").hide();
    }
});  
function uploadifyFeedBackInit() {
    var queueNum =0;
    $('#feedback_file_upload').uploadify({
            'auto' : true,
            'multi' : false,
            'removeCompleted' : true,
            'fileSizeLimit' : '4000KB',
            'queueSizeLimit' : queueSizeLimitFeedback,
            'fileTypeExts' : '*.jpg;*.jpeg;*.gif;*.png',
            'buttonClass' : 'uploadifyButtonFeedback',
            'buttonText' : '上传截图',
            'width': 50,
            'height': 20,
            'swf'      : 'uploadify.swf'/*tpa=http://jci.xiaozhustatic1.com/swf/uploadify.swf*/,
            //'uploader' : "http://"+domain+"/uploadify.php?type=feedback",
            'uploader' : uploadImageUrl+"?type=feedback",
            'overrideEvents': ['onSelectError', 'onDialogClose'],
            'onSelectError': function (file, errorCode, errorMsg) {
                switch (errorCode) {
                    case -100:
                        $('.feed_p1').text("只能上传5张图片");
                        break;
                    case -110:
                        $('.feed_p1').text("请上传小于4M的图片");
                        break;
                }
                return false;
            },
            'onDialogClose'  : function(queueData) {
                queueNum += queueData.filesQueued;
                $('#feedback_file_upload-queue').show();
            },
            'onUploadStart' : function(file) {
                $('#is_upload_progress').val(1);
                //$('.fileName','#'+file.id).html('正在上传' + (file.index+1) + ' / ' + queueNum);
                $('.fileName','#'+file.id).html('正在上传1/1');
            },
            'onUploadSuccess' : function(file, data, response) {
                $('#'+file.id).hide();
                $('.feed_ul').show();
                var imgData = eval('('+data+')');
			    addFeedbackImage(imgData,file.id,file.name);

                var imgCount = $('.feed_ul li').length;
                var limit = queueSizeLimitFeedback-imgCount;
                $('#feedback_file_upload').uploadify('settings','queueSizeLimit',limit);
                if (imgCount >= queueSizeLimitFeedback) {
                    $('#feedback_file_upload').uploadify('disable',true);
                }
                $('.feed_p1').text("您还可以上传"+limit+"张图片");
                $('#is_upload_progress').val(0);
            },
            'onClearQueue' : function(queueItemCount){
                $('.uploadify-queue').hide();
                $('#is_upload_progress').val(0);
            }
    });
    $('#SWFUpload_0').css('left','10px');
    $('.uploadify-queue').removeClass();
    $('#feedback_file_upload').attr('title','更直观的展示您遇到的问题');
}
$(function () {
    $(window).scroll(function(){
        if ($(window).scrollTop()>100) {
            $(".back_top").fadeIn(1500);
        } else {
            $(".back_top").fadeOut(1500);
        }
    });

    $(".back_top").bind("mouseenter",function(){
        $(this).children().show();
    }).bind("mouseleave",function(){
        $(this).children().hide();
    });
    $(".feedback").bind("mouseenter",function(){
        $(this).children().show();
    }).bind("mouseleave",function(){
        $(this).children().hide();
    });

    $(".weiXin_sider").bind("click",function(){
        if($(".weiXin_img").is(":hidden"))
        {
            $(".weiXin_img").show();
            $(".weiXin_sider").addClass("marginT106");
            $(".weiXin_tri").addClass("tri_R");
            $(".weiXin_con").width(218);
        }else
        {
            $(".weiXin_img").hide();
            $(".weiXin_sider").removeClass("marginT106");
            $(".weiXin_tri").removeClass("tri_R");
            $(".weiXin_con").width(32);

        }
    
    });
});
function feedback_scroll_top() {
    $('body,html').animate({scrollTop:0},1000);
}
function showFeedback() {
    AjaxGetFeedBack();
    if ($("#feedback_column1").is(":hidden") && $("#feedback_column2").is(":hidden") || !$("#feedback_column1").is(":hidden")) {
        $("#feedback_column1").toggle();
    } else {
        $("#feedback_column2").toggle();
    }
}
function close_feedback() {
    $('.feedback_con').hide();
}
function addFeedbackImage(imgData,id,name) {
    if(!id || !imgData || !imgData.url) {
        alert("上传失败.请重新上传!");
        return;
    }
    var successId = 'Success_' + id;
    var imgDiv = document.createElement("li");
    imgDiv.id = successId; 
    $("#thumbnails_feedback").append(imgDiv);
    var imgSrc = imgData.domain + '/' + imgData. smallImgSpec+ '/' + imgData.url;
    var imgHtml = '<img class="upload_img" src="'+imgSrc+'" width="50" height="31" value="'+imgData.url+'" realwidth="'+imgData.width+'" realheight="'+imgData.height+'"/><a href="javascript:void(0);" onclick="removeFeedbackImage(\''+successId+'\')" class="pic_delete"></a>';
    $('#'+successId).append(imgHtml);
}
function buildFeedbackImageParam() {
    var imgParam = "";
    var images = $(".upload_img").length;
    if(images <= queueSizeLimitFeedback) {
        $(".upload_img").each(function(){
                imgParam += $(this).attr("value");
                imgParam += "---" + $(this).attr("realwidth");
                imgParam += "---" + $(this).attr("realheight");
                imgParam += "|||";
                });
    } else {
        $('.feed_p1').text("上传图片不超过5张！");
        return false;
    }
    return imgParam;
}
function removeFeedbackImage(id) {
    $('#feedback_file_upload').uploadify('cancel',id);
    var imgCount = $('.feed_ul li').length;
    var limit = queueSizeLimitFeedback-imgCount+1;
    $('#feedback_file_upload').uploadify('settings','queueSizeLimit',limit);
    if (imgCount < queueSizeLimitFeedback) {
        $('#feedback_file_upload').uploadify('disable',false);
    }
    if (imgCount <= 1) {
        $('.feed_ul').hide();
    }
    $('.feed_p1').text("您还可以上传"+limit+"张图片");
}
function feedback_focus(id,content) {
    var val = $('#'+id).val();
    if (val == content) {
        $('#'+id).val('');
    }
}
function feedback_blur(id,content) {
    var val = $('#'+id).val();
    if (val == '') {
        $('#'+id).val(content);
    }
}
function checkFeedbackVals() {
    var cont = document.getElementById("feedback_problem").value.replace(/[ ]/g,"");
    document.getElementById("showFeedbackCountVals").innerHTML = 1000 - cont.length;
    $('#feedback_problem').val(cont.substring(0,1000));
}
function validFeedbackProblem() {
    var feedbackProblemVal = $('#feedback_problem').val();
    if (feedbackProblemVal == '' || feedbackProblemVal == '请告诉我们您对小猪的意见和建议，我们会认真参考您的意见。') {
        $('.feed_p1').text("请输入反馈意见内容");
        return false;
    }
    if (feedbackProblemVal.length > 1000) {
        $('.feed_p1').text("最多输入1000字");
        return false;
    }
    $('.feed_p1').text("");
    return true;
}
function validFeedbackContact() {
    var feedbackContactVal = $('#feedback_contact').val();
    if (feedbackContactVal.length > 30) {
        $('.feed_p1').text("联系方式只允许输入30位");
        return false;
    }
    $('.feed_p1').text("");
    feedback_blur('feedback_contact','留下您的手机，QQ或者Email，我们会尽快联系您');
    return true;
}
function addFeedback() {
    if ($('#is_upload_progress').val()>0) {
        if (confirm('您正在上传图片，若此时提交，该图片将被舍弃，您确定要继续吗？')) {
            doAddFeedback();
        }
    }
    doAddFeedback();
}
function doAddFeedback() {
    if (!validFeedbackProblem() || !validFeedbackContact()) {
        return false;
    }
    var problem = encodeURI($('#feedback_problem').val());
    var contact = $('#feedback_contact').val();
    contact = (contact == '留下您的手机，QQ或者Email，我们会尽快联系您') ? '' : contact;
    var imageParam = buildFeedbackImageParam();
    $.ajax({
        type: "POST",
        url: XZWebUrlWriter.getAjax_AddFeedbackUrl(problem,contact,imageParam),
        success: function(data) {
            var obj = eval("("+data+")");
            if (obj.status == 0) {
                $('.feed_p1').text(obj.errmsg);
                return false;
            } else {
                $('#feedback_column1').hide();
                $('#feedback_column2').show();
                $('#feedback_problem').val('请告诉我们您对小猪的意见和建议，我们会认真参考您的意见。');
                $('#feedback_contact').val('留下您的手机，QQ或者Email，我们会尽快联系您');
                $("#thumbnails_feedback li").each(function(){
                    $(this).remove();
                });
                $('#feedback_file_upload').uploadify('disable',false);
            }
        }
    });
}
function AjaxGetFeedBack() {
    if ($("#feedback_column1").length < 1) {
        $.ajax({
            type: "POST",
            url:XZWebUrlWriter.getAjax_GetFeedbackUrl(),
            success: function(data) {
                $('#load_feedback').append(data);
                uploadifyFeedBackInit();
                $("#feedback_column1").show();
            }
        });
    }
}
 
 $(window).load(function() {
    try{
    if($.browser.msie && $.browser.version == "6.0")
    {
        $.getScript("jquery.nyroModal.custom.min.js"/*tpa=http://jci.xiaozhustatic1.com/js/jquery/jquery-plugin/jquery.nyroModal.custom.min.js*/);
        $.getScript("jquery.nyroModal-ie6.min.js"/*tpa=http://jci.xiaozhustatic1.com/js/jquery/jquery-plugin/jquery.nyroModal-ie6.min.js*/,loadNyroModal);
    }else{
        $.getScript("jquery.nyroModal.custom.min.js"/*tpa=http://jci.xiaozhustatic1.com/js/jquery/jquery-plugin/jquery.nyroModal.custom.min.js*/,loadNyroModal);
    }
    }catch(e){}
});
 
 
XZWebAjax = {
    get : function(url, ajaxData, async, callback, dataType) {
        var that = this;
        if (!ajaxData) var ajaxData = {};
        if (!dataType) var dataType = 'json';
        var nexturl = $('input[name=next][type=hidden]').val();
        if (nexturl){ajaxData.next = nexturl;}
        var returnData;
        $.ajax({
            type     : "GET",
            url      : url,
            data     : ajaxData,
            dataType : dataType,
            async    : async ? true : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){
                returnData = datas;
                if(callback) callback(datas);
            },
            error : function (XMLHttpRequest, textStatus, errorThrown){
                LogErrors(url, ajaxData, textStatus, XMLHttpRequest.readyState, XMLHttpRequest.responseText);
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    getSpider : function(busiKey, isReload, url, ajaxData, async, callback, dataType) {
        if (!ajaxData) var ajaxData = {};
        if (!dataType) var dataType = 'json';
        var nexturl = $('input[name=next][type=hidden]').val();
        if (nexturl){ajaxData.next = nexturl;}
        var returnData;
        var that = this;
        $.ajax({
            type     : "GET",
            url      : url,
            data     : ajaxData,
            dataType : dataType,
            async    : async ? true : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){
                captchaInterceptors(busiKey, isReload, datas, function () {
                    that.getSpider(busiKey, isReload, url, ajaxData, async, callback, dataType);
                }, function () {
                    returnData = datas;if(callback) callback(datas);
                });
            },
           error : function (XMLHttpRequest, textStatus, errorThrown){
              that.revoltReptile(XMLHttpRequest);
           }
        });
        return returnData;
    },
    post : function(url, ajaxData, async, callback, dataType) {
        var that =this;
        if (!ajaxData) var ajaxData = {};
        if (!dataType) var dataType = 'json';
        var nexturl = $('input[name=next][type=hidden]').val();
        if (nexturl){ajaxData.next = nexturl;}
        var returnData;
        $.ajax({
            type     : "POST",
            url      : url,
            data     : ajaxData,
            dataType : dataType,
            async    : async ? true : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){returnData = datas;if(callback) callback(datas);},
            error : function (XMLHttpRequest, textStatus, errorThrown){
                LogErrors(url, ajaxData, textStatus, XMLHttpRequest.readyState, XMLHttpRequest.responseText);
                that.revoltReptile(XMLHttpRequest);
            }
        });
        return returnData;
    },
    postSpider : function(busiKey, isReload, url, ajaxData, async, callback, dataType) {
        if (!ajaxData) var ajaxData = {};
        if (!dataType) var dataType = 'json';
        var nexturl = $('input[name=next][type=hidden]').val();
        if (nexturl){ajaxData.next = nexturl;}
        var that = this;
        var returnData;
        var spiderAvoidToken = localStorage.getItem('SPIDER_AVOID_TOKEN_' + busiKey);
        if (spiderAvoidToken && spiderAvoidToken !== 'undefined') {
            var separator = url.indexOf('?') === -1 ? '?' : '&';
            url = url + separator + 'spiderAvoidToken=' + spiderAvoidToken;

        }
        $.ajax({
            type     : "POST",
            url      : url,
            data     : ajaxData,
            dataType : dataType,
            async    : async ? true : false,
            beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
            success  : function(datas){
                captchaInterceptors(busiKey, isReload,datas, function () {
                    that.postSpider(busiKey, isReload, url, ajaxData, async, callback, dataType);
                }, function () {
                    returnData = datas;
                    if(callback) callback(datas);
                });
            },
           error : function (XMLHttpRequest, textStatus, errorThrown){
                that.revoltReptile(XMLHttpRequest);
           }
        });
        return returnData;
    },
    revoltReptile:function(XMLHttpRequest){
        var reaponseHeader  = XMLHttpRequest.getResponseHeader('x-bizguard-redirect');
        if(reaponseHeader){
            window.location.href = reaponseHeader;
        }
    },
    encrypt : function(url, ajaxData, async, callback) {
    }
};

 
 
_storage = window.localStorage;
var _timestamp = function (){ return Date.parse(new Date()) / 1000 ; };
function getStorage(name) {
    if(_storage) {
        return JSON.parse(_storage.getItem(name));
    }
}
function setStorage(name, value) {
    if(_storage) {
        _storage.setItem(name, JSON.stringify(value));
    }
}

var LogErrors = function(url, ajaxData, type, readyState, responseText) {
    var record = getStorage('9RU72crHq1-Yx608hqNB0');
    if (record && record.indexOf(url) >= 0) return;
    if (!record) record = [];
    record.push(url);
    setStorage('9RU72crHq1-Yx608hqNB0',record);
    var storageKey = 'hfHG5s70T7-A1Q8tl7P6p';
    if(_storage) {
        if (getStorage(storageKey)) {
            var logger = getStorage(storageKey);
        } else {
            var logger = [];
        }
        var time = _timestamp();
        var loggerData = {
            url:url,
            type:type,
            params:JSON.stringify(ajaxData),
            state:readyState,
            response:responseText,
            t: time
        };
        logger.push(loggerData);
        setStorage(storageKey, logger);
    }
    return true;
}
var sendErrors = function () {
    
    var storageKey = 'hfHG5s70T7-A1Q8tl7P6p';
    var logger = getStorage(storageKey);
    if (!logger) return;
    var date = new Date();
    var logTimer = getStorage('oTnH56x70F-' + date.getDate());
    if (logTimer > 10) return;
    var counter = logger.length;
    if(_storage && counter > 0 && counter < 10) {
        var oneLog = logger.shift();
        $.post(XZWebUrlWriter.getAjax_jsErrorLogger(),oneLog, function(){
            setStorage(storageKey, logger);
            setStorage('oTnH56x70F-' + date.getDate(), 1 + logTimer);
        });
    } else if (_storage && counter > 20) {
        setStorage(storageKey, []);
    }
}

sendErrors();











 
 
function checkuser(e){
    if (e.indexOf("@",0)==-1){
        return  checkmobile(e);
    }
    else{
        return checkemail(e);
    }
}
function checkUsernameMobilEmail(e)
{
    if(xzRegularExpression.isMobile.test(e)){
        return  checkmobile(e);
    }
    else if (e.indexOf("@") >=0){
        return checkemail(e);
    }
    else {
        return checkOldUserName(e);
    }
}
function checkmobile(mobile){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    var mobileArr = mobile.split('_');
    var regionCode = mobileArr[0];//CN
    var countryCode = mobileArr[1];//86
    var realMobile = mobileArr[2];//13688889999
    if (realMobile == ""){
        returnContent.msg = "请输入手机号";
        returnContent.rst = false;
        return returnContent;
    }
    if(!checkGlobalMobile(mobile))
    {
        returnContent.msg = "手机号码格式错误";
        returnContent.rst = false;
    }
    return returnContent;
}
//bycl
function checkGlobalMobile(mobile){
    var mobileArr = mobile.split('_');
    var regionCode = mobileArr[0];//CN
    var countryCode = mobileArr[1];//86
    var realMobile = mobileArr[2];//13688889999

    if(!(/^\d+$/.test(realMobile))) return false;
    if(countryCode == "86"){
        if(!xzRegularExpression.mobile.test(realMobile)){
            return false;
        }
        return true;
    }

    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var phoneNumber = realMobile;
    var carrierCode = countryCode;
    
    //检测区号是否正确
    var hasThiscountryCode = phoneUtil.hasValidCountryCallingCode_(carrierCode);
    if(!hasThiscountryCode){
        return false;
    }
    var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
    var isPossible = phoneUtil.isPossibleNumber(number);
    if (!isPossible) {
       // output.append('\nResult from isPossibleNumberWithReason(): ');
        var PNV = i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
        switch (phoneUtil.isPossibleNumberWithReason(number)) {
            case PNV.INVALID_COUNTRY_CODE:
                break;
            case PNV.TOO_SHORT:
                break;
            case PNV.TOO_LONG:
                break;
        }

        return false;
    } else {
        var result = false;
        var isNumberValid = phoneUtil.isValidNumber(number);
        if (isNumberValid && regionCode && regionCode != 'ZZ') {
           result = phoneUtil.isValidNumberForRegion(number, regionCode);
            if(result === undefined){  
                result=false;
            }
        }
        /*
        output.append(phoneUtil.getRegionCodeForNumber(number));
        */
    return result;
    }
}

function checkverifyCode(verifyCode){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    if (verifyCode == "") {
        returnContent.msg = "请输入图片验证码";
        returnContent.rst = false;
        return returnContent;
    }
    if(verifyCode.length != 4)
    {
        returnContent.msg = "图片验证码错误";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}
function checkactivateCode(activateCode){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true; 
    if (activateCode == "") {
        returnContent.msg = "请输入手机验证码";
        returnContent.rst = false;
        return returnContent;
    }
    if(activateCode.length != 4){
        returnContent.msg = "手机验证码错误";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}

function CharMode(iN){
    if (iN >= 48 && iN <= 57) 
        return 1;
    if (iN >= 65 && iN <= 90) 
        return 2;
    if (iN >= 97 && iN <= 122) 
        return 4;
    else
        return 8;  
}

function bitTotal(num){
    modes = 0;
    for (i = 0; i < 5; i++){
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

function checkStrong(sPW){
    if (sPW.length <= 5)
        return 0;
    Modes = 0;
    for (i = 1; i < sPW.length; i++) {
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

function subCheckPassword(pwd){
    var repeat = true;
    var series = true;
    var series2 = true;
    var len = pwd.length;
    var first = pwd.charAt(0);
    for(var i=1;i<len;i++){
        repeat = repeat && pwd.charAt(i) == first;
        series = series && pwd.charCodeAt(i) == pwd.charCodeAt(i-1) + 1;
        series2 = series2 && pwd.charCodeAt(i) == pwd.charCodeAt(i-1) - 1;
    }
    return !(repeat || series || series2);
}
function checkpassword(password,passEmptyMsg){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.blurmsg = '';
    if(passEmptyMsg=="" || typeof(passEmptyMsg)=="undefined") 
        passEmptyMsg = '请输入密码';
    if(password.length > 8 && checkStrong(password)>1){
        returnContent.level = 3;
    }
    else if(password.length > 8 && checkStrong(password)==1){
        returnContent.level = 2;
    }
    else if(checkStrong(password)>2){
        returnContent.level = 3;
    }
    else
    {
        returnContent.level = checkStrong(password);
    }
    returnContent.rst = true;
    if (password == ""){
        returnContent.msg = passEmptyMsg;
        returnContent.rst = false;
        return returnContent;
    }
    if(!xzRegularExpression.password.test(password)){
        returnContent.msg = "包含非法字符，请重新输入";
        returnContent.rst = false;
        return returnContent;
    }
    if(password.length < 6 || password.length > 12) {
        returnContent.msg = "密码长度只能在6-12位之间";
        returnContent.rst = false;
        return returnContent;
    }
    if(subCheckPassword(password) == false){
       returnContent.msg = "您的密码过于简单";
       returnContent.rst = false;
     return returnContent;
     }
    return returnContent;
}

function checkpassword2(password){
    var returnContent = {};
    returnContent.msg = '';
    if(password.length > 8 && checkStrong(password) > 1){
        returnContent.level = 3;
    }
    else if(password.length > 8 && checkStrong(password) == 1){
         returnContent.level = 2;
    }
    else if(checkStrong(password) > 2){
        returnContent.level = 3;
    }
    else
    {
        returnContent.level = checkStrong(password);
    }
    returnContent.rst = true;
    if(subCheckPassword(password) == false && password.length > 5){
        returnContent.msg = "您的密码过于简单";
        returnContent.rst = false;
        return returnContent;
    }
    if(!xzRegularExpression.password.test(password)){
        returnContent.msg = "包含非法字符，请重新输入";                                                                                                                                                          
        returnContent.rst = false;                                                                                                                                                                                                     
        return returnContent;  
    }
    return returnContent;
}
function checkusername(username){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    if (username == "") {
        returnContent.msg = "请输入用户名";
        returnContent.rst = false;
        return returnContent;
    }
    var len=0;
    var usernamelen=username.split("");
    for(var i=0;i<username.length;i++)
    {
        if(usernamelen[i].charCodeAt(0)<299){len++ }
        else len+=2;
    }
    if (len < 4){
        returnContent.msg = "用户名太短了";
        returnContent.rst = false;
        return returnContent;
    }
    if (len > 16){
        returnContent.msg = "用户名太长了";
        returnContent.rst = false;
        return returnContent;
    }
    if (!xzRegularExpression.isUsername.test(username)){
        returnContent.msg = "仅可用汉字、字母、数字或下划线";
        returnContent.rst = false;
        return returnContent;
    }
    if ((xzRegularExpression.isMobile.test(username)||xzRegularExpression.simpleEmail.test(username)||xzRegularExpression.numbers.test(username)) && (username.length >4)){
        returnContent.msg = "请勿出现QQ、手机等个人联系方式";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}
function checkusername2(username){
    var returnContent = {};
        returnContent.msg = '';
        returnContent.rst = true;
    if ((xzRegularExpression.isMobile.test(username)||xzRegularExpression.simpleEmail.test(username)||xzRegularExpression.numbers.test(username)) && (username.length >4)){
        returnContent.msg = "请勿出现手机、QQ、邮箱等个人联系方式";
        returnContent.rst = false;
        return returnContent;
    }
    if (!xzRegularExpression.isUsername.test(username)){
        returnContent.msg = "仅可使用汉字、英文、数字、下划线";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}
function checkemail(email){
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    if (email == ""){
        returnContent.msg = "请输入邮箱";
        returnContent.rst = false;
        return returnContent;
    }
    if(!xzRegularExpression.email.test(email)){
        returnContent.msg = "邮箱格式不正确";
        returnContent.rst = false;
        return returnContent;
    }
    return returnContent;
}
function checkOldUserName(oldUserName)
{
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    if (!xzRegularExpression.isUsername.test(oldUserName)){
        returnContent.msg = "请输入手机号或邮箱";
        returnContent.rst = false;
    }
    return returnContent;
}
function checkPassport(passId)
{
    var rst = {};
    rst.msg = '';
    rst.rst = true;
    if (passId == '') {
        rst.msg = "请输入护照号码";
        rst.rst = false;
    } else if (!xzRegularExpression.passport.test(passId)){
        rst.msg = "护照号码格式不正确 ";
        rst.rst = false;
    }
    return rst;
}

function checkIdCardRule(cardNo)
{
    var len = cardNo.length;
    if(len != 15 && len !=18)
    {
        return false;
    }
    var reg;
    var cardNoSplit;
    var bGoodDay;   
    var birth;
    if(len == 15)
    {
        if(!(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/.test(cardNo)))
        {
            return false;
        }
        else 
        {
            reg = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);   
            cardNoSplit = cardNo.match(reg);
            birth = new Date('19' + cardNoSplit[2] + '/' + cardNoSplit[3] + '/' + cardNoSplit[4]);   
            bGoodDay = (birth.getYear() == Number(cardNoSplit[2])) && ((birth.getMonth() + 1) == Number(cardNoSplit[3])) && (birth.getDate() == Number(cardNoSplit[4]));   
        }
    }
    else if(len == 18)
    {
        if(!(/^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/.test(cardNo)))
        {
            return false;
        }
        else 
        {
            reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/);
            cardNoSplit = cardNo.match(reg);
            birth = new Date(cardNoSplit[2] + "/" + cardNoSplit[3] + "/" + cardNoSplit[4]);   
            bGoodDay = (birth.getFullYear() == Number(cardNoSplit[2])) && ((birth.getMonth() + 1) == Number(cardNoSplit[3])) && (birth.getDate() == Number(cardNoSplit[4]));   

        }
    }
    if (!bGoodDay) 
    { 
        return false;
    }
    else 
    {
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth();
        var nowDate = new Date().getDate();

        if( compareBirthDate(birth.getFullYear()+'-'+birth.getMonth()+'-'+birth.getDate(), ((nowYear-102)+"-"+nowMonth+"-"+nowDate))<0 || compareBirthDate(birth.getFullYear()+'-'+birth.getMonth()+'-'+birth.getDate(), ((nowYear-2)+"-"+nowMonth+"-"+nowYear))>0)
        {
            return false;
        }
        else 
        {
            if(len == 15)
            {
                return true;
            }
            else{
            // check city
            var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
            if(aCity[parseInt(cardNo.substr(0,2))]==null) {
                return false;
            }
            var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子  
            var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码  
            var sum = 0, idx;  
            for(var i = 0; i < cardNo.length - 1; i++){  
                sum += parseInt(cardNo.substr(i, 1), 10) * arrExp[i];  
            }  
            idx = sum % 11;  
            // 检验第18为是否与校验码相等  
            return arrValid[idx] == cardNo.substr(17, 1).toUpperCase();  
            }
        }
    }
}
function compareBirthDate(date1,date2)
{ // For ID Card Verify
    var newDate1 = date1.split('-');
    var dateY1 = newDate1[0];
    var dateM1 = newDate1[1];
    var dateD1 = newDate1[2];

    var newDate2 = date2.split('-');
    var dateY2 = newDate2[0];
    var dateM2 = newDate2[1];
    var dateD2 = newDate2[2];

    if(dateY1<dateY2)
    {
        return -1;
    }
    else if(dateY1>dateY2)
    {
        return 1;
    }
    else if(dateY1 == dateY2)
    {
        if(dateM1<dateM2)
        {
            return -1;
        }
        else if(dateM1>dateM2)
        {
            return 1;
        }
        else if(dateM1 == dateM2)
        {
            if(dateD1<dateD2)
            {
                return -1;
            }
            else if(dateD1>dateD2)
            {
                return 1;
            }
            else if(dateD1 == dateD2)
            {
                return 0;
            }
        }
    }
}

 
 
/* ==================== 输入框input type=text,password： ==================== 
 *  var username_input = new inputBox('#username', '#username-tip');
 *      username_input.showError('用户名重复');
 *      username_input.showOk();
 *      username_input.hideTip();
 *      username_input.setPlaceholder('请输入用户名');
 */
var inputBox = function(e, i, options) {
    options = options || {};

    this.placeHolder    = options.placeHolder   || '';
    this.errorTipClass  = options.errorTipClass || 'tipwrong';
    this.errorHtml      = options.errorHtml     || '<span class="icon-wrong"></span>';
    this.okHtml         = options.okHtml        || '<span class="icon-ok"></span>';
    this.focusBoxClass  = options.focusBoxClass || 'blue-border';
    this.errorBoxClass  = options.errorBoxClass || 'red-border';
    this.blurFunction   = options.blurFunction  || null;

    // blur时默认触发的校验函数，格式：{rst:true,msg:'请输入'}
    this.blurCheck      = options.blurCheck || null;
    //keyup时默认触发的校验,格式同上
    this.keyUpCheck      = options.keyUpCheck || null;
    //空值失焦默认提示文字
    this.blurDefaultTip = options.blurDefaultTip || null; 
    

    this.status = false;
    this.isCheck = false;
    this.e = typeof(e) == 'object' ? e : $(e);
    this.i = $(i).length > 0 ? $(i) : this.e.parent().parent().find('.tip-info-box, .tip, ' + '.' + this.errorBoxClass);
    this.init();
    return(this);
}
inputBox.prototype.init = function() {
    var _this = this;
    this.i.hide();
    if (this.placeHolder) this.setPlaceholder(this.placeHolder);
    this.e.focus(function(){
        _this.isCheck = false;
        $(this).parent('div').removeClass(_this.errorBoxClass).addClass(_this.focusBoxClass);
    });
    this.e.blur(function(){
        $(this).parent().removeClass(_this.errorBoxClass).removeClass(_this.focusBoxClass);
        if ($(this).val() == '' && _this.blurDefaultTip) _this.showError(_this.blurDefaultTip);
        if (_this.blurCheck) _this.check(_this.blurCheck);
        if (_this.blurFunction) _this.blurFunction();
        _this.isCheck = true;
    });
    this.e.keyup(function(){
        if (_this.keyUpCheck) _this.check(_this.keyUpCheck);
    });
    return(this);
}
inputBox.prototype.setPlaceholder = function(data) {
    this.e.attr('placeholder', data);
}
inputBox.prototype.showError = function(data) {
    this.i.html( this.errorHtml + data);
    this.i.addClass(this.errorTipClass).show();
    this.e.parent().addClass(this.errorBoxClass).removeClass(this.focusBoxClass);
    this.status = false;
}
inputBox.prototype.showOk = function() {
    this.i.html( this.okHtml);
    this.i.removeClass(this.errorTipClass).hide();
    this.e.parent().removeClass(this.errorBoxClass);
    this.status = true;
}
inputBox.prototype.hideTip = function(status) {
    this.i.hide();
    this.status = true;
}
inputBox.prototype.check = function(func) {
    var rst = func();
    if (!rst.rst && rst.msg){
        this.showError(rst.msg);
    } else {
        //this.hideTip();
        this.showOk();
    }
}

/* ==================== 密码强度设定： ==================== 
 *  var passTest = new passwordLevel('#padd-level');
 *      passText.setLevel(1);
 *      passText.setLevel(2);
 */
var passwordLevel = function(e, options) {
    options = options || {};
    this.e = $(e);
    this.l1 = this.e.find('.passwd-level-1');
    this.l2 = this.e.find('.passwd-level-2');
    this.l3 = this.e.find('.passwd-level-3');
    this.init();
    return(this);
}
passwordLevel.prototype.init = function() {
    this.e.blur(function(){
        $(this).css('border','1px solid red');
    });
    return(this);
}
passwordLevel.prototype.setLevel = function (level) {

    for (var x = 1;x <=3; ++x) {
        this.e.find('.passwd-level-' + x)
            .removeClass('password_level_1')
            .removeClass('password_level_2')
            .removeClass('password_level_3')
        if (x <= level) {
            this.e.find('.passwd-level-' + x ).addClass('password_level_' + level);
        } 
    }
}
passwordLevel.prototype.clearLevel = function () {
    this.e
    .removeClass().removeClass().removeClass();
}

/* ==================== 发送手机激活码： ==================== 
 *  var codeBtn = new sendCodeButton('#code-button');
 */
var sendCodeButton = function(e, options) {
    options = options || {};
    var _this = this;
    this.e = $(e);
    //this.state = false;
    this.state = true;
    this.buttonText = typeof(options.buttonText) == 'undefined' ? options.buttonText : '获取短信激活码';
    this.second = typeof(options.second) == 'undefined' ? 5 : options.second;
    this.init();
    return(this);
}
sendCodeButton.prototype.init = function() {
    var _this = this;
    this.e.click(function(){
        //_this.start(_this.second);
    });
    return(this);
}
sendCodeButton.prototype.start = function (second) {
    if (this.state) return;
    this.state = true;
    var _this = this;
    this.e.attr('disabled', true);
    //this.e.css('background', '-webkit-linear-gradient(top,#F3F3F3,#CDCDCD)');
    this.e.addClass('no-nb').removeClass('have-nb');
    //this.e.attr('sec', second);
    this.sec = second;
    if(this.intervalProcess){
        window.clearInterval(this.intervalProcess); 
    }
    this.intervalProcess=window.setInterval(function(){_this.refreshText();},1000);
}
sendCodeButton.prototype.stop = function (second) {
    this.e.addClass('have-nb').removeClass('no-nb');
}
sendCodeButton.prototype.setButtonText = function (buttonText) {
    if (this.e.attr('type') == 'button') {
        this.e.val(buttonText);
    } else {
        this.e.text(buttonText);
    };
}
sendCodeButton.prototype.refreshText = function () {
    if (this.sec < 1) {
        clearInterval(this.intervalProcess);
        this.setButtonText('重新发送');
        this.e.attr('disabled', false);
        this.e.addClass('have-nb').removeClass('no-nb');
        this.state = false;
        return;
    } 
    this.setButtonText('重新发送' + '(' + this.sec + 's)');
    this.sec = this.sec - 1;
}




var simpleWindow = function(options) {
    options = options || {};

    this.title           = options.title ;
    this.secTrigger      = options.secTrigger || null;
    this.contentHtml     = options.contentHtml || null;
    this.simpleWindowId  = 'simplewindow-' + Math.ceil(Math.random()* 10000);
    this.contentAjaxUrl  = options.contentAjaxUrl || null;
    this.contentAjaxData = options.contentAjaxData || {};
    this.contentAjaxCallback = options.contentAjaxCallback || null;
    this.contentRefresh = options.contentRefresh || false;
    this.contentLoaded = false;

    this.e = $('<div id="' + this.simpleWindowId + '" class="tcbox" style="border:1px solid #999;position:fixed;display:none;z-index:1999;">' + 
                    '<div class="t">'+this.title+'<a  class="close ' + this.simpleWindowId + '" id="close-' + this.simpleWindowId + '"></a></div>' + 
                    '<div class="c-pad1" id="window-content-' + this.simpleWindowId + '">' + this.contentHtml + '</div>' + 
                '</div>');
    $("body").prepend(this.e);
    this.b = $('<div id="background-' + this.simpleWindowId + '" style="display:none;width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; background-color: rgba(0,0,0, 0.619608);z-index:1997;">  </div>')
    $("body").prepend(this.b);
    //this.e = $(this.simpleWindowId);
    this.init();
    return(this);
}
simpleWindow.prototype.init = function() {
    var _this = this;
    this.e.hide();
    var e_height = this.e.outerHeight();
    var e_width  = this.e.outerWidth();
    this.e
        .css('top', $(window).height()/2 - e_height/2)
        .css('left', $(window).width()/2 - e_width/2);
    $('.' + this.simpleWindowId).live('click',function(){
        _this.hideWindow();
        //$('#' + _this.simpleWindowId).hide();
    });
    return(this);
}
simpleWindow.prototype.hideWindow = function() {
    this.e.hide();
    this.hideBackground();
}
simpleWindow.prototype.showBackground = function() {
    this.b.show();
};
simpleWindow.prototype.hideBackground = function() {
    this.b.hide();
};
simpleWindow.prototype.showWindow = function(sec) {
    if (!this.contentHtml && (!this.contentLoaded || this.contentRefresh )) {
        var _this = this;
        $('#window-content-' + this.simpleWindowId).load(this.contentAjaxUrl, this.contentAjaxData, function(responseText, textStatus, jqXHR){if (_this.contentAjaxCallback) _this.contentAjaxCallback(responseText, textStatus, jqXHR)});
    }
    if (sec) this.timeout(sec)
    this.e.show();
    this.showBackground();
    this.contentLoaded = true;
};
simpleWindow.prototype.timeout = function(sec) {
    var _this = this;
    this.sec = sec
    if (_this.secTrigger)  _this.secTrigger(_this.sec);
    this.intervalProcess=window.setInterval(function(){
        _this.sec --;
        if (_this.secTrigger)  _this.secTrigger(_this.sec);
        if (_this.sec < 0) {
            clearInterval(_this.intervalProcess);
            _this.hideWindow();
            return false;
        }
    },1000);
    this.e.hide();
};


var _jumpTo = $('#success-jump-to');
var _jumpUrl = _jumpTo.attr('url');
if (typeof(_jumpUrl) != 'undefined') {
    var _jumpSec = _jumpTo.attr('time');
    var _jumpText = $('#success-jump-span');
    if (typeof(_jumpUrl) != 'undefined') {
        var timer = window.setInterval(function(){
            _jumpSec --;
            _jumpText.html(_jumpSec);
    
            if (_jumpSec <= 0) {
                clearInterval(timer);
                window.location.href=_jumpUrl;
            }
        },1000);
    }
}

/* ==================== 文本输入框放大效果： ==================== 
 *  new TextMagnifier({ 
 *      inputElem          :     'inputElem',     // 输入框目标元素
 *      parentCls          :     '.parentCls',     // 目标元素的父类
 *      align              :     'right',            // 对齐方式有 ['top','bottom','left','right']四种 默认为top
 *      splitType          :     [3,4,4],          // 拆分规则
 *      delimiter          :     '-'                // 分隔符可自定义
 *  };
 */
function TextMagnifier(options) {

    this.config = {
        inputElem          :     '.inputElem',     
        parentCls          :     '.parentCls',     
        align              :     'right',            
        splitType          :     [3,4,4],          
        delimiter          :     '-'                
    };
    this.cache = {
        isFlag  :  false
    };
    this.init(options);
}

TextMagnifier.prototype = {
    constructor: TextMagnifier,
    init: function(options) {
        this.config = $.extend(this.config,options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;
        self._bindEnv();
    },
    _appendHTML: function($this,value) {
        var self = this,
        _config = self.config,
        _cache = self.cache;
        var html = '',
            $parent = $($this).closest(_config.parentCls);

        if($('.js-max-input',$parent).length == 0) {
            html += '<div class="js-max-input"></div>';
            $($parent).append(html);
        }
        var value = self._formatStr(value);
        $('.js-max-input',$parent).html(value);
    },

    _position: function(target){
        var self = this,
        _config = self.config;
        var elemWidth = $(target).outerWidth(),
            elemHeight = $(target).outerHeight(),
            elemParent = $(target).closest(_config.parentCls),
            containerHeight = $('.js-max-input',elemParent).outerHeight(); 
        $(elemParent).css({"position":'relative'});

        switch(true){
            case _config.align == 'top':
                $('.js-max-input',elemParent).css({'position':'absolute','top' :-elemHeight - containerHeight/2,'left':0});
                break;
            case _config.align == 'left':
                $('.js-max-input',elemParent).css({'position':'absolute','top' :0,'left':0});
                break;
            case _config.align == 'bottom':
                $('.js-max-input',elemParent).css({'position':'absolute','top' :elemHeight + 4 + 'px','left':0});
                break;
            case _config.align == 'right':
                $('.js-max-input',elemParent).css({'position':'absolute','top' :0,'left':elemWidth + 2 + 'px'});
                break;
        }
    },
    _bindEnv: function(){
        var self = this,
        _config = self.config,
        _cache = self.cache;

        $(_config.inputElem).each(function(index,item){
            $(item).keyup(function(e){
                var value = $.trim(e.target.value),
                parent = $(this).closest(_config.parentCls);
            if(value == '') {
                self._hide(parent);
            }else {
                var html = $.trim($('.js-max-input',parent).html());
                if(html != '') {
                    self._show(parent);
                }
            }
            self._appendHTML($(this),value);
            self._position($(this));
            });

            $(item).unbind('focusin');
            $(item).bind('focusin',function(){
                var parent = $(this).closest(_config.parentCls),
                html = $.trim($('.js-max-input',parent).html());

            if(html != '') {
                self._show(parent);
            }
            });

            $(item).unbind('focusout');
            $(item).bind('focusout',function(){
                var parent = $(this).closest(_config.parentCls);
                self._hide(parent);
            });
        });
    },
    _formatStr: function(str){
        var self = this,
        _config = self.config,
        _cache = self.cache;
        var count = 0,
            output = [];
        for(var i = 0, ilen = _config.splitType.length; i < ilen; i++){
            var s = str.substr(count,_config.splitType[i]);
            if(s.length > 0){
                output.push(s);
            }
            count+= _config.splitType[i];
        }
        return output.join(_config.delimiter);
    },
    _show: function(parent) {
        var self = this,
        _config = self.config,
        _cache = self.cache;
        if(!_cache.isFlag) {
            $('.js-max-input',parent).show();
            _cache.isFlag = true;
        }
    },
    _hide: function(parent) {
        var self = this,
        _config = self.config,
        _cache = self.cache;
        if(_cache.isFlag) {
            $('.js-max-input',parent).hide();
            _cache.isFlag = false;
        }
    }
};
 
 
var pub = {};
//刷新验证码图片 例子：<img id='veryfi-image' src=''>    pub.resetVerifyCode('#verify-image');
pub.resetVerifyCode = function(e){
    XZWebUrlWriter.getRequest(XZWebUrlWriter.headTest_ReqUrl());
    $(e).attr("src",XZWebUrlWriter.getAjax_GetVerifyCode());
};
// 此账号是否已注册
pub.verifyRegist = function(user){
    return XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_CheckRegistExist(),{user:user});
};

// 手机号是否已注册
pub.mobileExist = function(mobile,nationName,nationCode){
    return XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_CheckMobileExist(mobile,nationName,nationCode));
};

//  邮箱是否已注册
pub.emailExist = function(email) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckEmailExist(), {email:email});
};
//  用户名(昵称)是否已注册
pub.usernameExist = function(username) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckUsernameExist(username), {});
};
//  老(登录)用户名是否存在
pub.oldUsernameExist = function(username) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckOldUsernameExist(username), {});
};

// 检查图片验证码
pub.checkVerifyCode=function(verifyCode, mobile){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckVerifyCode(),{verifycode:verifyCode});
};

// 发送手机激活码
pub.sendAvtivateCode=function(verifyCode, nationName,nationCode,mobile){
    return XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_SendActivateCode(mobile,nationName,nationCode,verifyCode));
};
// 发送找回密码手机激活码
pub.sendConfirmCode=function(verifyCode, mobile, nationName, nationCode){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_SendConfirmCode(mobile,verifyCode,nationName,nationCode));
};
//发送快速登录手机验证码
pub.sendQuickLoginCode = function(verifyCode, nationName, nationCode, mobile){
    return XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_SendQuickLoginCode(mobile,verifyCode,nationName,nationCode));
};
// 验证找回密码手机激活码
pub.checkConfirmCode=function(confirmCode, mobile, nationName, nationCode){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckConfirmCode(mobile,confirmCode,nationName,nationCode));
};

// 验证手机激活码
pub.checkActivateCode=function(mobile, activateCode){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckActiveCode(mobile,activateCode));
};

// 验证注册邀请码
pub.checkInviteCode = function(inviteCode){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_CheckInviteCode(inviteCode));
}

// 用手机号注册
pub.doRegisterByMobile=function(mobile, nationName, nationCode, username, password, activateCode, next,createfrom,comefrom,referrer,inviteCode,lodgeid,ajaxShowSucc){
    var inviteCode = !inviteCode ? '' : inviteCode;
    var lodgeid    = !lodgeid ? '' : lodgeid;
    var ajaxShowSucc = ajaxShowSucc ? ajaxShowSucc : false;
    var spiderAvoidToken = localStorage.getItem('SPIDER_AVOID_TOKEN_register');
    return XZWebAjax.postSpider('register', false, XZWebUrlWriter.getAjax_RegisterByMobile(),{
        username:username,
        phone:mobile,
        nationName:nationName,
        nationCode:nationCode,
        password:password,
        imagecode:activateCode,
        next:next,
        createfrom:createfrom,
        comefrom:comefrom,
        referrer:referrer,
        invitecode:inviteCode,
        lodgeid:lodgeid,
        ajaxshowsucc : ajaxShowSucc,
        spiderAvoidToken:spiderAvoidToken
    });
}

// 用邮箱注册
pub.doRegisterByEmail=function(email, username, password, country, passport,createfrom,comefrom,referrer,lodgeid){
     lodgeid    = !lodgeid ? '' : lodgeid;
    return XZWebAjax.post(XZWebUrlWriter.getAjax_RegisterByEmail(),{email:email, username:username, password:password, country:country, passport:passport, createfrom:createfrom, comefrom:comefrom, referrer:referrer, lodgeid:lodgeid });
}

// 发送激活邮件
pub.sendActivateEmail=function(uid, uidtoken){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_ReSendActiveEmail(uid,uidtoken),{});
}
// 修改注册时邮箱
pub.changeActivateEmail=function(email){
    return XZWebAjax.post(XZWebUrlWriter.getAjax_ChangeActiveEmail(),{email:email});
}

// 登录
pub.doLogin=function(emailOrMobile,  password, verifyCode,setcookie,lodgeid){
    if(typeof(lodgeid)=='undefined'||lodgeid==''){
      return XZWebAjax.post(XZWebUrlWriter.getAjax_Login(),{username:emailOrMobile, password:password, verifycode:verifyCode, setcookie:setcookie});
    }
    return XZWebAjax.post(XZWebUrlWriter.getAjax_Login(),{username:emailOrMobile, password:password, verifycode:verifyCode, setcookie:setcookie,lodgeid:lodgeid});
}

// 手机快捷登录
pub.doLoginMobile=function(mobile, verifyCode,setcookie,lodgeid){
    if(typeof(lodgeid)=='undefined'||lodgeid==''){
      return XZWebAjax.post(XZWebUrlWriter.getAjax_LoginMobile(),{usermobile:mobile, verifycode:verifyCode, setcookie:setcookie});
    }
    return XZWebAjax.post(XZWebUrlWriter.getAjax_LoginMobile(),{usermobile:mobile, verifycode:verifyCode, setcookie:setcookie,lodgeid:lodgeid});
}

// 找回密码:手机号
pub.findPasswordByMobile=function(mobile, nationName,nationCode,confirmCode, newPassword) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_FindPasswordByMobile(),{mobile:mobile,nationName: nationName,nationCode:nationCode,confirmcode:confirmCode, password:newPassword});
}
// 找回密码=邮箱
pub.findPasswordByEmail=function(email) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_FindPasswordByEmail(),{email:email});
}

// 找回密码:设置新密码
pub.findToSetPassword=function(password, state) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_ResetPasswordFromEmail(),{password:password, state:state});
}
// 合作账户绑定 已有小猪账户
pub.bindOpenAccount=function(mobileOrEmail, password, verifyCode) {
    return XZWebAjax.post(XZWebUrlWriter.getAjax_BindOpenAccount(),{account:mobileOrEmail,password:password, verifycode:verifyCode});
}
// 合作账户绑定 新小猪账户 完善信息
pub.bindOpenAccountRegister=function(mobile,nationName,nationCode,email,username,activateCode, country, passport,inviteCode) {
    inviteCode = !inviteCode ? '' : inviteCode;
    return XZWebAjax.post(XZWebUrlWriter.getAjax_OpenAccountRegister(),{mobile:mobile,nationName:nationName,nationCode:nationCode,email:email,username:username,activatecode:activateCode, country:country, passport:passport,invitecode:inviteCode});
}

pub.getAjax = function(url, ajaxData) {
    if (!ajaxData) var ajaxData = {};
    var nexturl = $('input[name=next]').val();
    if (nexturl){ajaxData.next = nexturl;}
    var returnData;
    $.ajax({
        type     : "POST",
        url      : url,
        data     : ajaxData,
        dataType : 'json',
        async    : false,
        success  : function(datas){returnData = datas;},
        error : function (XMLHttpRequest, textStatus, errorThrown){
            alert('网络错误,请刷新页面重试:'+textStatus);
        }
    });
    return returnData;
};

var book = {};
// 移除入住人信息
book.tenantRemove = function(tenantId) {
    return pub.getAjax(XZWebUrlWriter.getAjax_TenantRemove(), {tenantid:tenantId});
}
 
 /*********************************************************************
* 注册登录相关模块组件和基础功能
* 使用时引入该类提供平台通用功能，如果特殊页面存在特殊需求请通过继承
* 或者重新定义覆盖对应方法的实现。
*********************************************************************/
var RegisterLoginComponent = {
    //{{{
    initInputMobile : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            element : '#input-mobile',
            tipHolder : '#input-mobile-tip',
            defaultPlaceHolder : '手机号',
            focusPlaceHolder : '请输入手机号',
            existCheck : true
        },options);
        var input_mobile = new inputBox(options.element,options.tipHolder,{
            placeHolder:options.defaultPlaceHolder
        });
        input_mobile.e.focus(function(){
            input_mobile.setPlaceholder(options.focusPlaceHolder);
        })
        .blur(function(){
            input_mobile.setPlaceholder(options.defaultPlaceHolder);
            var nationName = $('.nation-cont i').attr('tag');
            var nationCode = $('.nation-cont i').attr('code');
            var checker = checkmobile(nationName + "_" + nationCode +  "_" + $(this).val());
            if (checker.rst == false) {
                input_mobile.showError(checker.msg);
                input_mobile.e.addClass('r_input_small_cur');
                return true;
            }
            var source = $('#source').val() ? $('#source').val()  : 'normal';
            if(options.existCheck){
                $.when(that.checkMobileExist($(this).val(),nationName,nationCode,source))
                .done(function(ajaxChecker){
                    if(ajaxChecker.status == 0) {
                        input_mobile.showError(ajaxChecker.errmsg);
                        input_mobile.e.addClass('r_input_small_cur');
                    } else{
                        if (ajaxChecker.sucmsg == 'ableBind') {
                            localStorage.setItem("hideInviteCode","true");
                        } else {
                            localStorage.setItem("hideInviteCode","false");
                        }
                        input_mobile.status = true;
                    }
                });
            } else {
                input_mobile.status = true;
            }
        })
        .keyup(function(){
            input_mobile.i.hide();
            //input_mobile.e.removeClass('r_input_1_cur');
            input_mobile.e.removeClass('r_input_small_cur');
        });

        return input_mobile;
        //}}}
    },
    initInputImageVerifyCode : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            element : '#image-verify-code',
            tipHolder : '#image-verify-code-tip',
            defaultPlaceHolder : '图片验证码',
            focusPlaceHolder : '图片验证码'
        },options);
        var input_imageVerifyCode = new inputBox(options.element, options.tipHolder, {placeHolder:options.defaultPlaceHolder});
        input_imageVerifyCode.codeSendSuc = false;
        input_imageVerifyCode.e.blur(function(){
            if(input_imageVerifyCode.codeSendSuc){
                return true;
            }
            var verifyCode = $(this).val();
            var checker = checkverifyCode(verifyCode);
            if (checker.rst == false) {
                input_imageVerifyCode.showError(checker.msg);
                input_imageVerifyCode.e.addClass('r_input_small_cur');
                return true;
            }
            input_imageVerifyCode.isAjaxChecking = true;
            $.when(that.checkImageVerifyCode(input_imageVerifyCode.e.val()))
            .done(function(ajaxChecker){
                if (ajaxChecker.status == 0) {
                    input_imageVerifyCode.showError(ajaxChecker.errmsg);
                    input_imageVerifyCode.e.addClass('r_input_small_cur');
                } else {
                    input_imageVerifyCode.status = true;
                }
                input_imageVerifyCode.isAjaxChecking = false;
            });


        })
        .keyup(function(){
            input_imageVerifyCode.i.hide();
            input_imageVerifyCode.e.removeClass('r_input_small_cur');
        });
        $('.change-verify-image').live('click',function(){
            $('img.change-verify-image').attr('src','');
            pub.resetVerifyCode('img.change-verify-image');
        });

        return input_imageVerifyCode;
        //}}}
    },
    initInputInviteCode : function(options){
        //{{{
        options = options || {};
        options = $.extend({
            element : '#invitecode',
            tipHolder : '#input-invitecode-tip'
        },options);
        var input_inviteCode = new inputBox(options.element,options.tipHolder,{
            placeHolder:'邀请码（选填）'
        });
        input_inviteCode.checkInviteCode = function(){
            //{{{
            if(this.e.val() == '') return true;
            ajaxChecker = pub.checkInviteCode(this.e.val());
            if(ajaxChecker.status != 1){
                $(options.tipHolder).show().parent('.h_30').show();
                input_inviteCode.e.addClass('r_input_1_cur');
                return false;
            } else {
                $(options.tipHolder).hide().parent('.h_30').hide();
                input_inviteCode.e.removeClass('r_input_1_cur');
                input_inviteCode.status = true;
                return true;
            }
            //}}}
        }
        input_inviteCode.e.keydown(function(){
            $(options.tipHolder).hide().parent('.h_30').hide();
            input_inviteCode.e.removeClass('r_input_1_cur');
        });

        return input_inviteCode;
        //}}}
    },
    initInputUserName : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            element : '#reginput-username',
            tipHolder : '#reginput-username-tip',
            defaultPlaceHolder : '用户名',
            focusPlaceHolder : '请输入汉字、英文、数字或下划线',
            existCheck : true
        },options);
        var input_username = new inputBox(options.element, options.tipHolder,{
            placeHolder:options.defaultPlaceHolder
        });
        input_username.e.focus(function(){
            input_username.setPlaceholder(options.focusPlaceHolder);
        });
        input_username.e.keyup(function(){
            input_username.i.hide();
            input_username.e.removeClass('r_input_1_cur');
        })
        .blur(function(){
            input_username.setPlaceholder(options.defaultPlaceHolder);
            var checker = checkusername($(this).val());
            if (checker.rst == false) {
                input_username.showError(checker.msg);
                input_username.e.addClass('r_input_1_cur');
                return true;
            }
            input_username.isAjaxChecking = true;
            $.when(that.checkUserNameExist($(this).val()))
             .done(function(ajaxChecker){
                if(ajaxChecker.status == 0) {
                    input_username.showError(ajaxChecker.errmsg);
                    input_username.e.addClass('r_input_1_cur');
                } else {
                    input_username.status = true;
                }
                input_username.isAjaxChecking = false;
            });
        });

        return input_username;
        //}}}
    },
    initInputPassWord : function(options){
        //{{{
        options = options || {};
        options = $.extend({
            element : '#regpassword',
            tipHolder : '#regpassword-tip',
            defaultPlaceHolder : '密码',
            focusPlaceHolder : '密码'
        },options);
        var input_password = new inputBox(options.element, options.tipHolder, {
            placeHolder:options.defaultPlaceHolder
        });
        input_password.e.keyup(function(){
            input_password.i.hide();
            input_password.e.removeClass('r_input_1_cur');
        }).focus(function(){
            input_password.setPlaceholder(options.focusPlaceHolder);
        })
        .blur(function(){
            var checker = checkpassword($(this).val());
            if (checker.rst == false){
                input_password.showError(checker.msg);
                input_password.e.addClass('r_input_1_cur');
                return true;
            }
            input_password.status = true;
        })
        .bind('paste',function(e){
            e.preventDefault();
        });

        return input_password;
        //}}}
    },
    /*initInputMobileActiveCode : function(){
        //{{{
        var that = this;
        var input_mobileActivateCode = new inputBox('#activate-code', '#activate-code-tip', {
            placeHolder:'手机验证码'
        });
        input_mobileActivateCode.e.keyup(function(){
            input_mobileActivateCode.i.hide();
        }).blur(function(){
            var activateCode = $(this).val();
            var checker = checkactivateCode(activateCode);
            if (checker.rst == false) {
                input_mobileActivateCode.showError(checker.msg);
                return true;
            }
            ajaxCheck = pub.checkConfirmCode(input_mobileActivateCode.e.val(),input_mobile.e.val());
            if (ajaxCheck.status == 0){
                input_mobileActivateCode.showError(ajaxCheck.errmsg);
                return true;
            }
            input_mobileActivateCode.status = true;
        });

        return input_mobileActivateCode;
        //}}}
    },*/
    initInputEmail : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            'defaultPlaceHolder' : '邮箱',
            'existCheck' : true,
            'existCheckFind' :false
        },options);

        var input_email = new inputBox('#input-email', '#input-email-tip', {
            placeHolder:options.defaultPlaceHolder
        });
        input_email.e.blur(function(){
            var checker = checkemail($(this).val());
            if (checker.rst == false) {
                input_email.showError(checker.msg);
                input_email.e.addClass('r_input_1_cur');
                return false;
            }
            if(options.existCheck){
                $.when(that.checkEmailExist($(this).val())).done(function(ajaxChecker){
                    if(ajaxChecker.status == 0) {
                        input_email.showError(ajaxChecker.errmsg);
                        input_email.e.addClass('r_input_1_cur');
                    } else {
                        input_email.status = true;
                    }
                });
            } else if(options.existCheckFind){
                var ajaxCheckerFind = pub.emailExist($(this).val());
                if(ajaxCheckerFind.status == 1) {
                    input_email.showError("邮箱不存在");
                    input_email.e.addClass('r_input_1_cur');
                } else {
                    input_email.status = true;
                }
            } else {
                input_email.status = true;
            }
        }).keydown(function(){
            input_email.i.hide();
            input_email.e.removeClass('r_input_1_cur');
        });

        return input_email;
        //}}}
    },
    initSelectCountry : function(){
        //{{{
        var that = this;
        var input_country = new inputBox('#input-country', '#input-country-tip');
        input_country.e.blur(function(){
            if(!that.showSelect){
               $('.r_select_list').hide();
            }
            if (!input_country.e.val()){
                input_country.showError('请选择国家/地区');
                input_country.e.closest('.r_input_1').addClass('r_input_1_cur');
            } else {
                input_country.status = true;
            }
        }).click(function(){
            $('.r_select_list').show();
        }).change(function(){
            input_country.i.hide();
            input_country.e.closest('.r_input_1').removeClass('r_input_1_cur');
        });
        $('.r_select_arrow').click(function(){
            $('.r_select_list').show();
            setTimeout(function(){
                that.btnClick = true;
            },500);
        });
        $('body').click(function(){
            if($('.r_select_list:visible').length && that.btnClick){
                $('.r_select_list').hide();
                that.btnClick = false;
            }
        });
        $('.r_select_box .place-holder-sm').addClass('place-holder-sm-pos');
        if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
            $('.r_select_box .place-holder-sm').css('margin-left','-98px');
        }
        $('.r_select_list').mouseenter(function(){
            that.showSelect = true;
        }).mouseleave(function(){
            that.showSelect = false;
        });
        $('.r_select_list li').click(function(e){
            input_country.e.val($(this).html());
            input_country.e.countryId = $(this).attr('data-id');
            $('.r_select_list').hide();
            $('.r_select_box .place-holder-sm').hide();
            input_country.i.hide();
            input_country.e.closest('.r_input_1').removeClass('r_input_1_cur');
        });

        return input_country;
        //}}}
    },
    /*
    initGetActiveCodeBtn : function(){
        //{{{
        var that = this;
        var getcode_btn = new sendCodeButton('#get-code-btn');
        getcode_btn.state = false;
        getcode_btn.setButtonText('获取手机验证码');
        getcode_btn.e.click(function(){
            that.input_mobile.e.blur();
            that.input_imageVerifyCode.e.blur();
            if (getcode_btn.state == false){
                that.getActiveCode();
            }
        });

        return getcode_btn;
        //}}}
    },
    */
    checkMobileExist : function(mobile,nationName,nationCode,source){
        var source = source ? source : 'normal';
        //{{{
        var defer = $.Deferred();
        XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_CheckMobileExist(mobile,nationName,nationCode,source),{},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    checkEmailExist : function(email){
        //{{{
        var defer = $.Deferred();
        XZWebAjax.post(XZWebUrlWriter.getAjax_CheckEmailExist(), {email:email},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    checkUserNameExist : function(username){
        //{{{
        var defer = $.Deferred();
        XZWebAjax.post(XZWebUrlWriter.getAjax_CheckUsernameExist(username),{},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    checkImageVerifyCode : function(verifyCode){
        //{{{
        var defer = $.Deferred();
        XZWebAjax.post(XZWebUrlWriter.getAjax_CheckVerifyCode(),{verifycode:verifyCode},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    checkActiveCode : function(mobile,nationName,nationCode,activateCode){
        //{{{
        var defer = $.Deferred();
        XZWebAjax.post(XZWebUrlWriter.getAjax_CheckActiveCode(mobile,nationName,nationCode,activateCode),{},true,function(data){
            defer.resolve(data);
        });
        return defer.promise();
        //}}}
    },
    centerRegLoginForm : function(width,height){
        //{{{
        var win = $(window);
        var top = win.scrollTop() + (win.height() - height)/2;
        var left = (win.width() - width)/2;
        left = left >= 200 ? left : 200;
        top = top >= 90 ? top : 90;
        $('.loginbox').css({
                position:'absolute',
                'left': left,
                'top': top,
                'z-index' : 1
        });
        //}}}
    },
    pageLoginDirect : function(){
        //{{{
        $('body').on('click','.login-direct',function(e){
            e.preventDefault();
            var next = $('#next').val();
            window.location.href = $(this).attr('href') + 'next=' + encodeURIComponent(next);
        });
        //}}}
    }
    //}}}
}
//模拟实现ie低版本placeholder
jQuery(function(){
    //{{{
    jQuery.fn.placeholder = function(){
        var i = document.createElement('input'),
            placeholdersupport = 'placeholder' in i;
        if(!placeholdersupport){
            var inputs = jQuery(this);
            inputs.each(function(){
                var input = jQuery(this),
                text = input.attr('placeholder'),
                pdl = 0,
                height = input.outerHeight(),
                width = input.outerWidth(),
                placeholder = jQuery('<span class="place-holder-sm">'+text+'</span>');
            try{
                pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
            }catch(e){
                pdl = 5;
            }
            placeholder.css({'margin-left': -(width-pdl),'height':height,'line-height':height+"px",'position':'absolute', 'color': "#c2cacd", 'font-size' : "12px"});
            placeholder.click(function(){
                input.focus();
            });
            if(input.val() != ""){
                placeholder.css({display:'none'});
            }else{
                placeholder.css({display:'inline'});
            }
            placeholder.insertAfter(input);
            input.focus(function(e){
                placeholder.html(input.attr('placeholder'));
            });
            input.keyup(function(e){
                if(jQuery(this).val() != ""){
                    placeholder.css({display:'none'});
                }else{
                    placeholder.css({display:'inline'});
                }
            });
            });
        }
        return this;
    };
    $('input[placeholder]').placeholder();
    //}}}
});
 
 $(function(){
    $('.loginbox').show();
    RegisterLoginComponent.centerRegLoginForm(668,423);
    $(window).resize(function(){
         RegisterLoginComponent.centerRegLoginForm(668,423);
    });

    var mobileNum = 0;
    var input_imageVerifyCode = RegisterLoginComponent.initInputImageVerifyCode();
    input_imageVerifyCode.e.keydown(function(e){
        if (e.keyCode == 13) {
            $("#orgBtn").trigger('click');
            return;
        };
    });

    $(".r_tab li").click(function () {
        var $this = $(this);
        var index = $this.index();
        $(this).addClass("underL1").siblings().removeClass("underL1");
        var general_mobile = $("#mobileLi").is('.underL1');
        if(general_mobile){
            $('#quick-input-mobile').removeClass('r_input_1').addClass('r_input_small');
            $('#quick-input-mobile').after($('.region.nation-num'));
            $('#quick-input-mobile').next('.region.nation-num').attr('style','display:inline-block');
            $('#input-username').next('.region.nation-num').remove();
            $('#quick-input-mobile').val('').removeClass("r_input_small_cur");
            $('#quick-image-code').removeClass("r_input_small_cur");
            $('#quick-image-code-tip').hide();
            $('#quick-activate-code').val('').removeClass("r_input_small_cur");
            $('#quick-activate-code-tip').hide();
            $('#quick-input-mobile-tip').hide();
            $("#generalLogin").hide();
            $("#mobileLogin").show();
            XZWebMobileQuickLogin.initMobileLoginForm();
        }else{
            $('#input-username').removeClass('r_input_small').addClass('r_input_1');
            $('#input-username').after($('.region.nation-num'));
            $('#input-username').next('.region.nation-num').hide();
            $('#quick-input-mobile').next('.region.nation-num').remove();
            $('#input-username').val('').removeClass("r_input_1_cur");
            $('#input-username').val('').removeClass("r_input_small_cur");
            $('#input-username-tip').hide();
            $('#password').val('').removeClass("r_input_1_cur");
            $('#password-tip').hide();
            $('#image-verify-code').val('');
            pub.resetVerifyCode("#img_imagecodes");
            $('#image-verify-code').removeClass("r_input_small_cur");
            $("#mobileLogin").hide();
            $("#generalLogin").show();
            //input_imageVerifyCode = RegisterLoginComponent.initInputImageVerifyCode();
        }
    })
    var input_username = new inputBox('#input-username', '#input-username-tip', {
        placeHolder:'手机号、邮箱'
    });
    var input_password = new inputBox('#password', '#password-tip', {
        placeHolder:'密码'
    });
    input_username.e.blur(function(){
        if($(this).val() == '')
        {
            input_username.e.addClass("r_input_1_cur");
            input_username.showError('请输入手机号或邮箱');
            return false;
        }else{
            //普通登录 //需要判断是否有nationcode等
            var nationName = $('.region').is(":hidden") ? '' : $('.nation-cont i').attr('tag');
            var nationCode = $('.region').is(":hidden") ? '' : $('.nation-cont i').attr('code');
            XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_CheckRegistExist(),{user:$(this).val(),nationName:nationName,nationCode:nationCode},true,function(userRegist){
            var errColor = $('.region').is(":hidden") ? 'r_input_1_cur' : 'r_input_small_cur';
                if(userRegist.status == 0){
                    input_username.e.addClass(errColor);
                    input_username.showError(userRegist.errmsg);
                    return false;
                }
                input_username.e.removeClass(errColor);
                input_username.hideTip();
                return false;
            });
        }
    })
    //keyup input
    input_username.e.keyup(function(e){
        $('#input-username-tip').hide();
        input_username.e.removeClass("r_input_1_cur");
        input_username.e.removeClass("r_input_small_cur");
        var checkisNum  =  /^[0-9]+$/; //全数字则显示否则隐藏
        var inputVal = input_username.e.attr('value');
        var lastVal = inputVal.substr(inputVal.length-1,1);
        if( checkisNum.test(lastVal) && checkisNum.test(inputVal)){
            $('.region.nation-num').attr('style','display:inline-block');
            $('#input-username').removeClass('r_input_1');
            $('#input-username').addClass('r_input_small');
        }else{
            $('#input-username').removeClass('r_input_small');
            $('#input-username').addClass('r_input_1');
            $('.region.nation-num').hide();
        }
    })
    //bycl1226
    input_username.e.change(function(e){
        $('#input-username-tip').hide();
        input_username.e.removeClass("r_input_1_cur");
        input_username.e.removeClass("r_input_small_cur");
        var checkisNum  =  /^[0-9]+$/; //全数字则显示否则隐藏
        var inputVal = input_username.e.attr('value');
        var lastVal = inputVal.substr(inputVal.length-1,1);
        if( checkisNum.test(lastVal) && checkisNum.test(inputVal)){
            $('.region.nation-num').attr('style','display:inline-block');
            $('#input-username').removeClass('r_input_1');
            $('#input-username').addClass('r_input_small');
        }else{
            $('#input-username').removeClass('r_input_small');
            $('#input-username').addClass('r_input_1');
            $('.region.nation-num').hide();
        }
    })
    input_password.e.blur(function(){
        if($(this).val() == '')
        {
            input_password.e.addClass("r_input_1_cur");
            input_password.showError('请输入密码');
            return false;
        }
        else {
            input_password.e.removeClass("r_input_1_cur");
            input_password.showOk();
            input_password.hideTip();
            return false;
        }
    })
    .keyup(function(e) {
        if (e.keyCode == 13) {
            $("#orgBtn").trigger('click');
            return;
        };
        $('#password-tip').hide();
        input_password.e.removeClass("r_input_1_cur");
    });

    $("#orgBtn").click(function(){
        var username = $.trim($("#input-username").val());
        var password = $.trim($("#password").val());
        var lodgeid=$.trim($("#lodgeid").val());
        var verifyCode = $.trim($("#image-verify-code").val());
        var nationName = $('.region').is(":hidden") ? '' : $('.nation-cont i').attr('tag');
        var nationCode = $('.region').is(":hidden") ? '' : $('.nation-cont i').attr('code');
        $.when((function(){
            var def = $.Deferred();
            input_username.e.blur();
            input_password.e.blur();
            if($("#image-verify-code").is(":visible"))
            {
                input_imageVerifyCode.e.blur();
            }
            input_imageVerifyCode.e.blur();
            setTimeout(function(){
                def.resolve();
            },500);
            return def.promise();
        })()).done(function(){
            if(!(input_username.status && input_password.status))
            {
                return false;
            }
            if($("#image-verify-code").is(":visible"))
            {
                if(!input_imageVerifyCode.status)
                {
                    return false;
                }
            }
            var setcookie =  0;
            if($('#setcookie').is(':checked') == true){
                setcookie = 14;
            }

            $("#orgBtn").text('正在登录...');
            XZWebAjax.post(XZWebUrlWriter.getAjax_Login(),
            {username:username, password:password, verifycode:verifyCode, setcookie:setcookie,lodgeid:lodgeid,nationName:nationName,nationCode:nationCode},
            true,
            function(returndata){
                if(returndata.status == 0) {
                    var checker = checkmobile(username);
                    if(checker.rst == true){
                        mobileNum+=1;
                    }
                    $("#image-verify-code").val('');
                    $("#image-verify-code").blur();
                    if(returndata.verifycode) {
                        $("#verify-show").show();
                        pub.resetVerifyCode('#img_imagecodes');
                    }
                    //location.reload();
                    if(mobileNum>3){
                        input_password.e.addClass("r_input_1_cur");
                        input_password.showError("您输入的密码不正确，可以尝试短信快捷登录");
                    }else{
                        if(returndata.error == '账户和密码不匹配'){
                            input_password.e.addClass("r_input_1_cur");
                            input_password.showError(returndata.error);
                        }else{
                            input_username.e.addClass("r_input_1_cur");
                            input_username.showError(returndata.error);
                        }
                    }
                    $("#orgBtn").html('登录');
                    return false;
                }else if (returndata.status == 1){
                    if(returndata.next){
                        if(returndata.backnext == 1){
                            var hint = $("#hint").val();
                            if(hint){
                                window.location.href = "http://jci.xiaozhustatic1.com/";
                            }else{
                                location.reload();
                            }
                        }else{
                            window.location.href = returndata.next;
                        }
                    }
                } else if (returndata.status == 2) {
                    alert(returndata.error);
                    $('#orgBtn').text('登录');
                }
            });
        });
    });
    $('body').on('click',"#closeUserLoginDialog",function(e){
        $('#input-username').attr("disabled",'true');
        $('#password').attr("disabled","true");
        $('#image-verify-code').attr("disabled","true");
        $('#quick-input-mobile').attr("disabled",'true');
        $('#quick-image-code').attr("disabled","true");
        $('#quick-activate-code').attr("disabled","true");

        $('#userlogindialog').dialog('destroy');
        $('body').eq(0).css('overflow','visible');
    });

    $('body').on('click',".logindialog",function(e){
        XZWebAjax.get(XZWebUrlWriter.getAjax_nationCodeHtml(),{},true,
            function(ajaxRsponse){
                if(ajaxRsponse.status == 1){
                    if($(".region.nation-num")){
                        $(".region.nation-num").remove();
                    }
                    if($("#mobileLi").hasClass('underL1')){
                        $('#quick-input-mobile').after(ajaxRsponse.sucmsg);
                    }else{
                        $('#input-username').after(ajaxRsponse.sucmsg);
                        $('.region.nation-num').hide();
                        $('#input-username').removeClass('r_input_small');
                        $('#input-username').addClass('r_input_1');
                    }
                } else {
                    alert(ajaxResponse.errmsg);
                }
        });
        e.preventDefault();
        var isVerifyCode = XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjax_VerifyCodeFirstShow(),'json');
        if(isVerifyCode.status){
            $("#verify-show").show();
            pub.resetVerifyCode('#img_imagecodes');
        }
        if($('#registerDialog:visible').length){
            XZWebRegByMobileDialog.clearDialogValue();
            XZWebRegByMobileDialog.closeRegisterDialog();
        }
        $("#orgBtnMobile").html('登录');
        var general_mobile = $("#mobileLi").is('.underL1');
        if(general_mobile){
            XZWebMobileQuickLogin.initMobileLoginForm();
        }
        $("body").eq(0).css("overflow","hidden");
        $('#userlogindialog').dialog({
            width:698,
            hide:true,
            resizable: false,
            modal:true,
            zIndex : 7000
        })

        var dialog = $("#userlogindialog").parent('.ui-dialog');
        dialog.css({top:dialog.position().top+15,position:'absolute'});
        //$('#userlogindialog').parent().removeClass('ui-widget-content');
        //$('#userlogindialog').removeClass('ui-widget-content ui-dialog-content ui-dialog');
        $('.ui-widget-overlay').css({background:'none repeat scroll 0 0 #000',opacity:'0.5'});
        $('.ui-dialog-titlebar').hide();
        $('#input-username').removeAttr("disabled");
        $('#password').removeAttr("disabled");
        $('#image-verify-code').removeAttr("disabled","true");
        $('#quick-input-mobile').removeAttr("disabled",'true');
        $('#quick-image-code').removeAttr("disabled","true");
        $('#quick-activate-code').removeAttr("disabled","true");

        //$('#userlogindialog .show-register-box').unbind('click');
        $('#userlogindialog .show-register-box').click(function(){
            //$('#userlogindialog').dialog('destroy');
            $('#input-username').attr("disabled",'true');
            $('#password').attr("disabled","true");
            //if($('#loginUserId').length == 0){
            //    XZWebRegByMobileDialog.showRegForm();
            //}
            $('#input-username').attr("disabled",'true');
            $('#password').attr("disabled","true");
            $('#img_imagecodes').attr("disabled","true");
            $('#quick-input-mobile').attr("disabled",'true');
            $('#quick-image-code').attr("disabled","true");
            $('#quick-activate-code').attr("disabled","true");
        });
    });

})

 
 $(function(){
    window.XZWebMobileQuickLogin = {
        //{{{
        init : function(options){
           //{{{
           this.showByDialog = options.showByDialog;
           this.input_mobile = RegisterLoginComponent.initInputMobile(
               {element:'#quick-input-mobile',tipHolder:'#quick-input-mobile-tip',focusPlaceHolder:'手机号',existCheck:false});
           this.input_imageVerifyCode = RegisterLoginComponent.initInputImageVerifyCode(
              {element:'#quick-image-code',tipHolder:'#quick-image-code-tip'});
           this.initInputActiveCode({element:'#quick-activate-code',tipHolder:'#quick-activate-code-tip'});
           this.initGetCodeBtn();
           this.initMobileBtn();
           var that = this;
           $('#closeUserLoginDialog').click(function(){
                that.clearDialogValue();
           });
           //}}}
        },
        initMobileBtn : function(){
            //{{{
            var that = this;
            this.hasCommit = false;
            $("#orgBtnMobile").click(function(e){
                e.preventDefault();
                if(that.hasCommit){
                    return false;
                }
                that.hasCommit = true;
                $.when((function(){
                    var def = $.Deferred();
                    //if(!that.input_mobile.isCheck){
                        that.input_mobile.e.blur();
                    //}
                    //if(!that.input_imageVerifyCode.isCheck){
                        //that.input_activateCode.e.addClass('r_input_small_cur');
                        that.input_imageVerifyCode.e.blur();
                    //}
                    //if(!that.input_activateCode.isCheck){
                        that.input_activateCode.e.blur();
                    //}
                    setTimeout(function(){
                        def.resolve();
                    },500);

                    return def.promise();
                })()).done(function(){
                    if(!(that.input_mobile.status && that.input_imageVerifyCode.status && that.input_activateCode.status)){
                        that.hasCommit = false;
                        return false;
                    }
                    that.loginByMobile();
                });
            });
            //}}}
        },
        initMobileLoginForm : function(){
           //{{{
           pub.resetVerifyCode('#img_imagecodeMobile');
           this.input_mobile.status = false;
           this.input_imageVerifyCode.e.val('');
           //}}}
        },
        initMobieInfoForm : function(){
            //{{{
            this.input_username = RegisterLoginComponent.initInputUserName(
                    {element:'#quick-input-username',tipHolder:'#quick-input-username-tip'});
            this.input_password = RegisterLoginComponent.initInputPassWord(
                    {element:'#quick-regpassword',tipHolder:'#quick-regpassword-tip'});
            this.input_password.e.keydown(function(e){
                if (e.keyCode == 13) {
                    $("#mobileInfoPerfeactBtn").trigger('click');
                }
            });
            this.input_inviteCode = RegisterLoginComponent.initInputInviteCode(
                    {element:'#quick-invitecode',tipHolder:'#quick-invitecode-tip'});
            this.input_inviteCode.e.keydown(function(e){
                if (e.keyCode == 13) {
                    $("#mobileInfoPerfeactBtn").trigger('click');
                }
            });
            //}}}
        },
        initGetCodeBtn : function(){
            //{{{
            var that = this;
            var getcode_btn = new sendCodeButton('#quick-get-code-btn',{second:120});
            getcode_btn.state = false;
            getcode_btn.e.click(function(){
                $.when((function(){
                    if(getcode_btn.state){
                        return true;
                    }
                    var def = $.Deferred();
                    $('#quick-activate-code').removeClass('r_input_small_cur');
                    that.input_activateCode.i.hide();
                    //if(!that.input_mobile.isCheck){
                        that.input_mobile.e.blur();
                    //}
                    if(that.input_imageVerifyCode.codeSendSuc){
                        pub.resetVerifyCode('#img_imagecodeMobile');
                        that.input_imageVerifyCode.e.val('');
                        that.input_imageVerifyCode.e.focus();
                        that.input_imageVerifyCode.status = false;
                        that.input_imageVerifyCode.codeSendSuc = false;
                    }
                    //if(!that.input_imageVerifyCode.isCheck){
                        that.input_imageVerifyCode.e.blur();
                    //}
                    setTimeout(function(){
                        def.resolve();
                    },500);

                    return def.promise();
                })()).done(function(){
                    if (!(that.input_mobile.status && that.input_imageVerifyCode.status)){
                        return false;
                    }
                    if (getcode_btn.state == false){
                        that.getActiveCode();
                    }
                });
            });

            this.getcode_btn = getcode_btn;
            //}}}
        },
        initInputActiveCode : function(options){
            //{{{
            var that = this;
            var options = options || {};
            options = $.extend({
                element : '#activate-code',
                tipHolder : '#activate-code-tip',
                defaultPlaceHolder : '动态验证码'
            },options);

            var input_activateCode = new inputBox(options.element, options.tipHolder, {
                placeHolder:options.defaultPlaceHolder
            });
            input_activateCode.e.keydown(function(){
                input_activateCode.e.removeClass('r_input_small_cur');
                input_activateCode.i.hide();
            }).blur(function(){
                var activateCode = $(this).val();
                if (activateCode == "") {
                    input_activateCode.e.addClass('r_input_small_cur');
                    input_activateCode.showError("请输入动态验证码");
                    return;
                }
                //需要先验证手机
                if(activateCode.length != 4 || !that.input_mobile.status){
                    input_activateCode.e.addClass('r_input_small_cur');
                    input_activateCode.showError("动态验证码错误");
                    return;
                }
                input_activateCode.status = true;
            }).keydown(function(e){
                if (e.keyCode == 13) {
                    $("#orgBtnMobile").trigger('click');
                }
            });

            this.input_activateCode = input_activateCode;
            //}}}
        },
        clearDialogValue : function(){
            //{{{
            $('#input-username').val('');
            $('#password').val('');
            this.input_mobile.e.val('');
            this.input_activateCode.e.val('');
            clearInterval(this.getcode_btn.intervalProcess);
            this.getcode_btn.setButtonText('获取动态验证码');
            this.getcode_btn.state = false;
            this.input_imageVerifyCode.codeSendSuc = false;
            this.getcode_btn.e.removeClass('no-nb').addClass('have-nb');
            $('.r_error_tip').hide();
            $('.r_input_1_cur').removeClass('r_input_1_cur');
            $('.r_input_small_cur').removeClass('r_input_small_cur');
            //}}}
        },
        showPerfeactInfoForm : function(){
            //{{{
            this.initMobieInfoForm();
            var that = this;
            $('#pageLoginDialog').hide();
            $('#mobilePerfeactInfoDialog').show();
            $('#mobilePerfeactInfoDialog').parent().css({top: ($(window).height()) * 0.5 - $('#mobilePerfeactInfoDialog').parent().height()*0.5});
            $('#mobilePerfeactInfoDialog').parent().css({left: ($(window).width()) * 0.5 - $('#mobilePerfeactInfoDialog').parent().width()*0.5});
            $('#mobileInfoPerfeactBtn').unbind('click');
            that.hasCommit = false;
            $('#mobileInfoPerfeactBtn').click(function(e){
                if (false == canClickRequest) {
                    var shakDom = $(this).next();
                    var shaker = new shaking(shakDom[0]);
                    shaker.run();
                    return false;
                }
                e.preventDefault();
                if(that.hasCommit){
                    return false;
                }
                that.hasCommit = true;
                that.doRegister(function(reg_rst){
                    if (reg_rst.status == 0) {
                        alert(reg_rst.msg);
                        return true;
                    } else {
                        window.location.href = reg_rst.next;
                    }
                });
            });
            //}}}
        },
        showPerfeactInfoDialog : function(){
            //{{{
            this.initMobieInfoForm();
            var that = this;
            $('#userlogindialog').dialog('close');
            $('#mobilePerfeactInfoDialog').dialog({
                width : 403,
                resizable: false,
                modal:true,
                position: "center"
            }).parent('.ui-dialog').find('.ui-dialog-titlebar').hide().end().find('.perfeact-info-content').show();
            var dialog = $("#mobilePerfeactInfoDialog").parent('.ui-dialog');
            dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'fixed'});
            dialog.css('z-index', '7777');
            $('.ui-widget-overlay').css('z-index', '7776');

            $('#mobilePerfeactInfoBtn').unbind('click');
            $('#mobilePerfeactInfoBtn').click(function(e){
                that.clearDialogValue();
                $('#mobilePerfeactInfoDialog').dialog('close');
            });
            $('#mobileInfoPerfeactBtn').unbind('click');
            that.hasCommit = false;
            $('#mobileInfoPerfeactBtn').click(function(e){
                if (false == canClickRequest) {
                    var shakDom = $(this).next();
                    var shaker = new shaking(shakDom[0]);
                    shaker.run();
                    return false;
                }
                e.preventDefault();
                if(that.hasCommit){
                    return false;
                }
                that.hasCommit = true;
                that.doRegister(function(reg_rst){
                    if (reg_rst.status == 0) {
                        alert(reg_rst.msg);
                        return true;
                    } else {
                        $('#mobilePerfeactInfoDialog').dialog('close');
                        $('#regSuccessDialog').dialog({
                            width : 568,
                            resizable: false,
                            modal:true,
                            position: "center"
                        }).parent('.ui-dialog').css({'z-index':9000,'background':'none'})
                        .find('.ui-dialog-titlebar').hide().end().find('#regSuccInfo').html(reg_rst.html);
                        var dialog = $("#regSuccessDialog").parent('.ui-dialog');
                        dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'fixed'});
                        $('#closeRegSuccDialogBtn,returnOriBtn').unbind('click');
                        $('#closeRegSuccDialogBtn,returnOriBtn').click(function(){
                            window.location.reload();
                        });
                    }
                });
            });
            //}}}
        },
        getActiveCode : function(){
            //{{{
            $('#quick-get-code-btn').html('发送中...');
            var ajaxRsponse =  pub.sendQuickLoginCode(this.input_imageVerifyCode.e.val(), $(".nation-cont i").attr('tag'),$(".nation-cont i").attr('code'), this.input_mobile.e.val());
            if(ajaxRsponse.status != 0){
               this.handleSendActiveCodeErr(ajaxRsponse);
            } else {
               this.handleSendActiveCodeSuc(ajaxRsponse);
            }
            //}}}
        },
        handleSendActiveCodeErr : function(ajaxRsponse){
            //{{{
            if(ajaxRsponse.status == 2){
                this.input_mobile.e.addClass('r_input_1_cur');
                this.input_mobile.showError(ajaxRsponse.error);
            } else {
                this.input_activateCode.showError(ajaxRsponse.error);
                pub.resetVerifyCode('#img_imagecodeMobile');
                this.input_imageVerifyCode.e.val('').focus();
                this.getcode_btn.state = false;
                this.getcode_btn.start(120);
            }
            $('#quick-get-code-btn').html('重新发送');
            //}}}
        },
        handleSendActiveCodeSuc : function(ajaxRsponse){
            //{{{
            this.getcode_btn.state = false;
            this.input_imageVerifyCode.codeSendSuc = true;
            this.getcode_btn.start(120);
            //}}}
        },
        loginByMobile : function(){
            //{{{
            var that = this;
            var setcookie =  0;
            var lodgeid=$.trim($("#lodgeid").val());
            if($('#setcookie').is(':checked') == true){
                setcookie = 14;
            }
            $("#orgBtnMobile").text('正在登录...');
            XZWebAjax.post(XZWebUrlWriter.getAjax_LoginMobile(),
                    {usermobile : that.input_mobile.e.val(),
                        nationName : $(".nation-cont i").attr('tag'),
                        nationCode : $(".nation-cont i").attr('code'),
                        mobileVerifycode : $("#quick-activate-code").val(),
                setcookie : setcookie,
                lodgeid : lodgeid}
                ,true,
                function(returndataMobile){
                    that.hasCommit = false;
                    if(returndataMobile.status == 0){
                        that.input_activateCode.showError(ajaxRsponse.error);
                        $("#orgBtnMobile").html('登录');
                        return false;
                    } else if(returndataMobile.status == 1){
                        if(returndataMobile.backnext == 1){
                            var hints = $("#hint").val();
                            if(hints){
                                window.location.href = "http://jci.xiaozhustatic1.com/";
                            }else{
                                location.reload();
                            }
                        }else{
                            window.location.href = returndataMobile.next;
                        }
                    } else if(returndataMobile.status == 2){
                        if(XZWebMobileQuickLogin.showByDialog){
                            that.showPerfeactInfoDialog();
                        } else {
                            that.showPerfeactInfoForm();
                        }
                    } else if(returndataMobile.status == 3){
                        that.input_activateCode.e.addClass('r_input_small_cur');
                        that.input_activateCode.showError(returndataMobile.error);
                        $("#orgBtnMobile").html('登录');
                    }else if(returndataMobile.status == 4){
                        that.input_mobile.e.addClass('r_input_1_cur');
                        that.input_mobile.showError(returndataMobile.error);
                    }else if (returndataMobile.status == 5) {
                        alert(returndataMobile.error);
                        $("#orgBtnMobile").html('登录');
                    }else{
                        that.input_activateCode.showError('操作异常,稍后重试');
                        $("#orgBtnMobile").html('登录');
                    }
                });
            //}}}
        },
        doRegister : function(afterRegister){
            //{{{
            var that = this;
            var inviteCodeCheck = false;
            $.when((function(){
                var def = $.Deferred();
                //if(!that.input_username.isCheck){
                    that.input_username.e.blur();
                //}
                //if(!that.input_password.isCheck){
                    that.input_password.e.blur();
                //}
                inviteCodeCheck = that.input_inviteCode.checkInviteCode();
                setTimeout(function(){
                    def.resolve();
                },500);

                return def.promise();
            })()).done(function(){
                if(!(that.input_mobile.status && that.input_username.status && that.input_password.status && inviteCodeCheck)){
                    that.hasCommit = false;
                    return false;
                }
                var afterGetSpiderToken = function () {
                    var next = $("#next").val();
                    var reg_rst = pub.doRegisterByMobile(
                        that.input_mobile.e.val(),
                        //nationName
                        $('.nation-cont i').attr('tag'),
                        //nationCode
                        $('.nation-cont i').attr('code'),
                        that.input_username.e.val(),
                        that.input_password.e.val(),
                        that.input_activateCode.e.val(),
                        next,
                        '',
                        '',
                        '',
                        that.input_inviteCode.e.val(),
                        '',
                        true
                    );

                    afterRegister(reg_rst);
                };
                if (localStorage.getItem('SAFE_CHECKED_register') === 'no') {
                    var captcha = new Captcha({
                        init: window.captchaModel.showModel,
                        onSuccess: function () {
                            window.captchaModel.hideModel();
                            afterGetSpiderToken();
                        },
                        busiKey: 'register'
                    });
                } else {
                    afterGetSpiderToken();
                }
            });
            //}}}
        }
        //}}}
    }

    if($('#mobileLi').attr('dialog') == '0'){
        XZWebMobileQuickLogin.init({showByDialog:false});
    } else {
        XZWebMobileQuickLogin.init({showByDialog:true});
    }

});
if($('#actionName').val() == 'Front_Login'){

    XZWebAjax.get(XZWebUrlWriter.getAjax_nationCodeHtml(),{},true,
        function(ajaxRsponse){
            if(ajaxRsponse.status == 1){
                $('#input-username').after(ajaxRsponse.sucmsg);
                $('.region.nation-num').hide();
            } else {
                alert(ajaxResponse.errmsg);
            }
    });
}
 
 var XZWebRegByMobile = {
    //{{{
    init : function() {
        //{{{
        this.input_mobile = RegisterLoginComponent.initInputMobile({'focusPlaceHolder':'请输入手机号'});
        this.input_imageVerifyCode = RegisterLoginComponent.initInputImageVerifyCode(
                {element:'#reg-image-code',tipHolder:'#reg-image-code-tip'});
        this.input_imageVerifyCode.e.keydown(function(e){
            if (e.keyCode == 13) {
                $("#reg-btn").trigger('click');
            }
        });
        this.input_inviteCode = RegisterLoginComponent.initInputInviteCode();
        this.input_inviteCode.e.keydown(function(e){
            if (e.keyCode == 13) {
                $("#reg-btn").trigger('click');
            }
        });
        this.input_password = RegisterLoginComponent.initInputPassWord({focusPlaceHolder:'请输入6-12位字母、数字或符号'});
        this.input_password.e.keydown(function(e){
            if (e.keyCode == 13) {
                $("#regConfirmBtn").trigger('click');
            }
        });
        this.initRegBtn();
        this.oriMobileNum = '';

        //}}}
    },
    initRegBtn : function(){
        //{{{
        //这种写法主要原因是最初在原有代码的基础上使用的是同步ajax调用机制，在谷歌浏览器没问题
        //但是在火狐浏览器中，这种同步请求很容易阻塞ui进程，造成ui的瞬间假死，点击无效.
        var that = this;
        //防止重复点击
        this.hasCommit = false;
        $('#reg-btn').click(function(e){
            if (false == canClickRequest) {
                var shakDom = $(this).next();
                var shaker = new shaking(shakDom[0]);
                shaker.run();
                return false;
            }
            e.preventDefault();
            if(that.hasCommit){
                return false;
            }
            // 忽略自动化滑动验证 处理未通过安全验证
            if(cookieApi.getCookie('isAutoTest') !== 'yes' &&
                localStorage.getItem('SAFE_CHECKED_register') === 'no'){
                $("#input-slidecode-tip").css('display','block');
                return;
            }

            that.hasCommit = true;
            var inviteCodeCheck = false;
            $.when((function(){
                var def = $.Deferred();
                //if(!that.input_mobile.isCheck){
                   that.input_mobile.e.blur();
                //}
                //if(!that.input_imageVerifyCode.isCheck){
                   that.input_imageVerifyCode.e.blur();
                //}
                inviteCodeCheck = that.input_inviteCode.checkInviteCode();
                setTimeout(function(){
                    def.resolve();
                },500)
                return def.promise();
            })())
            .done(function(){
                if (!(that.input_mobile.status && inviteCodeCheck)) {
                    that.hasCommit = false;
                    return true;
                }
                that.showPerfectInfoForm();
                if(that.input_mobile.e.val() != that.oriMobileNum){
                    if(!that.getcode_btn){
                       that.initGetCodeBtn();
                    }
                    that.getActiveCode();
                }
            });
        });
        //}}}
    },
    initGetCodeBtn : function(){
        //{{{
        var getcode_btn = new sendCodeButton('#get-code-btn');
        var that = this;
        getcode_btn.e.click(function(){
            if (that.getcode_btn.state == false){
                that.showRegForm({resetImage:true});
                that.oriMobileNum = '';
                that.input_imageVerifyCode.e.focus();
            }
        });
        this.getcode_btn = getcode_btn;
        //}}}
    },
    initRegConfirmBtn : function(options){
        //{{{
        var options = options || {};
        options = $.extend({
            ajaxShowSucc : false
        },options);

        var that = this;
        this.hasCommit = false;
        $('#regConfirmBtn').click(function(e){
            e.preventDefault();
            if(that.hasCommit){
                return false;
            }
            that.hasCommit = true;
            $.when((function(){
                var def = $.Deferred();
                //if(!that.input_activateCode.isCheck){
                    that.input_activateCode.e.blur();
                //}
                //if(!that.input_username.isCheck){
                    that.input_username.e.blur();
                //}
                //if(!that.input_password.isCheck){
                    that.input_password.e.blur();
                //}
                if(!$('#activate-code-tip:visible').length){
                    that.checkActiveCode();
                }
                setTimeout(function(){
                    def.resolve();
                },500);

                return def.promise();
            })())
            .done(function(){
                if (!(that.input_activateCode.status && that.input_username.status && that.input_password.status)) {
                    that.hasCommit = false;
                    return true;
                }
                var next = $("#next").val();
                var nationName = $('.nation-cont i').attr('tag');
                var nationCode = $('.nation-cont i').attr('code');
                var reg_rst = pub.doRegisterByMobile(
                    that.input_mobile.e.val(),
                    nationName,
                    nationCode,
                    that.input_username.e.val(),
                    that.input_password.e.val(),
                    that.input_activateCode.e.val(),
                    next,
                    '',
                    '',
                    '',
                    that.input_inviteCode.e.val(),
                    '',
                    options.ajaxShowSucc
                );
                that.hasCommit = false;
                if (reg_rst.status == 0) {
                    that.handleRegErr(reg_rst);
                } else {
                    XZWebUrlWriter.getRequest(XZWebUrlWriter.getAjax_ChannelStatistics(reg_rst.objid, 'userfrom', localStorage.getItem('referrerStatistics'), reg_rst.statisticsSign));
                    that.handleRegSuc(reg_rst);
                }
            });
        });
        //}}}
    },
    initInputActiveCode : function(options){
        //{{{
        var that = this;
        var options = options || {};
        options = $.extend({
            element : '#activate-code',
            tipHolder : '#activate-code-tip',
            defaultPlaceHolder : '手机验证码'
        },options);

        var input_activateCode = new inputBox(options.element, options.tipHolder, {
            placeHolder:options.defaultPlaceHolder
        });

        input_activateCode.e.keyup(function(){
            input_activateCode.i.hide();
            input_activateCode.e.removeClass('r_input_small_cur');
        }).blur(function(){
            var activateCode = $(this).val();
            var checker = checkactivateCode(activateCode);
            if (checker.rst == false) {
                input_activateCode.showError(checker.msg);
                input_activateCode.e.addClass('r_input_small_cur');
                return true;
            }
            //input_activateCode.status = true;
            /*
            $.when(RegisterLoginComponent.checkActiveCode(that.input_mobile.e.val(),input_activateCode.e.val()))
            .done(function(ajaxCheck){
                if (ajaxCheck.status == 0){
                    input_activateCode.showError(ajaxCheck.errmsg);
                    input_activateCode.e.addClass('r_input_small_cur');
                }else{
                    input_activateCode.status = true;
                }
            });
            */
        });

        this.input_activateCode = input_activateCode;
        //}}}
    },
    getActiveCode : function(){
        //{{{
        window.clearInterval(this.getcode_btn.intervalProcess);
        this.getcode_btn.e.html('发送中...');
        XZWebAjax.postSpider('',true,XZWebUrlWriter.getAjax_SendActivateCode(this.input_mobile.e.val(),$(".nation-cont i").attr('tag'),$(".nation-cont i").attr('code'),this.input_imageVerifyCode.e.val()),{},true,
        function(ajaxRsponse){
            if(ajaxRsponse.status == 0){
                XZWebRegByMobile.handleSendActiveCodeErr(ajaxRsponse);
            } else {
                XZWebRegByMobile.handleSendActiveCodeSuc(ajaxRsponse);
            }
        });
        //}}}
    },
    showRegForm : function(options){
        //{{{
        var options = options || {};
        options = $.extend({resetImage:false},options);
        $("#mobileRegisterInfoDialog").hide();
        $("#registerDialog").show();
        if(options.resetImage){
           pub.resetVerifyCode('img.change-verify-image');
        }
        this.input_imageVerifyCode.e.val('');
        //}}}
    },
    showPerfectInfoForm : function(){
        //{{{
        var that = this;
        $("#registerDialog").hide();
        $("#mobileRegisterInfoDialog").show();
        $('#codeRecivePhone').text($(".nation-cont i").text() +" "+ this.input_mobile.e.val());
        $('#modifyRegisterBtn').unbind('click');
        $('#modifyRegisterBtn').click(function(e){
            e.preventDefault();
            that.oriMobileNum = that.input_mobile.e.val();
            that.showRegForm({resetImage:true});
        });
        this.initInputActiveCode();
        this.input_username = RegisterLoginComponent.initInputUserName();
        this.initRegConfirmBtn();
        $(window).unbind('resize');
        RegisterLoginComponent.centerRegLoginForm(403,443);
        $(window).resize(function(){
            RegisterLoginComponent.centerRegLoginForm(403,443);
        });
        //}}}
    },
    handleSendActiveCodeErr : function(ajaxRsponse){
        //{{{
        this.getcode_btn.e.html('重新发送');
        this.input_activateCode.showError(ajaxRsponse.errmsg);
        this.getcode_btn.state = false;
        this.getcode_btn.start(120);
        //}}}
    },
    handleSendActiveCodeSuc : function(ajaxRsponse){
        //{{{
        this.getcode_btn.state = false;
        this.getcode_btn.start(120);
        //}}}
    },
    handleRegErr : function(ajaxResponse){
        //{{{
        alert(ajaxResponse.msg);
        return true;
        //}}}
    },
    handleRegSuc : function(ajaxResponse){
        //{{{
        window.location.href = ajaxResponse.next;
        //}}}
    },
    checkActiveCode : function(){
        var that = this;
        $.when(RegisterLoginComponent.checkActiveCode(that.input_mobile.e.val(),$(".nation-cont i").attr('tag'),$(".nation-cont i").attr('code'),that.input_activateCode.e.val()))
        .done(function(ajaxCheck){
            if (ajaxCheck.status == 0){
                that.input_activateCode.showError(ajaxCheck.errmsg);
                that.input_activateCode.e.addClass('r_input_small_cur');
            }else{
                that.input_activateCode.status = true;
            }
        });
    }
    //}}}
};
if($('#actionName').val() == 'Front_Register'){
    XZWebAjax.get(XZWebUrlWriter.getAjax_nationCodeHtml(),{},true,
        function(ajaxRsponse){
            if(ajaxRsponse.status == 1){
                $('#input-mobile').after(ajaxRsponse.sucmsg);
                var nation_cont = $('#reg').find('.nation-cont');
                if ($('#countryname').val() && $('#countrycode').val() && $('#countryflag').val()) {
                    nation_cont.find('img').attr('src', '/images/flag/'+$('#countryflag').val()+'.jpg');
                    nation_cont.find('i').attr('tag', $('#countryname').val()).attr('code', $('#countrycode').val()).text('+' + $('#countrycode').val());
                    $('#input-mobile').blur();
                }
            } else {
                alert(ajaxResponse.errmsg);
            }
    });
}
 
 window.XZWebRegByMobileDialog = $.extend(XZWebRegByMobile,{
    //{{{
    initGetCodeBtn : function(){
        //{{{
        var getcode_btn = new sendCodeButton('#get-code-btn');
        var that = this;
        getcode_btn.e.click(function(){
            if (that.getcode_btn.state == false){
                that.closeMobileRegisterInfoDialog();
                that.showRegForm();
                that.oriMobileNum = '';
                that.input_imageVerifyCode.e.focus();
            } 
        });
        this.getcode_btn = getcode_btn;
        //}}}
    },
    clearDialogValue : function(){
        //{{{
        this.input_mobile.e.val('');
        this.input_imageVerifyCode.e.val('');
        this.input_inviteCode.e.val('');
        this.input_password.e.val('');
        $('.r_error_tip').hide();
        $('.r_input_1_cur').removeClass('r_input_1_cur');
        $('.r_input_small_cur').removeClass('r_input_small_cur');
        //}}}
    },
    showRegForm : function(){
        //{{{
        if($('#userlogindialog:visible').length){
            $('#userlogindialog').dialog('destroy');
            $('body').eq(0).css('overflow','visible');
        }
        var that = this;
        $("body").eq(0).css("overflow","hidden");
        $("#registerDialog").dialog({
            width : 698,
            resizable: false,
            modal:true,
            zIndex:7000
        }).parent('.ui-dialog').css({'z-index':9000}).find('.ui-dialog-titlebar').hide();
        //z-index 9000 兼容结果列表页层级问题
        var dialog = $("#registerDialog").parent('.ui-dialog');
        //dialog.css({top:dialog.position().top+15,position:'absolute'});
        dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'fixed'});  
        //向上移动15像素解决title被隐藏产生的垂直无法居中bug,指定absoute解决有些页面弹窗无法脱离文档流的问题
        $('.ui-widget-overlay').css({background:'none repeat scroll 0 0 #000',opacity:'0.5'});
        /*bycl1226 返回保存电话号
        if(that.oriMobileNum == ''){
            that.clearDialogValue();
        }
        */
        $('#reg-btn').focus();
        $('#closeRegiserDialog').unbind('click');
        $('#closeRegiserDialog').click(function(){
            that.clearDialogValue();
            that.closeRegisterDialog();
        });
        pub.resetVerifyCode('#img_imagecode');
        this.input_imageVerifyCode.e.val('');
        $('#input-mobile').next().show();
        //}}}
    },
    closeRegisterDialog : function(){
        //{{{
        $("#registerDialog").dialog('destroy');
        $("body").eq(0).css("overflow","visible");
        //}}}
    },
    showPerfectInfoForm : function(){
        //{{{
        var that = this;
        that.closeRegisterDialog();
        $("body").eq(0).css('overflow',"hidden");
        $("#mobileRegisterInfoDialog").dialog({
            width : 403,
            resizable: false,
            modal:true,
            position: "center",
            zIndex :7000 
        }).parent('.ui-dialog').css({'z-index':9000}).find('.ui-dialog-titlebar').hide();
        var dialog = $("#mobileRegisterInfoDialog").parent('.ui-dialog');
        //dialog.css({top:dialog.position().top+15,position:'absolute'});
        dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'fixed'});  
        $('#codeRecivePhone').html( $("#input-mobile").next(".region").find('i').text() + " "+ this.input_mobile.e.val());
        $('#closeMobileRegisterInfoDialog').unbind('click');
        $('#closeMobileRegisterInfoDialog').click(function(){
            that.clearDialogValue();
            that.closeMobileRegisterInfoDialog();
        });
        $('#modifyRegisterBtn').unbind('click');
        $('#modifyRegisterBtn').click(function(e){
            e.preventDefault();
            that.closeMobileRegisterInfoDialog();
            that.oriMobileNum = that.input_mobile.e.val();
            that.showRegForm();
        });
        this.initInputActiveCode();
        this.input_username = RegisterLoginComponent.initInputUserName();
        this.initRegConfirmBtn({ajaxShowSucc:true});
        //}}}
    },
    closeMobileRegisterInfoDialog : function(){
        //{{{
        $('.r_error_tip').hide();
        $('.r_input_1_cur').removeClass('r_input_1_cur');
        $('.r_input_small_cur').removeClass('r_input_small_cur');
        $("#mobileRegisterInfoDialog").dialog('destroy');
        $("body").eq(0).css('overflow',"visible");
        //}}}
    },
    handleRegSuc : function(ajaxResponse){
        //{{{
        this.closeMobileRegisterInfoDialog();
        $("body").eq(0).css("overflow","hidden");
        $('#regSuccessDialog').dialog({
            width : 568,
            resizable: false,
            modal:true,
            position: "center"
        }).parent('.ui-dialog').css({'z-index':9000,'background':'none'})
        .find('.ui-dialog-titlebar').hide().end().find('#regSuccInfo').html(ajaxResponse.html);
        var dialog = $('#regSuccessDialog').parent('.ui-dialog');
        dialog.css({top: ($(window).height()) * 0.5 - dialog.height()*0.5,position:'fixed'});  
        //dialog.css({top:dialog.position().top/2,position:'absolute'});
        $('#regSuccessDialog').css({ overflow: "hidden"});
        $('#closeRegSuccDialogBtn,returnOriBtn').unbind('click');
        $('#closeRegSuccDialogBtn,returnOriBtn').click(function(){
            XZWebRegByMobileDialog.afterRegSuc();     
        });
        return true;
        //}}}
    },
    afterRegSuc : function(){
       window.location.reload();
    }
    //}}}
});
$(window).load(function(){  

    XZWebRegByMobileDialog.init();

    //注册弹窗事件
    $("#userregister, .show-register-box").click(function(e){
        if($(".region.nation-num")){
            $(".region.nation-num").remove();
        }
        XZWebAjax.get(XZWebUrlWriter.getAjax_nationCodeHtml(),{},true,
            function(ajaxRsponse){
                if(ajaxRsponse.status == 1){
                    $('#input-mobile').after(ajaxRsponse.sucmsg);
                } else {
                    alert(ajaxResponse.errmsg);
                }
        });
        e.preventDefault();
        if($('#loginUserId').length == 0){
            XZWebRegByMobileDialog.showRegForm();
        }
        return false;
    });

    //页面加载之后如果处于登录状态的一些逻辑,暂时按照以前规范放到这里,包含赞和im
    var key = sessionStorage.getItem("from");
    var isLogin = $('#loginUserId').length > 0 ;
    switch (key) {
        case "praise":
            if (isLogin) setTimeout(function(){$('#praise_btn').click()},500);
            break;
        case "IMtalk":
            if (isLogin) setTimeout(function(){ $("#webim-chat-user").click()},2000);
            break;
    }
    sessionStorage.setItem("from","null");
});
 
 /*选择国家时候的交互*/
var stack = false;
var click_dom = '';

$(".nation-cont").live("click", function(){
    click_dom = '#'+$(this).parent().attr('id')+' ';
    $('.r_input_small_cur').removeClass('r_input_small_cur');
    $('.r_input_1_cur').removeClass('r_input_1_cur');
    $(click_dom+'.nation-list').toggle();
    $('.r_error_tip').hide();
    if(stack){
        $(click_dom+".region_shrink").attr('class','region_spread');//小黑箭头
        stack = !stack;
    }else{
        $(click_dom+".region_spread").attr('class','region_shrink');
        stack = !stack;
    }
});
$(click_dom+".region_sel_list li").live("click", function(){
    var wordList = $(click_dom+".region_sel_list li");
    var nationList = $(click_dom+".region_sel_city li");
    var index = wordList.index(this);
    wordList.each(function () {
        $(this).attr("class", "");
    });
    nationList.each(function () {
        $(this).attr("class", "clearfix hide");
    }).eq(index).attr("class", "clearfix show");

    $(this).attr("class", "active border_active");
});


$(click_dom+".region_sel_city li a ").live("click", function(){
    var nationListDetail = $(click_dom+".region_sel_city li a");
    var enName = $(this).attr('data-en');
    var flagName = (enName == 'HongKong' || enName == 'Macau' || enName == 'TaiWan') ? 'China' : enName.replace(/\s+/g,"_");
    nationListDetail.each(function(){
        $(this).attr("class", "");
    });

    $(this).attr("class", "country_active");
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if(patrn.exec($(this).attr('data-code')) == null || $(this).attr('data-code') == ""){
        $(click_dom+".nation-cont i").html($(this).attr('data-code'));
        $("#nationId").val($(this).attr('data-id'));
        if ($('#actionName').val() === 'Pub_PreCondition') {
            $(click_dom+"#nationId").val($(this).attr('data-id'));
        }
    }else{
        $(click_dom+".nation-cont i").html('+' + $(this).attr('data-code'));
        $("#nationShortName").val($(this).attr('data-shortname'));
        $("#nationCode").val($(this).attr('data-code'));
        $("#nationId").val($(this).attr('data-id'));
        if ($('#actionName').val() === 'Pub_PreCondition') {
            $(click_dom+"#nationShortName").val($(this).attr('data-shortname'));
            $(click_dom+"#nationCode").val($(this).attr('data-code'));
            $(click_dom+"#nationId").val($(this).attr('data-id'));
        }
    }

    if(enName == 'Ascension' || enName=='French Guiana' || enName == 'Reunion'){
        $(".nation-cont img").remove();
    }else{
        if(!$(click_dom+".nation-cont i").prev().is("img")){
            $(click_dom+".nation-cont i").before("<img>");
        }
        $(click_dom+".nation-cont img").attr('src','/images/flag/'+ flagName + ".jpg");
    }

    $(click_dom+".nation-cont i").attr('tag',$(this).attr('data-shortname'));
    $(click_dom+".nation-cont i").attr('code',$(this).attr('data-code'));

    if(stack){
        $(click_dom+".region_shrink").attr('class','region_spread');//小黑箭头
    }else{
        $(click_dom+".region_spread").attr('class','region_shrink');
    }
    stack = !stack;

    $(click_dom+'.nation-list').toggle();
    //$('#' + $('.region').prev().attr('id')).trigger('blur'); //可能会选择错误
    var parentsArr = $(this).parentsUntil('.region.nation-num');
    var parArrlen = parentsArr.length;
    var thisRegion = $(parentsArr[parArrlen-1]).parent();
    $('#' + thisRegion.prev().attr('id')).trigger('blur');
});

$(document).click(function(ev){ 
    ev = ev ? ev : window.event;
    var target = ev.target || ev.srcElement;
    if ($(target).is(".nation-num") || $(target).parent().is(".nation-num") || $(target).parent().parent().is(".nation-num") || $(target).parent().parent().parent().is(".nation-num") || $(target).parent().parent().parent().parent().is(".nation-num")) {
    }else{
        if($('.region_sel,.nation-list').is(':visible')){
            $('.region_sel,.nation-list').hide();
            $('.region_shrink').attr('class','region_spread');
            stack = !stack;
        }
    }
});
 
 var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
    return void 0 !== a;
};
goog.exportPath_ = function(a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    a[0] in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d;a.length && (d = a.shift());) {
        !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {};
    }
};
goog.define = function(a, b) {
    var c = b;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
    goog.exportPath_(a, c);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
    if (goog.isInModuleLoader_()) {
        throw Error("goog.provide can not be used within a goog.module.");
    }
    if (!COMPILED && goog.isProvided_(a)) {
        throw Error('Namespace "' + a + '" already declared.');
    }
    goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[a];
        for (var c = a;(c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) {
            goog.implicitNamespaces_[c] = !0;
        }
    }
    goog.exportPath_(a, b);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
    if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
        throw Error("Invalid module identifier");
    }
    if (!goog.isInModuleLoader_()) {
        throw Error("Module " + a + " has been loaded incorrectly.");
    }
    if (goog.moduleLoaderState_.moduleName) {
        throw Error("goog.module may only be called once per module.");
    }
    goog.moduleLoaderState_.moduleName = a;
    if (!COMPILED) {
        if (goog.isProvided_(a)) {
            throw Error('Namespace "' + a + '" already declared.');
        }
        delete goog.implicitNamespaces_[a];
    }
};
goog.module.get = function(a) {
    return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
    if (!COMPILED) {
        return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null;
    }
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_;
};
goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_()) {
        throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    }
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
        throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    }
    goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(a) {
    if (goog.DISALLOW_TEST_ONLY_CODE) {
        throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
    }
};
goog.forwardDeclare = function(a) {
};
COMPILED || (goog.isProvided_ = function(a) {
    return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a));
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(a, b) {
    for (var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
        if (goog.isDefAndNotNull(d[e])) {
            d = d[e];
        } else {
            return null;
        }
    }
    return d;
};
goog.globalize = function(a, b) {
    var c = b || goog.global, d;
    for (d in a) {
        c[d] = a[d];
    }
};
goog.addDependency = function(a, b, c, d) {
    if (goog.DEPENDENCIES_ENABLED) {
        var e;
        a = a.replace(/\\/g, "/");
        var f = goog.dependencies_;
        d && "boolean" !== typeof d || (d = d ? {module:"goog"} : {});
        for (var g = 0;e = b[g];g++) {
            f.nameToPath[e] = a, f.loadFlags[a] = d;
        }
        for (d = 0;b = c[d];d++) {
            a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0;
        }
    }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
    goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
    if (!COMPILED) {
        goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
        if (goog.isProvided_(a)) {
            if (goog.isInModuleLoader_()) {
                return goog.module.getInternal_(a);
            }
        } else {
            if (goog.ENABLE_DEBUG_LOADER) {
                var b = goog.getPathFromDeps_(a);
                if (b) {
                    goog.writeScripts_(b);
                } else {
                    throw a = "goog.require could not find: " + a, goog.logToConsole_(a), Error(a);
                }
            }
        }
        return null;
    }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
    a.getInstance = function() {
        if (a.instance_) {
            return a.instance_;
        }
        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
        return a.instance_ = new a;
    };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.TRANSPILER = "transpile.js"/*tpa=http://jci.xiaozhustatic1.com/e19061101/transpile.js*/;
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {loadFlags:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}}, goog.inHtmlDocument_ = function() {
    var a = goog.global.document;
    return null != a && "write" in a;
}, goog.findBasePath_ = function() {
    if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) {
        goog.basePath = goog.global.CLOSURE_BASE_PATH;
    } else {
        if (goog.inHtmlDocument_()) {
            for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1;0 <= b;--b) {
                var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
                if ("base.js"/*tpa=http://jci.xiaozhustatic1.com/e19061101/base.js*/ == c.substr(d - 7, 7)) {
                    goog.basePath = c.substr(0, d - 7);
                    break;
                }
            }
        }
    }
}, goog.importScript_ = function(a, b) {
    (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0);
}, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importProcessedScript_ = function(a, b, c) {
    goog.importScript_("", 'goog.retrieveAndExec_("' + a + '", ' + b + ", " + c + ");");
}, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
    return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n";
}, goog.loadQueuedModules_ = function() {
    var a = goog.queuedModules_.length;
    if (0 < a) {
        var b = goog.queuedModules_;
        goog.queuedModules_ = [];
        for (var c = 0;c < a;c++) {
            goog.maybeProcessDeferredPath_(b[c]);
        }
    }
}, goog.maybeProcessDeferredDep_ = function(a) {
    goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a), goog.maybeProcessDeferredPath_(goog.basePath + a));
}, goog.isDeferredModule_ = function(a) {
    var b = (a = goog.getPathFromDeps_(a)) && goog.dependencies_.loadFlags[a] || {};
    return a && ("goog" == b.module || goog.needsTranspile_(b.lang)) ? goog.basePath + a in goog.dependencies_.deferred : !1;
}, goog.allDepsAreAvailable_ = function(a) {
    if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires) {
        for (var b in goog.dependencies_.requires[a]) {
            if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) {
                return !1;
            }
        }
    }
    return !0;
}, goog.maybeProcessDeferredPath_ = function(a) {
    if (a in goog.dependencies_.deferred) {
        var b = goog.dependencies_.deferred[a];
        delete goog.dependencies_.deferred[a];
        goog.globalEval(b);
    }
}, goog.loadModuleFromUrl = function(a) {
    goog.retrieveAndExec_(a, !0, !1);
}, goog.writeScriptSrcNode_ = function(a) {
    goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>');
}, goog.appendScriptSrcNode_ = function(a) {
    var b = goog.global.document, c = b.createElement("script");
    c.type = "text/javascript";
    c.src = a;
    c.defer = !1;
    c.async = !1;
    b.head.appendChild(c);
}, goog.writeScriptTag_ = function(a, b) {
    if (goog.inHtmlDocument_()) {
        var c = goog.global.document;
        if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
            if (/\bdeps.js$/.test(a)) {
                return !1;
            }
            throw Error('Cannot write "' + a + '" after document load');
        }
        if (void 0 === b) {
            if (goog.IS_OLD_IE_) {
                var d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
                c.write('<script type="text/javascript" src="' + a + '"' + d + ">\x3c/script>");
            } else {
                goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a);
            }
        } else {
            c.write('<script type="text/javascript">' + b + "\x3c/script>");
        }
        return !0;
    }
    return !1;
}, goog.needsTranspile_ = function(a) {
    if ("always" == goog.TRANSPILE) {
        return !0;
    }
    if ("never" == goog.TRANSPILE) {
        return !1;
    }
    if (!goog.transpiledLanguages_) {
        goog.transpiledLanguages_ = {es5:!0, es6:!0, "es6-impl":!0};
        try {
            goog.transpiledLanguages_.es5 = eval("[1,].length!=1"), eval('(()=>{"use strict";let a={};const X=class{constructor(){}x(z){return new Map([...arguments]).get(z[0])==3}};return new X().x([a,3])})()') && (goog.transpiledLanguages_["es6-impl"] = !1), eval('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()') &&
            (goog.transpiledLanguages_.es6 = !1);
        } catch (b) {
        }
    }
    return !!goog.transpiledLanguages_[a];
}, goog.transpiledLanguages_ = null, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
    "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
    return !0;
}, goog.writeScripts_ = function(a) {
    function b(a) {
        if (!(a in e.written || a in e.visited)) {
            e.visited[a] = !0;
            if (a in e.requires) {
                for (var f in e.requires[a]) {
                    if (!goog.isProvided_(f)) {
                        if (f in e.nameToPath) {
                            b(e.nameToPath[f]);
                        } else {
                            throw Error("Undefined nameToPath for " + f);
                        }
                    }
                }
            }
            a in d || (d[a] = !0, c.push(a));
        }
    }
    var c = [], d = {}, e = goog.dependencies_;
    b(a);
    for (a = 0;a < c.length;a++) {
        var f = c[a];
        goog.dependencies_.written[f] = !0;
    }
    var g = goog.moduleLoaderState_;
    goog.moduleLoaderState_ = null;
    for (a = 0;a < c.length;a++) {
        if (f = c[a]) {
            var h = e.loadFlags[f] || {}, k = goog.needsTranspile_(h.lang);
            "goog" == h.module || k ? goog.importProcessedScript_(goog.basePath + f, "goog" == h.module, k) : goog.importScript_(goog.basePath + f);
        } else {
            throw goog.moduleLoaderState_ = g, Error("Undefined script input");
        }
    }
    goog.moduleLoaderState_ = g;
}, goog.getPathFromDeps_ = function(a) {
    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.loadModule = function(a) {
    var b = goog.moduleLoaderState_;
    try {
        goog.moduleLoaderState_ = {moduleName:void 0, declareLegacyNamespace:!1};
        var c;
        if (goog.isFunction(a)) {
            c = a.call(void 0, {});
        } else {
            if (goog.isString(a)) {
                c = goog.loadModuleFromSource_.call(void 0, a);
            } else {
                throw Error("Invalid module definition");
            }
        }
        var d = goog.moduleLoaderState_.moduleName;
        if (!goog.isString(d) || !d) {
            throw Error('Invalid module name "' + d + '"');
        }
        goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && goog.isObject(c) && Object.seal(c);
        goog.loadedModules_[d] = c;
    } finally {
        goog.moduleLoaderState_ = b;
    }
};
goog.loadModuleFromSource_ = function(a) {
    eval(a);
    return {};
};
goog.normalizePath_ = function(a) {
    a = a.split("/");
    for (var b = 0;b < a.length;) {
        "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    }
    return a.join("/");
};
goog.loadFileSync_ = function(a) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
        return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    }
    try {
        var b = new goog.global.XMLHttpRequest;
        b.open("get", a, !1);
        b.send();
        return 0 == b.status || 200 == b.status ? b.responseText : null;
    } catch (c) {
        return null;
    }
};
goog.retrieveAndExec_ = function(a, b, c) {
    if (!COMPILED) {
        var d = a;
        a = goog.normalizePath_(a);
        var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, f = goog.loadFileSync_(a);
        if (null == f) {
            throw Error('Load of "' + a + '" failed');
        }
        c && (f = goog.transpile_.call(goog.global, f, a));
        f = b ? goog.wrapModule_(a, f) : f + ("\n//# sourceURL=" + a);
        goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[d] = f, goog.queuedModules_.push(d)) : e(a, f);
    }
};
goog.transpile_ = function(a, b) {
    var c = goog.global.$jscomp;
    c || (goog.global.$jscomp = c = {});
    var d = c.transpile;
    if (!d) {
        var e = goog.basePath + goog.TRANSPILER, f = goog.loadFileSync_(e);
        f && (eval(f + "\n//# sourceURL=" + e), c = goog.global.$jscomp, d = c.transpile);
    }
    d || (d = c.transpile = function(a, b) {
        goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
        return a;
    });
    return d(a, b);
};
goog.typeOf = function(a) {
    var b = typeof a;
    if ("object" == b) {
        if (a) {
            if (a instanceof Array) {
                return "array";
            }
            if (a instanceof Object) {
                return b;
            }
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) {
                return "object";
            }
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
                return "array";
            }
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
                return "function";
            }
        } else {
            return "null";
        }
    } else {
        if ("function" == b && "undefined" == typeof a.call) {
            return "object";
        }
    }
    return b;
};
goog.isNull = function(a) {
    return null === a;
};
goog.isDefAndNotNull = function(a) {
    return null != a;
};
goog.isArray = function(a) {
    return "array" == goog.typeOf(a);
};
goog.isArrayLike = function(a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length;
};
goog.isDateLike = function(a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isString = function(a) {
    return "string" == typeof a;
};
goog.isBoolean = function(a) {
    return "boolean" == typeof a;
};
goog.isNumber = function(a) {
    return "number" == typeof a;
};
goog.isFunction = function(a) {
    return "function" == goog.typeOf(a);
};
goog.isObject = function(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b;
};
goog.getUid = function(a) {
    return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
    return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_];
    } catch (b) {
    }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (a.clone) {
            return a.clone();
        }
        var b = "array" == b ? [] : {}, c;
        for (c in a) {
            b[c] = goog.cloneObject(a[c]);
        }
        return b;
    }
    return a;
};
goog.bindNative_ = function(a, b, c) {
    return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
    if (!a) {
        throw Error();
    }
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c);
        };
    }
    return function() {
        return a.apply(b, arguments);
    };
};
goog.bind = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b);
    };
};
goog.mixin = function(a, b) {
    for (var c in b) {
        a[c] = b[c];
    }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date;
};
goog.globalEval = function(a) {
    if (goog.global.execScript) {
        goog.global.execScript(a, "JavaScript");
    } else {
        if (goog.global.eval) {
            if (null == goog.evalWorksForGlobals_) {
                if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
                    try {
                        delete goog.global._evalTest_;
                    } catch (d) {
                    }
                    goog.evalWorksForGlobals_ = !0;
                } else {
                    goog.evalWorksForGlobals_ = !1;
                }
            }
            if (goog.evalWorksForGlobals_) {
                goog.global.eval(a);
            } else {
                var b = goog.global.document, c = b.createElement("SCRIPT");
                c.type = "text/javascript";
                c.defer = !1;
                c.appendChild(b.createTextNode(a));
                b.body.appendChild(c);
                b.body.removeChild(c);
            }
        } else {
            throw Error("goog.globalEval not available");
        }
    }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
    if ("." == String(a).charAt(0)) {
        throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
    }
    var c = function(a) {
        return goog.cssNameMapping_[a] || a;
    }, d = function(a) {
        a = a.split("-");
        for (var b = [], d = 0;d < a.length;d++) {
            b.push(c(a[d]));
        }
        return b.join("-");
    }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
        return a;
    }, d = b ? a + "-" + d(b) : d(a);
    return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(d) : d;
};
goog.setCssNameMapping = function(a, b) {
    goog.cssNameMapping_ = a;
    goog.cssNameMappingStyle_ = b;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
    b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
        return null != b && d in b ? b[d] : a;
    }));
    return a;
};
goog.getMsgWithFallback = function(a, b) {
    return a;
};
goog.exportSymbol = function(a, b, c) {
    goog.exportPath_(a, b, c);
};
goog.exportProperty = function(a, b, c) {
    a[b] = c;
};
goog.inherits = function(a, b) {
    function c() {
    }
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, f) {
        for (var g = Array(arguments.length - 2), h = 2;h < arguments.length;h++) {
            g[h - 2] = arguments[h];
        }
        return b.prototype[c].apply(a, g);
    };
};
goog.base = function(a, b, c) {
    var d = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) {
        throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    }
    if (d.superClass_) {
        for (var e = Array(arguments.length - 1), f = 1;f < arguments.length;f++) {
            e[f - 1] = arguments[f];
        }
        return d.superClass_.constructor.apply(a, e);
    }
    e = Array(arguments.length - 2);
    for (f = 2;f < arguments.length;f++) {
        e[f - 2] = arguments[f];
    }
    for (var f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
        if (g.prototype[b] === d) {
            f = !0;
        } else {
            if (f) {
                return g.prototype[b].apply(a, e);
            }
        }
    }
    if (a[b] === d) {
        return a.constructor.prototype[b].apply(a, e);
    }
    throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
    if (goog.isInModuleLoader_()) {
        throw Error("goog.scope is not supported within a goog.module.");
    }
    a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
    var c = b.constructor, d = b.statics;
    c && c != Object.prototype.constructor || (c = function() {
        throw Error("cannot instantiate an interface (no constructor defined).");
    });
    c = goog.defineClass.createSealingConstructor_(c, a);
    a && goog.inherits(c, a);
    delete b.constructor;
    delete b.statics;
    goog.defineClass.applyProperties_(c.prototype, b);
    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
    if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
        return a;
    }
    var c = !goog.defineClass.isUnsealable_(b), d = function() {
        var b = a.apply(this, arguments) || this;
        b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
        this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
        return b;
    };
    return d;
};
goog.defineClass.isUnsealable_ = function(a) {
    return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
    for (var c in b) {
        Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    }
    for (var d = 0;d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++) {
        c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    }
};
goog.tagUnsealableClass = function(a) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.debug = {};
goog.debug.Error = function(a) {
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, goog.debug.Error);
    } else {
        var b = Error().stack;
        b && (this.stack = b);
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
    return 0 == a.lastIndexOf(b, 0);
};
goog.string.endsWith = function(a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c;
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length));
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length));
};
goog.string.caseInsensitiveEquals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase();
};
goog.string.subs = function(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1);e.length && 1 < c.length;) {
        d += c.shift() + e.shift();
    }
    return d + c.join("%s");
};
goog.string.collapseWhitespace = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(a) {
    return /^[\s\xa0]*$/.test(a);
};
goog.string.isEmptyString = function(a) {
    return 0 == a.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
    return !/[^\t\n\r ]/.test(a);
};
goog.string.isAlpha = function(a) {
    return !/[^a-zA-Z]/.test(a);
};
goog.string.isNumeric = function(a) {
    return !/[^0-9]/.test(a);
};
goog.string.isAlphaNumeric = function(a) {
    return !/[^a-zA-Z0-9]/.test(a);
};
goog.string.isSpace = function(a) {
    return " " == a;
};
goog.string.isUnicodeChar = function(a) {
    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
};
goog.string.stripNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(a) {
    return a.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(a) {
    return a.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(a) {
    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
    return a.trim();
} : function(a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(a) {
    return a.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(a) {
    return a.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(a, b) {
    var c = String(a).toLowerCase(), d = String(b).toLowerCase();
    return c < d ? -1 : c == d ? 0 : 1;
};
goog.string.numberAwareCompare_ = function(a, b, c) {
    if (a == b) {
        return 0;
    }
    if (!a) {
        return -1;
    }
    if (!b) {
        return 1;
    }
    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0;g < f;g++) {
        c = d[g];
        var h = e[g];
        if (c != h) {
            return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1;
        }
    }
    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1;
};
goog.string.intAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
    return encodeURIComponent(String(a));
};
goog.string.urlDecode = function(a) {
    return decodeURIComponent(a.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(a, b) {
    if (b) {
        a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    } else {
        if (!goog.string.ALL_RE_.test(a)) {
            return a;
        }
        -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
        goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"));
    }
    return a;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a;
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a;
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
    var c = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, d;
    d = b ? b.createElement("div") : goog.global.document.createElement("div");
    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
        var g = c[a];
        if (g) {
            return g;
        }
        if ("#" == b.charAt(0)) {
            var h = Number("0" + b.substr(1));
            isNaN(h) || (g = String.fromCharCode(h));
        }
        g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
        return c[a] = g;
    });
};
goog.string.unescapePureXmlEntities_ = function(a) {
    return a.replace(/&([^;]+);/g, function(a, c) {
        switch(c) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == c.charAt(0)) {
                    var d = Number("0" + c.substr(1));
                    if (!isNaN(d)) {
                        return String.fromCharCode(d);
                    }
                }
                return a;
        }
    });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b);
};
goog.string.preserveSpaces = function(a) {
    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(a, b) {
    for (var c = b.length, d = 0;d < c;d++) {
        var e = 1 == c ? b : b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length - 1) == e) {
            return a.substring(1, a.length - 1);
        }
    }
    return a;
};
goog.string.truncate = function(a, b, c) {
    c && (a = goog.string.unescapeEntities(a));
    a.length > b && (a = a.substring(0, b - 3) + "...");
    c && (a = goog.string.htmlEscape(a));
    return a;
};
goog.string.truncateMiddle = function(a, b, c, d) {
    c && (a = goog.string.unescapeEntities(a));
    if (d && a.length > b) {
        d > b && (d = b);
        var e = a.length - d;
        a = a.substring(0, b - d) + "..." + a.substring(e);
    } else {
        a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    }
    c && (a = goog.string.htmlEscape(a));
    return a;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"<"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
    a = String(a);
    for (var b = ['"'], c = 0;c < a.length;c++) {
        var d = a.charAt(c), e = d.charCodeAt(0);
        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
    }
    b.push('"');
    return b.join("");
};
goog.string.escapeString = function(a) {
    for (var b = [], c = 0;c < a.length;c++) {
        b[c] = goog.string.escapeChar(a.charAt(c));
    }
    return b.join("");
};
goog.string.escapeChar = function(a) {
    if (a in goog.string.jsEscapeCache_) {
        return goog.string.jsEscapeCache_[a];
    }
    if (a in goog.string.specialEscapeChars_) {
        return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    }
    var b, c = a.charCodeAt(0);
    if (31 < c && 127 > c) {
        b = a;
    } else {
        if (256 > c) {
            if (b = "\\x", 16 > c || 256 < c) {
                b += "0";
            }
        } else {
            b = "\\u", 4096 > c && (b += "0");
        }
        b += c.toString(16).toUpperCase();
    }
    return goog.string.jsEscapeCache_[a] = b;
};
goog.string.contains = function(a, b) {
    return -1 != a.indexOf(b);
};
goog.string.caseInsensitiveContains = function(a, b) {
    return goog.string.contains(a.toLowerCase(), b.toLowerCase());
};
goog.string.countOf = function(a, b) {
    return a && b ? a.split(b).length - 1 : 0;
};
goog.string.removeAt = function(a, b, c) {
    var d = a;
    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    return d;
};
goog.string.remove = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "");
    return a.replace(c, "");
};
goog.string.removeAll = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(c, "");
};
goog.string.regExpEscape = function(a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
    return a.repeat(b);
} : function(a, b) {
    return Array(b + 1).join(a);
};
goog.string.padNumber = function(a, b, c) {
    a = goog.isDef(c) ? a.toFixed(c) : String(a);
    c = a.indexOf(".");
    -1 == c && (c = a.length);
    return goog.string.repeat("0", Math.max(0, b - c)) + a;
};
goog.string.makeSafe = function(a) {
    return null == a ? "" : String(a);
};
goog.string.buildString = function(a) {
    return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(a, b) {
    for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
        var h = d[g] || "", k = e[g] || "";
        do {
            h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
            k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
            if (0 == h[0].length && 0 == k[0].length) {
                break;
            }
            var c = 0 == h[1].length ? 0 : parseInt(h[1], 10), l = 0 == k[1].length ? 0 : parseInt(k[1], 10), c = goog.string.compareElements_(c, l) || goog.string.compareElements_(0 == h[2].length, 0 == k[2].length) || goog.string.compareElements_(h[2], k[2]), h = h[3], k = k[3];
        } while (0 == c);
    }
    return c;
};
goog.string.compareElements_ = function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
};
goog.string.hashCode = function(a) {
    for (var b = 0, c = 0;c < a.length;++c) {
        b = 31 * b + a.charCodeAt(c) >>> 0;
    }
    return b;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(a) {
    var b = Number(a);
    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b;
};
goog.string.isLowerCamelCase = function(a) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(a);
};
goog.string.isUpperCamelCase = function(a) {
    return /^([A-Z][a-z]*)+$/.test(a);
};
goog.string.toCamelCase = function(a) {
    return String(a).replace(/\-([a-z])/g, function(a, c) {
        return c.toUpperCase();
    });
};
goog.string.toSelectorCase = function(a) {
    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(a, b) {
    var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
    return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
        return b + c.toUpperCase();
    });
};
goog.string.capitalize = function(a) {
    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
};
goog.string.parseInt = function(a) {
    isFinite(a) && (a = String(a));
    return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
};
goog.string.splitLimit = function(a, b, c) {
    a = a.split(b);
    for (var d = [];0 < c && a.length;) {
        d.push(a.shift()), c--;
    }
    a.length && d.push(a.join(b));
    return d;
};
goog.string.lastComponent = function(a, b) {
    if (b) {
        "string" == typeof b && (b = [b]);
    } else {
        return a;
    }
    for (var c = -1, d = 0;d < b.length;d++) {
        if ("" != b[d]) {
            var e = a.lastIndexOf(b[d]);
            e > c && (c = e);
        }
    }
    return -1 == c ? a : a.slice(c + 1);
};
goog.string.editDistance = function(a, b) {
    var c = [], d = [];
    if (a == b) {
        return 0;
    }
    if (!a.length || !b.length) {
        return Math.max(a.length, b.length);
    }
    for (var e = 0;e < b.length + 1;e++) {
        c[e] = e;
    }
    for (e = 0;e < a.length;e++) {
        d[0] = e + 1;
        for (var f = 0;f < b.length;f++) {
            d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
        }
        for (f = 0;f < c.length;f++) {
            c[f] = d[f];
        }
    }
    return d[b.length];
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
    b.unshift(a);
    goog.debug.Error.call(this, goog.string.subs.apply(null, b));
    b.shift();
    this.messagePattern = a;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
    throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
        var e = e + (": " + c), f = d
    } else {
        a && (e += ": " + a, f = b);
    }
    a = new goog.asserts.AssertionError("" + e, f || []);
    goog.asserts.errorHandler_(a);
};
goog.asserts.setErrorHandler = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
};
goog.asserts.assert = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.fail = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertString = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertFunction = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertObject = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertArray = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertBoolean = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertElement = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a;
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    return a;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var a in Object.prototype) {
        goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
    }
};
goog.asserts.getType_ = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
    return a[a.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.indexOf.call(a, b, c);
} : function(a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (goog.isString(a)) {
        return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
    }
    for (;c < a.length;c++) {
        if (c in a && a[c] === b) {
            return c;
        }
    }
    return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
} : function(a, b, c) {
    c = null == c ? a.length - 1 : c;
    0 > c && (c = Math.max(0, a.length + c));
    if (goog.isString(a)) {
        return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
    }
    for (;0 <= c;c--) {
        if (c in a && a[c] === b) {
            return c;
        }
    }
    return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    Array.prototype.forEach.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
        f in e && b.call(c, e[f], f, a);
    }
};
goog.array.forEachRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
        d in e && b.call(c, e[d], d, a);
    }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.filter.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
        if (h in g) {
            var k = g[h];
            b.call(c, k, h, a) && (e[f++] = k);
        }
    }
    return e;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.map.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
        g in f && (e[g] = b.call(c, f[g], g, a));
    }
    return e;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduce.call(a, b, c);
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEach(a, function(c, g) {
        e = b.call(d, e, c, g, a);
    });
    return e;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    goog.asserts.assert(null != b);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduceRight.call(a, b, c);
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEachRight(a, function(c, g) {
        e = b.call(d, e, c, g, a);
    });
    return e;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.some.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
        if (f in e && b.call(c, e[f], f, a)) {
            return !0;
        }
    }
    return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.every.call(a, b, c);
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
        if (f in e && !b.call(c, e[f], f, a)) {
            return !1;
        }
    }
    return !0;
};
goog.array.count = function(a, b, c) {
    var d = 0;
    goog.array.forEach(a, function(a, f, g) {
        b.call(c, a, f, g) && ++d;
    }, c);
    return d;
};
goog.array.find = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndex = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
        if (f in e && b.call(c, e[f], f, a)) {
            return f;
        }
    }
    return -1;
};
goog.array.findRight = function(a, b, c) {
    b = goog.array.findIndexRight(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndexRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
        if (d in e && b.call(c, e[d], d, a)) {
            return d;
        }
    }
    return -1;
};
goog.array.contains = function(a, b) {
    return 0 <= goog.array.indexOf(a, b);
};
goog.array.isEmpty = function(a) {
    return 0 == a.length;
};
goog.array.clear = function(a) {
    if (!goog.isArray(a)) {
        for (var b = a.length - 1;0 <= b;b--) {
            delete a[b];
        }
    }
    a.length = 0;
};
goog.array.insert = function(a, b) {
    goog.array.contains(a, b) || a.push(b);
};
goog.array.insertAt = function(a, b, c) {
    goog.array.splice(a, c, 0, b);
};
goog.array.insertArrayAt = function(a, b, c) {
    goog.partial(goog.array.splice, a, c, 0).apply(null, b);
};
goog.array.insertBefore = function(a, b, c) {
    var d;
    2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
};
goog.array.remove = function(a, b) {
    var c = goog.array.indexOf(a, b), d;
    (d = 0 <= c) && goog.array.removeAt(a, c);
    return d;
};
goog.array.removeLast = function(a, b) {
    var c = goog.array.lastIndexOf(a, b);
    return 0 <= c ? (goog.array.removeAt(a, c), !0) : !1;
};
goog.array.removeAt = function(a, b) {
    goog.asserts.assert(null != a.length);
    return 1 == Array.prototype.splice.call(a, b, 1).length;
};
goog.array.removeIf = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
};
goog.array.removeAllIf = function(a, b, c) {
    var d = 0;
    goog.array.forEachRight(a, function(e, f) {
        b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
    });
    return d;
};
goog.array.concat = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.join = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.toArray = function(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0;d < b;d++) {
            c[d] = a[d];
        }
        return c;
    }
    return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
    for (var c = 1;c < arguments.length;c++) {
        var d = arguments[c];
        if (goog.isArrayLike(d)) {
            var e = a.length || 0, f = d.length || 0;
            a.length = e + f;
            for (var g = 0;g < f;g++) {
                a[e + g] = d[g];
            }
        } else {
            a.push(d);
        }
    }
};
goog.array.splice = function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1));
};
goog.array.slice = function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
};
goog.array.removeDuplicates = function(a, b, c) {
    b = b || a;
    var d = function(a) {
        return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a;
    };
    c = c || d;
    for (var d = {}, e = 0, f = 0;f < a.length;) {
        var g = a[f++], h = c(g);
        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
    }
    b.length = e;
};
goog.array.binarySearch = function(a, b, c) {
    return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
};
goog.array.binarySelect = function(a, b, c) {
    return goog.array.binarySearch_(a, b, !0, void 0, c);
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
    for (var f = 0, g = a.length, h;f < g;) {
        var k = f + g >> 1, l;
        l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
        0 < l ? f = k + 1 : (g = k, h = !l);
    }
    return h ? f : ~f;
};
goog.array.sort = function(a, b) {
    a.sort(b || goog.array.defaultCompare);
};
goog.array.stableSort = function(a, b) {
    for (var c = Array(a.length), d = 0;d < a.length;d++) {
        c[d] = {index:d, value:a[d]};
    }
    var e = b || goog.array.defaultCompare;
    goog.array.sort(c, function(a, b) {
        return e(a.value, b.value) || a.index - b.index;
    });
    for (d = 0;d < a.length;d++) {
        a[d] = c[d].value;
    }
};
goog.array.sortByKey = function(a, b, c) {
    var d = c || goog.array.defaultCompare;
    goog.array.sort(a, function(a, c) {
        return d(b(a), b(c));
    });
};
goog.array.sortObjectsByKey = function(a, b, c) {
    goog.array.sortByKey(a, function(a) {
        return a[b];
    }, c);
};
goog.array.isSorted = function(a, b, c) {
    b = b || goog.array.defaultCompare;
    for (var d = 1;d < a.length;d++) {
        var e = b(a[d - 1], a[d]);
        if (0 < e || 0 == e && c) {
            return !1;
        }
    }
    return !0;
};
goog.array.equals = function(a, b, c) {
    if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
        return !1;
    }
    var d = a.length;
    c = c || goog.array.defaultCompareEquality;
    for (var e = 0;e < d;e++) {
        if (!c(a[e], b[e])) {
            return !1;
        }
    }
    return !0;
};
goog.array.compare3 = function(a, b, c) {
    c = c || goog.array.defaultCompare;
    for (var d = Math.min(a.length, b.length), e = 0;e < d;e++) {
        var f = c(a[e], b[e]);
        if (0 != f) {
            return f;
        }
    }
    return goog.array.defaultCompare(a.length, b.length);
};
goog.array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
    return -goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
    return a === b;
};
goog.array.binaryInsert = function(a, b, c) {
    c = goog.array.binarySearch(a, b, c);
    return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1;
};
goog.array.binaryRemove = function(a, b, c) {
    b = goog.array.binarySearch(a, b, c);
    return 0 <= b ? goog.array.removeAt(a, b) : !1;
};
goog.array.bucket = function(a, b, c) {
    for (var d = {}, e = 0;e < a.length;e++) {
        var f = a[e], g = b.call(c, f, e, a);
        goog.isDef(g) && (d[g] || (d[g] = [])).push(f);
    }
    return d;
};
goog.array.toObject = function(a, b, c) {
    var d = {};
    goog.array.forEach(a, function(e, f) {
        d[b.call(c, e, f, a)] = e;
    });
    return d;
};
goog.array.range = function(a, b, c) {
    var d = [], e = 0, f = a;
    c = c || 1;
    void 0 !== b && (e = a, f = b);
    if (0 > c * (f - e)) {
        return [];
    }
    if (0 < c) {
        for (a = e;a < f;a += c) {
            d.push(a);
        }
    } else {
        for (a = e;a > f;a += c) {
            d.push(a);
        }
    }
    return d;
};
goog.array.repeat = function(a, b) {
    for (var c = [], d = 0;d < b;d++) {
        c[d] = a;
    }
    return c;
};
goog.array.flatten = function(a) {
    for (var b = [], c = 0;c < arguments.length;c++) {
        var d = arguments[c];
        if (goog.isArray(d)) {
            for (var e = 0;e < d.length;e += 8192) {
                for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0;g < f.length;g++) {
                    b.push(f[g]);
                }
            }
        } else {
            b.push(d);
        }
    }
    return b;
};
goog.array.rotate = function(a, b) {
    goog.asserts.assert(null != a.length);
    a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
    return a;
};
goog.array.moveItem = function(a, b, c) {
    goog.asserts.assert(0 <= b && b < a.length);
    goog.asserts.assert(0 <= c && c < a.length);
    b = Array.prototype.splice.call(a, b, 1);
    Array.prototype.splice.call(a, c, 0, b[0]);
};
goog.array.zip = function(a) {
    if (!arguments.length) {
        return [];
    }
    for (var b = [], c = arguments[0].length, d = 1;d < arguments.length;d++) {
        arguments[d].length < c && (c = arguments[d].length);
    }
    for (d = 0;d < c;d++) {
        for (var e = [], f = 0;f < arguments.length;f++) {
            e.push(arguments[f][d]);
        }
        b.push(e);
    }
    return b;
};
goog.array.shuffle = function(a, b) {
    for (var c = b || Math.random, d = a.length - 1;0 < d;d--) {
        var e = Math.floor(c() * (d + 1)), f = a[d];
        a[d] = a[e];
        a[e] = f;
    }
};
goog.array.copyByIndex = function(a, b) {
    var c = [];
    goog.array.forEach(b, function(b) {
        c.push(a[b]);
    });
    return c;
};
goog.array.concatMap = function(a, b, c) {
    return goog.array.concat.apply([], goog.array.map(a, b, c));
};
goog.object = {};
goog.object.is = function(a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
};
goog.object.forEach = function(a, b, c) {
    for (var d in a) {
        b.call(c, a[d], d, a);
    }
};
goog.object.filter = function(a, b, c) {
    var d = {}, e;
    for (e in a) {
        b.call(c, a[e], e, a) && (d[e] = a[e]);
    }
    return d;
};
goog.object.map = function(a, b, c) {
    var d = {}, e;
    for (e in a) {
        d[e] = b.call(c, a[e], e, a);
    }
    return d;
};
goog.object.some = function(a, b, c) {
    for (var d in a) {
        if (b.call(c, a[d], d, a)) {
            return !0;
        }
    }
    return !1;
};
goog.object.every = function(a, b, c) {
    for (var d in a) {
        if (!b.call(c, a[d], d, a)) {
            return !1;
        }
    }
    return !0;
};
goog.object.getCount = function(a) {
    var b = 0, c;
    for (c in a) {
        b++;
    }
    return b;
};
goog.object.getAnyKey = function(a) {
    for (var b in a) {
        return b;
    }
};
goog.object.getAnyValue = function(a) {
    for (var b in a) {
        return a[b];
    }
};
goog.object.contains = function(a, b) {
    return goog.object.containsValue(a, b);
};
goog.object.getValues = function(a) {
    var b = [], c = 0, d;
    for (d in a) {
        b[c++] = a[d];
    }
    return b;
};
goog.object.getKeys = function(a) {
    var b = [], c = 0, d;
    for (d in a) {
        b[c++] = d;
    }
    return b;
};
goog.object.getValueByKeys = function(a, b) {
    for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && (a = a[d[c]], goog.isDef(a));c++) {
    }
    return a;
};
goog.object.containsKey = function(a, b) {
    return null !== a && b in a;
};
goog.object.containsValue = function(a, b) {
    for (var c in a) {
        if (a[c] == b) {
            return !0;
        }
    }
    return !1;
};
goog.object.findKey = function(a, b, c) {
    for (var d in a) {
        if (b.call(c, a[d], d, a)) {
            return d;
        }
    }
};
goog.object.findValue = function(a, b, c) {
    return (b = goog.object.findKey(a, b, c)) && a[b];
};
goog.object.isEmpty = function(a) {
    for (var b in a) {
        return !1;
    }
    return !0;
};
goog.object.clear = function(a) {
    for (var b in a) {
        delete a[b];
    }
};
goog.object.remove = function(a, b) {
    var c;
    (c = b in a) && delete a[b];
    return c;
};
goog.object.add = function(a, b, c) {
    if (null !== a && b in a) {
        throw Error('The object already contains the key "' + b + '"');
    }
    goog.object.set(a, b, c);
};
goog.object.get = function(a, b, c) {
    return null !== a && b in a ? a[b] : c;
};
goog.object.set = function(a, b, c) {
    a[b] = c;
};
goog.object.setIfUndefined = function(a, b, c) {
    return b in a ? a[b] : a[b] = c;
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
    if (b in a) {
        return a[b];
    }
    c = c();
    return a[b] = c;
};
goog.object.equals = function(a, b) {
    for (var c in a) {
        if (!(c in b) || a[c] !== b[c]) {
            return !1;
        }
    }
    for (c in b) {
        if (!(c in a)) {
            return !1;
        }
    }
    return !0;
};
goog.object.clone = function(a) {
    var b = {}, c;
    for (c in a) {
        b[c] = a[c];
    }
    return b;
};
goog.object.unsafeClone = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (goog.isFunction(a.clone)) {
            return a.clone();
        }
        var b = "array" == b ? [] : {}, c;
        for (c in a) {
            b[c] = goog.object.unsafeClone(a[c]);
        }
        return b;
    }
    return a;
};
goog.object.transpose = function(a) {
    var b = {}, c;
    for (c in a) {
        b[a[c]] = c;
    }
    return b;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
    for (var c, d, e = 1;e < arguments.length;e++) {
        d = arguments[e];
        for (c in d) {
            a[c] = d[c];
        }
        for (var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
            c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        }
    }
};
goog.object.create = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) {
        return goog.object.create.apply(null, arguments[0]);
    }
    if (b % 2) {
        throw Error("Uneven number of arguments");
    }
    for (var c = {}, d = 0;d < b;d += 2) {
        c[arguments[d]] = arguments[d + 1];
    }
    return c;
};
goog.object.createSet = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) {
        return goog.object.createSet.apply(null, arguments[0]);
    }
    for (var c = {}, d = 0;d < b;d++) {
        c[arguments[d]] = !0;
    }
    return c;
};
goog.object.createImmutableView = function(a) {
    var b = a;
    Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
    return b;
};
goog.object.isImmutableView = function(a) {
    return !!Object.isFrozen && Object.isFrozen(a);
};
goog.proto2 = {};
goog.proto2.Descriptor = function(a, b, c) {
    this.messageType_ = a;
    this.name_ = b.name || null;
    this.fullName_ = b.fullName || null;
    this.containingType_ = b.containingType;
    this.fields_ = {};
    for (a = 0;a < c.length;a++) {
        b = c[a], this.fields_[b.getTag()] = b;
    }
};
goog.proto2.Descriptor.prototype.getName = function() {
    return this.name_;
};
goog.proto2.Descriptor.prototype.getFullName = function() {
    return this.fullName_;
};
goog.proto2.Descriptor.prototype.getContainingType = function() {
    return this.containingType_ ? this.containingType_.getDescriptor() : null;
};
goog.proto2.Descriptor.prototype.getFields = function() {
    var a = goog.object.getValues(this.fields_);
    goog.array.sort(a, function(a, c) {
        return a.getTag() - c.getTag();
    });
    return a;
};
goog.proto2.Descriptor.prototype.getFieldsMap = function() {
    return this.fields_;
};
goog.proto2.Descriptor.prototype.findFieldByName = function(a) {
    return goog.object.findValue(this.fields_, function(b, c, d) {
        return b.getName() == a;
    }) || null;
};
goog.proto2.Descriptor.prototype.findFieldByTag = function(a) {
    goog.asserts.assert(goog.string.isNumeric(a));
    return this.fields_[parseInt(a, 10)] || null;
};
goog.proto2.Descriptor.prototype.createMessageInstance = function() {
    return new this.messageType_;
};
goog.proto2.FieldDescriptor = function(a, b, c) {
    this.parent_ = a;
    goog.asserts.assert(goog.string.isNumeric(b));
    this.tag_ = b;
    this.name_ = c.name;
    this.isPacked_ = !!c.packed;
    this.isRepeated_ = !!c.repeated;
    this.isRequired_ = !!c.required;
    this.fieldType_ = c.fieldType;
    this.nativeType_ = c.type;
    this.deserializationConversionPermitted_ = !1;
    switch(this.fieldType_) {
        case goog.proto2.FieldDescriptor.FieldType.INT64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.UINT64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.FIXED64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.SFIXED64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.SINT64:
            ;
        case goog.proto2.FieldDescriptor.FieldType.FLOAT:
            ;
        case goog.proto2.FieldDescriptor.FieldType.DOUBLE:
            this.deserializationConversionPermitted_ = !0;
    }
    this.defaultValue_ = c.defaultValue;
};
goog.proto2.FieldDescriptor.FieldType = {DOUBLE:1, FLOAT:2, INT64:3, UINT64:4, INT32:5, FIXED64:6, FIXED32:7, BOOL:8, STRING:9, GROUP:10, MESSAGE:11, BYTES:12, UINT32:13, ENUM:14, SFIXED32:15, SFIXED64:16, SINT32:17, SINT64:18};
goog.proto2.FieldDescriptor.prototype.getTag = function() {
    return this.tag_;
};
goog.proto2.FieldDescriptor.prototype.getContainingType = function() {
    return this.parent_.prototype.getDescriptor();
};
goog.proto2.FieldDescriptor.prototype.getName = function() {
    return this.name_;
};
goog.proto2.FieldDescriptor.prototype.getDefaultValue = function() {
    if (void 0 === this.defaultValue_) {
        var a = this.nativeType_;
        if (a === Boolean) {
            this.defaultValue_ = !1;
        } else {
            if (a === Number) {
                this.defaultValue_ = 0;
            } else {
                if (a === String) {
                    this.defaultValue_ = this.deserializationConversionPermitted_ ? "0" : "";
                } else {
                    return new a;
                }
            }
        }
    }
    return this.defaultValue_;
};
goog.proto2.FieldDescriptor.prototype.getFieldType = function() {
    return this.fieldType_;
};
goog.proto2.FieldDescriptor.prototype.getNativeType = function() {
    return this.nativeType_;
};
goog.proto2.FieldDescriptor.prototype.deserializationConversionPermitted = function() {
    return this.deserializationConversionPermitted_;
};
goog.proto2.FieldDescriptor.prototype.getFieldMessageType = function() {
    return this.nativeType_.prototype.getDescriptor();
};
goog.proto2.FieldDescriptor.prototype.isCompositeType = function() {
    return this.fieldType_ == goog.proto2.FieldDescriptor.FieldType.MESSAGE || this.fieldType_ == goog.proto2.FieldDescriptor.FieldType.GROUP;
};
goog.proto2.FieldDescriptor.prototype.isPacked = function() {
    return this.isPacked_;
};
goog.proto2.FieldDescriptor.prototype.isRepeated = function() {
    return this.isRepeated_;
};
goog.proto2.FieldDescriptor.prototype.isRequired = function() {
    return this.isRequired_;
};
goog.proto2.FieldDescriptor.prototype.isOptional = function() {
    return !this.isRepeated_ && !this.isRequired_;
};
goog.proto2.Message = function() {
    this.values_ = {};
    this.fields_ = this.getDescriptor().getFieldsMap();
    this.deserializedFields_ = this.lazyDeserializer_ = null;
};
goog.proto2.Message.FieldType = {DOUBLE:1, FLOAT:2, INT64:3, UINT64:4, INT32:5, FIXED64:6, FIXED32:7, BOOL:8, STRING:9, GROUP:10, MESSAGE:11, BYTES:12, UINT32:13, ENUM:14, SFIXED32:15, SFIXED64:16, SINT32:17, SINT64:18};
goog.proto2.Message.prototype.initializeForLazyDeserializer = function(a, b) {
    this.lazyDeserializer_ = a;
    this.values_ = b;
    this.deserializedFields_ = {};
};
goog.proto2.Message.prototype.setUnknown = function(a, b) {
    goog.asserts.assert(!this.fields_[a], "Field is not unknown in this message");
    goog.asserts.assert(1 <= a, "Tag " + a + ' has value "' + b + '" in descriptor ' + this.getDescriptor().getName());
    goog.asserts.assert(null !== b, "Value cannot be null");
    this.values_[a] = b;
    this.deserializedFields_ && delete this.deserializedFields_[a];
};
goog.proto2.Message.prototype.forEachUnknown = function(a, b) {
    var c = b || this, d;
    for (d in this.values_) {
        var e = Number(d);
        this.fields_[e] || a.call(c, e, this.values_[d]);
    }
};
goog.proto2.Message.prototype.getDescriptor = goog.abstractMethod;
goog.proto2.Message.prototype.has = function(a) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.has$Value(a.getTag());
};
goog.proto2.Message.prototype.arrayOf = function(a) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.array$Values(a.getTag());
};
goog.proto2.Message.prototype.countOf = function(a) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.count$Values(a.getTag());
};
goog.proto2.Message.prototype.get = function(a, b) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.get$Value(a.getTag(), b);
};
goog.proto2.Message.prototype.getOrDefault = function(a, b) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    return this.get$ValueOrDefault(a.getTag(), b);
};
goog.proto2.Message.prototype.set = function(a, b) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    this.set$Value(a.getTag(), b);
};
goog.proto2.Message.prototype.add = function(a, b) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    this.add$Value(a.getTag(), b);
};
goog.proto2.Message.prototype.clear = function(a) {
    goog.asserts.assert(a.getContainingType() == this.getDescriptor(), "The current message does not contain the given field");
    this.clear$Field(a.getTag());
};
goog.proto2.Message.prototype.equals = function(a) {
    if (!a || this.constructor != a.constructor) {
        return !1;
    }
    for (var b = this.getDescriptor().getFields(), c = 0;c < b.length;c++) {
        var d = b[c], e = d.getTag();
        if (this.has$Value(e) != a.has$Value(e)) {
            return !1;
        }
        if (this.has$Value(e)) {
            var f = d.isCompositeType(), g = this.getValueForTag_(e), e = a.getValueForTag_(e);
            if (d.isRepeated()) {
                if (g.length != e.length) {
                    return !1;
                }
                for (d = 0;d < g.length;d++) {
                    var h = g[d], k = e[d];
                    if (f ? !h.equals(k) : h != k) {
                        return !1;
                    }
                }
            } else {
                if (f ? !g.equals(e) : g != e) {
                    return !1;
                }
            }
        }
    }
    return !0;
};
goog.proto2.Message.prototype.copyFrom = function(a) {
    goog.asserts.assert(this.constructor == a.constructor, "The source message must have the same type.");
    this != a && (this.values_ = {}, this.deserializedFields_ && (this.deserializedFields_ = {}), this.mergeFrom(a));
};
goog.proto2.Message.prototype.mergeFrom = function(a) {
    goog.asserts.assert(this.constructor == a.constructor, "The source message must have the same type.");
    for (var b = this.getDescriptor().getFields(), c = 0;c < b.length;c++) {
        var d = b[c], e = d.getTag();
        if (a.has$Value(e)) {
            this.deserializedFields_ && delete this.deserializedFields_[d.getTag()];
            var f = d.isCompositeType();
            if (d.isRepeated()) {
                for (var d = a.array$Values(e), g = 0;g < d.length;g++) {
                    this.add$Value(e, f ? d[g].clone() : d[g]);
                }
            } else {
                d = a.getValueForTag_(e), f ? (f = this.getValueForTag_(e)) ? f.mergeFrom(d) : this.set$Value(e, d.clone()) : this.set$Value(e, d);
            }
        }
    }
};
goog.proto2.Message.prototype.clone = function() {
    var a = new this.constructor;
    a.copyFrom(this);
    return a;
};
goog.proto2.Message.prototype.initDefaults = function(a) {
    for (var b = this.getDescriptor().getFields(), c = 0;c < b.length;c++) {
        var d = b[c], e = d.getTag(), f = d.isCompositeType();
        this.has$Value(e) || d.isRepeated() || (f ? this.values_[e] = new (d.getNativeType()) : a && (this.values_[e] = d.getDefaultValue()));
        if (f) {
            if (d.isRepeated()) {
                for (d = this.array$Values(e), e = 0;e < d.length;e++) {
                    d[e].initDefaults(a);
                }
            } else {
                this.get$Value(e).initDefaults(a);
            }
        }
    }
};
goog.proto2.Message.prototype.has$Value = function(a) {
    return null != this.values_[a];
};
goog.proto2.Message.prototype.getValueForTag_ = function(a) {
    var b = this.values_[a];
    return goog.isDefAndNotNull(b) ? this.lazyDeserializer_ ? a in this.deserializedFields_ ? this.deserializedFields_[a] : (b = this.lazyDeserializer_.deserializeField(this, this.fields_[a], b), this.deserializedFields_[a] = b) : b : null;
};
goog.proto2.Message.prototype.get$Value = function(a, b) {
    var c = this.getValueForTag_(a);
    if (this.fields_[a].isRepeated()) {
        var d = b || 0;
        goog.asserts.assert(0 <= d && d < c.length, "Given index %s is out of bounds.  Repeated field length: %s", d, c.length);
        return c[d];
    }
    return c;
};
goog.proto2.Message.prototype.get$ValueOrDefault = function(a, b) {
    return this.has$Value(a) ? this.get$Value(a, b) : this.fields_[a].getDefaultValue();
};
goog.proto2.Message.prototype.array$Values = function(a) {
    return this.getValueForTag_(a) || [];
};
goog.proto2.Message.prototype.count$Values = function(a) {
    return this.fields_[a].isRepeated() ? this.has$Value(a) ? this.values_[a].length : 0 : this.has$Value(a) ? 1 : 0;
};
goog.proto2.Message.prototype.set$Value = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && this.checkFieldType_(this.fields_[a], b);
    this.values_[a] = b;
    this.deserializedFields_ && (this.deserializedFields_[a] = b);
};
goog.proto2.Message.prototype.add$Value = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && this.checkFieldType_(this.fields_[a], b);
    this.values_[a] || (this.values_[a] = []);
    this.values_[a].push(b);
    this.deserializedFields_ && delete this.deserializedFields_[a];
};
goog.proto2.Message.prototype.checkFieldType_ = function(a, b) {
    a.getFieldType() == goog.proto2.FieldDescriptor.FieldType.ENUM ? goog.asserts.assertNumber(b) : goog.asserts.assert(Object(b).constructor == a.getNativeType());
};
goog.proto2.Message.prototype.clear$Field = function(a) {
    delete this.values_[a];
    this.deserializedFields_ && delete this.deserializedFields_[a];
};
goog.proto2.Message.createDescriptor = function(a, b) {
    var c = [], d = b[0], e;
    for (e in b) {
        0 != e && c.push(new goog.proto2.FieldDescriptor(a, e, b[e]));
    }
    return new goog.proto2.Descriptor(a, d, c);
};
goog.proto2.Serializer = function() {
};
goog.proto2.Serializer.DECODE_SYMBOLIC_ENUMS = !1;
goog.proto2.Serializer.prototype.serialize = goog.abstractMethod;
goog.proto2.Serializer.prototype.getSerializedValue = function(a, b) {
    return a.isCompositeType() ? this.serialize(b) : goog.isNumber(b) && !isFinite(b) ? b.toString() : b;
};
goog.proto2.Serializer.prototype.deserialize = function(a, b) {
    var c = a.createMessageInstance();
    this.deserializeTo(c, b);
    goog.asserts.assert(c instanceof goog.proto2.Message);
    return c;
};
goog.proto2.Serializer.prototype.deserializeTo = goog.abstractMethod;
goog.proto2.Serializer.prototype.getDeserializedValue = function(a, b) {
    if (a.isCompositeType()) {
        return b instanceof goog.proto2.Message ? b : this.deserialize(a.getFieldMessageType(), b);
    }
    if (a.getFieldType() == goog.proto2.FieldDescriptor.FieldType.ENUM) {
        if (goog.proto2.Serializer.DECODE_SYMBOLIC_ENUMS && goog.isString(b)) {
            var c = a.getNativeType();
            if (c.hasOwnProperty(b)) {
                return c[b];
            }
        }
        return goog.isString(b) && goog.proto2.Serializer.INTEGER_REGEX.test(b) && (c = Number(b), 0 < c) ? c : b;
    }
    if (!a.deserializationConversionPermitted()) {
        return b;
    }
    c = a.getNativeType();
    if (c === String) {
        if (goog.isNumber(b)) {
            return String(b);
        }
    } else {
        if (c === Number && goog.isString(b) && ("Infinity" === b || "-Infinity" === b || "NaN" === b || goog.proto2.Serializer.INTEGER_REGEX.test(b))) {
            return Number(b);
        }
    }
    return b;
};
goog.proto2.Serializer.INTEGER_REGEX = /^-?[0-9]+$/;
goog.proto2.LazyDeserializer = function() {
};
goog.inherits(goog.proto2.LazyDeserializer, goog.proto2.Serializer);
goog.proto2.LazyDeserializer.prototype.deserialize = function(a, b) {
    var c = a.createMessageInstance();
    c.initializeForLazyDeserializer(this, b);
    goog.asserts.assert(c instanceof goog.proto2.Message);
    return c;
};
goog.proto2.LazyDeserializer.prototype.deserializeTo = function(a, b) {
    throw Error("Unimplemented");
};
goog.proto2.LazyDeserializer.prototype.deserializeField = goog.abstractMethod;
goog.proto2.PbLiteSerializer = function() {
};
goog.inherits(goog.proto2.PbLiteSerializer, goog.proto2.LazyDeserializer);
goog.proto2.PbLiteSerializer.prototype.zeroIndexing_ = !1;
goog.proto2.PbLiteSerializer.prototype.setZeroIndexed = function(a) {
    this.zeroIndexing_ = a;
};
goog.proto2.PbLiteSerializer.prototype.serialize = function(a) {
    for (var b = a.getDescriptor().getFields(), c = [], d = this.zeroIndexing_, e = 0;e < b.length;e++) {
        var f = b[e];
        if (a.has(f)) {
            var g = f.getTag(), g = d ? g - 1 : g;
            if (f.isRepeated()) {
                c[g] = [];
                for (var h = 0;h < a.countOf(f);h++) {
                    c[g][h] = this.getSerializedValue(f, a.get(f, h));
                }
            } else {
                c[g] = this.getSerializedValue(f, a.get(f));
            }
        }
    }
    a.forEachUnknown(function(a, b) {
        c[d ? a - 1 : a] = b;
    });
    return c;
};
goog.proto2.PbLiteSerializer.prototype.deserializeField = function(a, b, c) {
    if (null == c) {
        return c;
    }
    if (b.isRepeated()) {
        a = [];
        goog.asserts.assert(goog.isArray(c), "Value must be array: %s", c);
        for (var d = 0;d < c.length;d++) {
            a[d] = this.getDeserializedValue(b, c[d]);
        }
        return a;
    }
    return this.getDeserializedValue(b, c);
};
goog.proto2.PbLiteSerializer.prototype.getSerializedValue = function(a, b) {
    return a.getFieldType() == goog.proto2.FieldDescriptor.FieldType.BOOL ? b ? 1 : 0 : goog.proto2.Serializer.prototype.getSerializedValue.apply(this, arguments);
};
goog.proto2.PbLiteSerializer.prototype.getDeserializedValue = function(a, b) {
    return a.getFieldType() == goog.proto2.FieldDescriptor.FieldType.BOOL ? (goog.asserts.assert(goog.isNumber(b) || goog.isBoolean(b), "Value is expected to be a number or boolean"), !!b) : goog.proto2.Serializer.prototype.getDeserializedValue.apply(this, arguments);
};
goog.proto2.PbLiteSerializer.prototype.deserialize = function(a, b) {
    var c = b;
    if (this.zeroIndexing_) {
        var c = [], d;
        for (d in b) {
            c[parseInt(d, 10) + 1] = b[d];
        }
    }
    return goog.proto2.PbLiteSerializer.superClass_.deserialize.call(this, a, c);
};
goog.string.StringBuffer = function(a, b) {
    null != a && this.append.apply(this, arguments);
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
    this.buffer_ = "" + a;
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
    this.buffer_ += String(a);
    if (null != b) {
        for (var d = 1;d < arguments.length;d++) {
            this.buffer_ += arguments[d];
        }
    }
    return this;
};
goog.string.StringBuffer.prototype.clear = function() {
    this.buffer_ = "";
};
goog.string.StringBuffer.prototype.getLength = function() {
    return this.buffer_.length;
};
goog.string.StringBuffer.prototype.toString = function() {
    return this.buffer_;
};
/*

 Protocol Buffer 2 Copyright 2008 Google Inc.
 All other code copyright its respective owners.
 Copyright (C) 2010 The Libphonenumber Authors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/*第一替代开始
phonemetadata.pb.js
*/
var i18n = {phonenumbers:{}};
i18n.phonenumbers.NumberFormat = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.NumberFormat, goog.proto2.Message);
i18n.phonenumbers.NumberFormat.descriptor_ = null;
i18n.phonenumbers.NumberFormat.prototype.clone;
i18n.phonenumbers.NumberFormat.prototype.getPattern = function() {
    return   (this.get$Value(1));
};
i18n.phonenumbers.NumberFormat.prototype.getPatternOrDefault = function() {
    return   (this.get$ValueOrDefault(1));
};
i18n.phonenumbers.NumberFormat.prototype.setPattern = function(value) {
    this.set$Value(1, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasPattern = function() {
    return this.has$Value(1);
};
i18n.phonenumbers.NumberFormat.prototype.patternCount = function() {
    return this.count$Values(1);
};
i18n.phonenumbers.NumberFormat.prototype.clearPattern = function() {
    this.clear$Field(1);
};
i18n.phonenumbers.NumberFormat.prototype.getFormat = function() {
    return   (this.get$Value(2));
};
i18n.phonenumbers.NumberFormat.prototype.getFormatOrDefault = function() {
    return   (this.get$ValueOrDefault(2));
};
i18n.phonenumbers.NumberFormat.prototype.setFormat = function(value) {
    this.set$Value(2, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasFormat = function() {
    return this.has$Value(2);
};
i18n.phonenumbers.NumberFormat.prototype.formatCount = function() {
    return this.count$Values(2);
};
i18n.phonenumbers.NumberFormat.prototype.clearFormat = function() {
    this.clear$Field(2);
};
i18n.phonenumbers.NumberFormat.prototype.getLeadingDigitsPattern = function(index) {
    return   (this.get$Value(3, index));
};
i18n.phonenumbers.NumberFormat.prototype.getLeadingDigitsPatternOrDefault = function(index) {
    return   (this.get$ValueOrDefault(3, index));
};
i18n.phonenumbers.NumberFormat.prototype.addLeadingDigitsPattern = function(value) {
    this.add$Value(3, value);
};
i18n.phonenumbers.NumberFormat.prototype.leadingDigitsPatternArray = function() {
    return   (this.array$Values(3));
};
i18n.phonenumbers.NumberFormat.prototype.hasLeadingDigitsPattern = function() {
    return this.has$Value(3);
};
i18n.phonenumbers.NumberFormat.prototype.leadingDigitsPatternCount = function() {
    return this.count$Values(3);
};
i18n.phonenumbers.NumberFormat.prototype.clearLeadingDigitsPattern = function() {
    this.clear$Field(3);
};
i18n.phonenumbers.NumberFormat.prototype.getNationalPrefixFormattingRule = function() {
    return   (this.get$Value(4));
};
i18n.phonenumbers.NumberFormat.prototype.getNationalPrefixFormattingRuleOrDefault = function() {
    return   (this.get$ValueOrDefault(4));
};
i18n.phonenumbers.NumberFormat.prototype.setNationalPrefixFormattingRule = function(value) {
    this.set$Value(4, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasNationalPrefixFormattingRule = function() {
    return this.has$Value(4);
};
i18n.phonenumbers.NumberFormat.prototype.nationalPrefixFormattingRuleCount = function() {
    return this.count$Values(4);
};
i18n.phonenumbers.NumberFormat.prototype.clearNationalPrefixFormattingRule = function() {
    this.clear$Field(4);
};
i18n.phonenumbers.NumberFormat.prototype.getNationalPrefixOptionalWhenFormatting = function() {
    return   (this.get$Value(6));
};
i18n.phonenumbers.NumberFormat.prototype.getNationalPrefixOptionalWhenFormattingOrDefault = function() {
    return   (this.get$ValueOrDefault(6));
};
i18n.phonenumbers.NumberFormat.prototype.setNationalPrefixOptionalWhenFormatting = function(value) {
    this.set$Value(6, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasNationalPrefixOptionalWhenFormatting = function() {
    return this.has$Value(6);
};
i18n.phonenumbers.NumberFormat.prototype.nationalPrefixOptionalWhenFormattingCount = function() {
    return this.count$Values(6);
};
i18n.phonenumbers.NumberFormat.prototype.clearNationalPrefixOptionalWhenFormatting = function() {
    this.clear$Field(6);
};
i18n.phonenumbers.NumberFormat.prototype.getDomesticCarrierCodeFormattingRule = function() {
    return   (this.get$Value(5));
};
i18n.phonenumbers.NumberFormat.prototype.getDomesticCarrierCodeFormattingRuleOrDefault = function() {
    return   (this.get$ValueOrDefault(5));
};
i18n.phonenumbers.NumberFormat.prototype.setDomesticCarrierCodeFormattingRule = function(value) {
    this.set$Value(5, value);
};
i18n.phonenumbers.NumberFormat.prototype.hasDomesticCarrierCodeFormattingRule = function() {
    return this.has$Value(5);
};
i18n.phonenumbers.NumberFormat.prototype.domesticCarrierCodeFormattingRuleCount = function() {
    return this.count$Values(5);
};
i18n.phonenumbers.NumberFormat.prototype.clearDomesticCarrierCodeFormattingRule = function() {
    this.clear$Field(5);
};
i18n.phonenumbers.PhoneNumberDesc = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.PhoneNumberDesc, goog.proto2.Message);
i18n.phonenumbers.PhoneNumberDesc.descriptor_ = null;
i18n.phonenumbers.PhoneNumberDesc.prototype.clone;
i18n.phonenumbers.PhoneNumberDesc.prototype.getNationalNumberPattern = function() {
    return   (this.get$Value(2));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getNationalNumberPatternOrDefault = function() {
    return   (this.get$ValueOrDefault(2));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.setNationalNumberPattern = function(value) {
    this.set$Value(2, value);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.hasNationalNumberPattern = function() {
    return this.has$Value(2);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.nationalNumberPatternCount = function() {
    return this.count$Values(2);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.clearNationalNumberPattern = function() {
    this.clear$Field(2);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getPossibleLength = function(index) {
    return   (this.get$Value(9, index));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getPossibleLengthOrDefault = function(index) {
    return   (this.get$ValueOrDefault(9, index));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.addPossibleLength = function(value) {
    this.add$Value(9, value);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.possibleLengthArray = function() {
    return   (this.array$Values(9));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.hasPossibleLength = function() {
    return this.has$Value(9);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.possibleLengthCount = function() {
    return this.count$Values(9);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.clearPossibleLength = function() {
    this.clear$Field(9);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getPossibleLengthLocalOnly = function(index) {
    return   (this.get$Value(10, index));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getPossibleLengthLocalOnlyOrDefault = function(index) {
    return   (this.get$ValueOrDefault(10, index));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.addPossibleLengthLocalOnly = function(value) {
    this.add$Value(10, value);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.possibleLengthLocalOnlyArray = function() {
    return   (this.array$Values(10));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.hasPossibleLengthLocalOnly = function() {
    return this.has$Value(10);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.possibleLengthLocalOnlyCount = function() {
    return this.count$Values(10);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.clearPossibleLengthLocalOnly = function() {
    this.clear$Field(10);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getExampleNumber = function() {
    return   (this.get$Value(6));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.getExampleNumberOrDefault = function() {
    return   (this.get$ValueOrDefault(6));
};
i18n.phonenumbers.PhoneNumberDesc.prototype.setExampleNumber = function(value) {
    this.set$Value(6, value);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.hasExampleNumber = function() {
    return this.has$Value(6);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.exampleNumberCount = function() {
    return this.count$Values(6);
};
i18n.phonenumbers.PhoneNumberDesc.prototype.clearExampleNumber = function() {
    this.clear$Field(6);
};
i18n.phonenumbers.PhoneMetadata = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.PhoneMetadata, goog.proto2.Message);
i18n.phonenumbers.PhoneMetadata.descriptor_ = null;
i18n.phonenumbers.PhoneMetadata.prototype.clone;
i18n.phonenumbers.PhoneMetadata.prototype.getGeneralDesc = function() {
    return   (this.get$Value(1));
};
i18n.phonenumbers.PhoneMetadata.prototype.getGeneralDescOrDefault = function() {
    return   (this.get$ValueOrDefault(1));
};
i18n.phonenumbers.PhoneMetadata.prototype.setGeneralDesc = function(value) {
    this.set$Value(1, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasGeneralDesc = function() {
    return this.has$Value(1);
};
i18n.phonenumbers.PhoneMetadata.prototype.generalDescCount = function() {
    return this.count$Values(1);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearGeneralDesc = function() {
    this.clear$Field(1);
};
i18n.phonenumbers.PhoneMetadata.prototype.getFixedLine = function() {
    return   (this.get$Value(2));
};
i18n.phonenumbers.PhoneMetadata.prototype.getFixedLineOrDefault = function() {
    return   (this.get$ValueOrDefault(2));
};
i18n.phonenumbers.PhoneMetadata.prototype.setFixedLine = function(value) {
    this.set$Value(2, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasFixedLine = function() {
    return this.has$Value(2);
};
i18n.phonenumbers.PhoneMetadata.prototype.fixedLineCount = function() {
    return this.count$Values(2);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearFixedLine = function() {
    this.clear$Field(2);
};
i18n.phonenumbers.PhoneMetadata.prototype.getMobile = function() {
    return   (this.get$Value(3));
};
i18n.phonenumbers.PhoneMetadata.prototype.getMobileOrDefault = function() {
    return   (this.get$ValueOrDefault(3));
};
i18n.phonenumbers.PhoneMetadata.prototype.setMobile = function(value) {
    this.set$Value(3, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasMobile = function() {
    return this.has$Value(3);
};
i18n.phonenumbers.PhoneMetadata.prototype.mobileCount = function() {
    return this.count$Values(3);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearMobile = function() {
    this.clear$Field(3);
};
i18n.phonenumbers.PhoneMetadata.prototype.getTollFree = function() {
    return   (this.get$Value(4));
};
i18n.phonenumbers.PhoneMetadata.prototype.getTollFreeOrDefault = function() {
    return   (this.get$ValueOrDefault(4));
};
i18n.phonenumbers.PhoneMetadata.prototype.setTollFree = function(value) {
    this.set$Value(4, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasTollFree = function() {
    return this.has$Value(4);
};
i18n.phonenumbers.PhoneMetadata.prototype.tollFreeCount = function() {
    return this.count$Values(4);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearTollFree = function() {
    this.clear$Field(4);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPremiumRate = function() {
    return   (this.get$Value(5));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPremiumRateOrDefault = function() {
    return   (this.get$ValueOrDefault(5));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPremiumRate = function(value) {
    this.set$Value(5, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPremiumRate = function() {
    return this.has$Value(5);
};
i18n.phonenumbers.PhoneMetadata.prototype.premiumRateCount = function() {
    return this.count$Values(5);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPremiumRate = function() {
    this.clear$Field(5);
};
i18n.phonenumbers.PhoneMetadata.prototype.getSharedCost = function() {
    return   (this.get$Value(6));
};
i18n.phonenumbers.PhoneMetadata.prototype.getSharedCostOrDefault = function() {
    return   (this.get$ValueOrDefault(6));
};
i18n.phonenumbers.PhoneMetadata.prototype.setSharedCost = function(value) {
    this.set$Value(6, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasSharedCost = function() {
    return this.has$Value(6);
};
i18n.phonenumbers.PhoneMetadata.prototype.sharedCostCount = function() {
    return this.count$Values(6);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearSharedCost = function() {
    this.clear$Field(6);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPersonalNumber = function() {
    return   (this.get$Value(7));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPersonalNumberOrDefault = function() {
    return   (this.get$ValueOrDefault(7));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPersonalNumber = function(value) {
    this.set$Value(7, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPersonalNumber = function() {
    return this.has$Value(7);
};
i18n.phonenumbers.PhoneMetadata.prototype.personalNumberCount = function() {
    return this.count$Values(7);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPersonalNumber = function() {
    this.clear$Field(7);
};
i18n.phonenumbers.PhoneMetadata.prototype.getVoip = function() {
    return   (this.get$Value(8));
};
i18n.phonenumbers.PhoneMetadata.prototype.getVoipOrDefault = function() {
    return   (this.get$ValueOrDefault(8));
};
i18n.phonenumbers.PhoneMetadata.prototype.setVoip = function(value) {
    this.set$Value(8, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasVoip = function() {
    return this.has$Value(8);
};
i18n.phonenumbers.PhoneMetadata.prototype.voipCount = function() {
    return this.count$Values(8);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearVoip = function() {
    this.clear$Field(8);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPager = function() {
    return   (this.get$Value(21));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPagerOrDefault = function() {
    return   (this.get$ValueOrDefault(21));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPager = function(value) {
    this.set$Value(21, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPager = function() {
    return this.has$Value(21);
};
i18n.phonenumbers.PhoneMetadata.prototype.pagerCount = function() {
    return this.count$Values(21);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPager = function() {
    this.clear$Field(21);
};
i18n.phonenumbers.PhoneMetadata.prototype.getUan = function() {
    return   (this.get$Value(25));
};
i18n.phonenumbers.PhoneMetadata.prototype.getUanOrDefault = function() {
    return   (this.get$ValueOrDefault(25));
};
i18n.phonenumbers.PhoneMetadata.prototype.setUan = function(value) {
    this.set$Value(25, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasUan = function() {
    return this.has$Value(25);
};
i18n.phonenumbers.PhoneMetadata.prototype.uanCount = function() {
    return this.count$Values(25);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearUan = function() {
    this.clear$Field(25);
};
i18n.phonenumbers.PhoneMetadata.prototype.getEmergency = function() {
    return   (this.get$Value(27));
};
i18n.phonenumbers.PhoneMetadata.prototype.getEmergencyOrDefault = function() {
    return   (this.get$ValueOrDefault(27));
};
i18n.phonenumbers.PhoneMetadata.prototype.setEmergency = function(value) {
    this.set$Value(27, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasEmergency = function() {
    return this.has$Value(27);
};
i18n.phonenumbers.PhoneMetadata.prototype.emergencyCount = function() {
    return this.count$Values(27);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearEmergency = function() {
    this.clear$Field(27);
};
i18n.phonenumbers.PhoneMetadata.prototype.getVoicemail = function() {
    return   (this.get$Value(28));
};
i18n.phonenumbers.PhoneMetadata.prototype.getVoicemailOrDefault = function() {
    return   (this.get$ValueOrDefault(28));
};
i18n.phonenumbers.PhoneMetadata.prototype.setVoicemail = function(value) {
    this.set$Value(28, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasVoicemail = function() {
    return this.has$Value(28);
};
i18n.phonenumbers.PhoneMetadata.prototype.voicemailCount = function() {
    return this.count$Values(28);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearVoicemail = function() {
    this.clear$Field(28);
};
i18n.phonenumbers.PhoneMetadata.prototype.getShortCode = function() {
    return   (this.get$Value(29));
};
i18n.phonenumbers.PhoneMetadata.prototype.getShortCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(29));
};
i18n.phonenumbers.PhoneMetadata.prototype.setShortCode = function(value) {
    this.set$Value(29, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasShortCode = function() {
    return this.has$Value(29);
};
i18n.phonenumbers.PhoneMetadata.prototype.shortCodeCount = function() {
    return this.count$Values(29);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearShortCode = function() {
    this.clear$Field(29);
};
i18n.phonenumbers.PhoneMetadata.prototype.getStandardRate = function() {
    return   (this.get$Value(30));
};
i18n.phonenumbers.PhoneMetadata.prototype.getStandardRateOrDefault = function() {
    return   (this.get$ValueOrDefault(30));
};
i18n.phonenumbers.PhoneMetadata.prototype.setStandardRate = function(value) {
    this.set$Value(30, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasStandardRate = function() {
    return this.has$Value(30);
};
i18n.phonenumbers.PhoneMetadata.prototype.standardRateCount = function() {
    return this.count$Values(30);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearStandardRate = function() {
    this.clear$Field(30);
};
i18n.phonenumbers.PhoneMetadata.prototype.getCarrierSpecific = function() {
    return   (this.get$Value(31));
};
i18n.phonenumbers.PhoneMetadata.prototype.getCarrierSpecificOrDefault = function() {
    return   (this.get$ValueOrDefault(31));
};
i18n.phonenumbers.PhoneMetadata.prototype.setCarrierSpecific = function(value) {
    this.set$Value(31, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasCarrierSpecific = function() {
    return this.has$Value(31);
};
i18n.phonenumbers.PhoneMetadata.prototype.carrierSpecificCount = function() {
    return this.count$Values(31);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearCarrierSpecific = function() {
    this.clear$Field(31);
};
i18n.phonenumbers.PhoneMetadata.prototype.getSmsServices = function() {
    return   (this.get$Value(33));
};
i18n.phonenumbers.PhoneMetadata.prototype.getSmsServicesOrDefault = function() {
    return   (this.get$ValueOrDefault(33));
};
i18n.phonenumbers.PhoneMetadata.prototype.setSmsServices = function(value) {
    this.set$Value(33, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasSmsServices = function() {
    return this.has$Value(33);
};
i18n.phonenumbers.PhoneMetadata.prototype.smsServicesCount = function() {
    return this.count$Values(33);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearSmsServices = function() {
    this.clear$Field(33);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNoInternationalDialling = function() {
    return   (this.get$Value(24));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNoInternationalDiallingOrDefault = function() {
    return   (this.get$ValueOrDefault(24));
};
i18n.phonenumbers.PhoneMetadata.prototype.setNoInternationalDialling = function(value) {
    this.set$Value(24, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNoInternationalDialling = function() {
    return this.has$Value(24);
};
i18n.phonenumbers.PhoneMetadata.prototype.noInternationalDiallingCount = function() {
    return this.count$Values(24);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNoInternationalDialling = function() {
    this.clear$Field(24);
};
i18n.phonenumbers.PhoneMetadata.prototype.getId = function() {
    return   (this.get$Value(9));
};
i18n.phonenumbers.PhoneMetadata.prototype.getIdOrDefault = function() {
    return   (this.get$ValueOrDefault(9));
};
i18n.phonenumbers.PhoneMetadata.prototype.setId = function(value) {
    this.set$Value(9, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasId = function() {
    return this.has$Value(9);
};
i18n.phonenumbers.PhoneMetadata.prototype.idCount = function() {
    return this.count$Values(9);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearId = function() {
    this.clear$Field(9);
};
i18n.phonenumbers.PhoneMetadata.prototype.getCountryCode = function() {
    return   (this.get$Value(10));
};
i18n.phonenumbers.PhoneMetadata.prototype.getCountryCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(10));
};
i18n.phonenumbers.PhoneMetadata.prototype.setCountryCode = function(value) {
    this.set$Value(10, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasCountryCode = function() {
    return this.has$Value(10);
};
i18n.phonenumbers.PhoneMetadata.prototype.countryCodeCount = function() {
    return this.count$Values(10);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearCountryCode = function() {
    this.clear$Field(10);
};
i18n.phonenumbers.PhoneMetadata.prototype.getInternationalPrefix = function() {
    return   (this.get$Value(11));
};
i18n.phonenumbers.PhoneMetadata.prototype.getInternationalPrefixOrDefault = function() {
    return   (this.get$ValueOrDefault(11));
};
i18n.phonenumbers.PhoneMetadata.prototype.setInternationalPrefix = function(value) {
    this.set$Value(11, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasInternationalPrefix = function() {
    return this.has$Value(11);
};
i18n.phonenumbers.PhoneMetadata.prototype.internationalPrefixCount = function() {
    return this.count$Values(11);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearInternationalPrefix = function() {
    this.clear$Field(11);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPreferredInternationalPrefix = function() {
    return   (this.get$Value(17));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPreferredInternationalPrefixOrDefault = function() {
    return   (this.get$ValueOrDefault(17));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPreferredInternationalPrefix = function(value) {
    this.set$Value(17, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPreferredInternationalPrefix = function() {
    return this.has$Value(17);
};
i18n.phonenumbers.PhoneMetadata.prototype.preferredInternationalPrefixCount = function() {
    return this.count$Values(17);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPreferredInternationalPrefix = function() {
    this.clear$Field(17);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefix = function() {
    return   (this.get$Value(12));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixOrDefault = function() {
    return   (this.get$ValueOrDefault(12));
};
i18n.phonenumbers.PhoneMetadata.prototype.setNationalPrefix = function(value) {
    this.set$Value(12, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNationalPrefix = function() {
    return this.has$Value(12);
};
i18n.phonenumbers.PhoneMetadata.prototype.nationalPrefixCount = function() {
    return this.count$Values(12);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNationalPrefix = function() {
    this.clear$Field(12);
};
i18n.phonenumbers.PhoneMetadata.prototype.getPreferredExtnPrefix = function() {
    return   (this.get$Value(13));
};
i18n.phonenumbers.PhoneMetadata.prototype.getPreferredExtnPrefixOrDefault = function() {
    return   (this.get$ValueOrDefault(13));
};
i18n.phonenumbers.PhoneMetadata.prototype.setPreferredExtnPrefix = function(value) {
    this.set$Value(13, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasPreferredExtnPrefix = function() {
    return this.has$Value(13);
};
i18n.phonenumbers.PhoneMetadata.prototype.preferredExtnPrefixCount = function() {
    return this.count$Values(13);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearPreferredExtnPrefix = function() {
    this.clear$Field(13);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixForParsing = function() {
    return   (this.get$Value(15));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixForParsingOrDefault = function() {
    return   (this.get$ValueOrDefault(15));
};
i18n.phonenumbers.PhoneMetadata.prototype.setNationalPrefixForParsing = function(value) {
    this.set$Value(15, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNationalPrefixForParsing = function() {
    return this.has$Value(15);
};
i18n.phonenumbers.PhoneMetadata.prototype.nationalPrefixForParsingCount = function() {
    return this.count$Values(15);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNationalPrefixForParsing = function() {
    this.clear$Field(15);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixTransformRule = function() {
    return   (this.get$Value(16));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNationalPrefixTransformRuleOrDefault = function() {
    return   (this.get$ValueOrDefault(16));
};
i18n.phonenumbers.PhoneMetadata.prototype.setNationalPrefixTransformRule = function(value) {
    this.set$Value(16, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNationalPrefixTransformRule = function() {
    return this.has$Value(16);
};
i18n.phonenumbers.PhoneMetadata.prototype.nationalPrefixTransformRuleCount = function() {
    return this.count$Values(16);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNationalPrefixTransformRule = function() {
    this.clear$Field(16);
};
i18n.phonenumbers.PhoneMetadata.prototype.getSameMobileAndFixedLinePattern = function() {
    return   (this.get$Value(18));
};
i18n.phonenumbers.PhoneMetadata.prototype.getSameMobileAndFixedLinePatternOrDefault = function() {
    return   (this.get$ValueOrDefault(18));
};
i18n.phonenumbers.PhoneMetadata.prototype.setSameMobileAndFixedLinePattern = function(value) {
    this.set$Value(18, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasSameMobileAndFixedLinePattern = function() {
    return this.has$Value(18);
};
i18n.phonenumbers.PhoneMetadata.prototype.sameMobileAndFixedLinePatternCount = function() {
    return this.count$Values(18);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearSameMobileAndFixedLinePattern = function() {
    this.clear$Field(18);
};
i18n.phonenumbers.PhoneMetadata.prototype.getNumberFormat = function(index) {
    return   (this.get$Value(19, index));
};
i18n.phonenumbers.PhoneMetadata.prototype.getNumberFormatOrDefault = function(index) {
    return   (this.get$ValueOrDefault(19, index));
};
i18n.phonenumbers.PhoneMetadata.prototype.addNumberFormat = function(value) {
    this.add$Value(19, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.numberFormatArray = function() {
    return   (this.array$Values(19));
};
i18n.phonenumbers.PhoneMetadata.prototype.hasNumberFormat = function() {
    return this.has$Value(19);
};
i18n.phonenumbers.PhoneMetadata.prototype.numberFormatCount = function() {
    return this.count$Values(19);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearNumberFormat = function() {
    this.clear$Field(19);
};
i18n.phonenumbers.PhoneMetadata.prototype.getIntlNumberFormat = function(index) {
    return   (this.get$Value(20, index));
};
i18n.phonenumbers.PhoneMetadata.prototype.getIntlNumberFormatOrDefault = function(index) {
    return   (this.get$ValueOrDefault(20, index));
};
i18n.phonenumbers.PhoneMetadata.prototype.addIntlNumberFormat = function(value) {
    this.add$Value(20, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.intlNumberFormatArray = function() {
    return   (this.array$Values(20));
};
i18n.phonenumbers.PhoneMetadata.prototype.hasIntlNumberFormat = function() {
    return this.has$Value(20);
};
i18n.phonenumbers.PhoneMetadata.prototype.intlNumberFormatCount = function() {
    return this.count$Values(20);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearIntlNumberFormat = function() {
    this.clear$Field(20);
};
i18n.phonenumbers.PhoneMetadata.prototype.getMainCountryForCode = function() {
    return   (this.get$Value(22));
};
i18n.phonenumbers.PhoneMetadata.prototype.getMainCountryForCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(22));
};
i18n.phonenumbers.PhoneMetadata.prototype.setMainCountryForCode = function(value) {
    this.set$Value(22, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasMainCountryForCode = function() {
    return this.has$Value(22);
};
i18n.phonenumbers.PhoneMetadata.prototype.mainCountryForCodeCount = function() {
    return this.count$Values(22);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearMainCountryForCode = function() {
    this.clear$Field(22);
};
i18n.phonenumbers.PhoneMetadata.prototype.getLeadingDigits = function() {
    return   (this.get$Value(23));
};
i18n.phonenumbers.PhoneMetadata.prototype.getLeadingDigitsOrDefault = function() {
    return   (this.get$ValueOrDefault(23));
};
i18n.phonenumbers.PhoneMetadata.prototype.setLeadingDigits = function(value) {
    this.set$Value(23, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasLeadingDigits = function() {
    return this.has$Value(23);
};
i18n.phonenumbers.PhoneMetadata.prototype.leadingDigitsCount = function() {
    return this.count$Values(23);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearLeadingDigits = function() {
    this.clear$Field(23);
};
i18n.phonenumbers.PhoneMetadata.prototype.getLeadingZeroPossible = function() {
    return   (this.get$Value(26));
};
i18n.phonenumbers.PhoneMetadata.prototype.getLeadingZeroPossibleOrDefault = function() {
    return   (this.get$ValueOrDefault(26));
};
i18n.phonenumbers.PhoneMetadata.prototype.setLeadingZeroPossible = function(value) {
    this.set$Value(26, value);
};
i18n.phonenumbers.PhoneMetadata.prototype.hasLeadingZeroPossible = function() {
    return this.has$Value(26);
};
i18n.phonenumbers.PhoneMetadata.prototype.leadingZeroPossibleCount = function() {
    return this.count$Values(26);
};
i18n.phonenumbers.PhoneMetadata.prototype.clearLeadingZeroPossible = function() {
    this.clear$Field(26);
};
i18n.phonenumbers.PhoneMetadataCollection = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.PhoneMetadataCollection, goog.proto2.Message);
i18n.phonenumbers.PhoneMetadataCollection.descriptor_ = null;
i18n.phonenumbers.PhoneMetadataCollection.prototype.clone;
i18n.phonenumbers.PhoneMetadataCollection.prototype.getMetadata = function(index) {
    return   (this.get$Value(1, index));
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.getMetadataOrDefault = function(index) {
    return   (this.get$ValueOrDefault(1, index));
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.addMetadata = function(value) {
    this.add$Value(1, value);
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.metadataArray = function() {
    return   (this.array$Values(1));
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.hasMetadata = function() {
    return this.has$Value(1);
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.metadataCount = function() {
    return this.count$Values(1);
};
i18n.phonenumbers.PhoneMetadataCollection.prototype.clearMetadata = function() {
    this.clear$Field(1);
};
i18n.phonenumbers.NumberFormat.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.NumberFormat.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'NumberFormat',
                fullName: 'i18n.phonenumbers.NumberFormat'
            },
            1: {
                name: 'pattern',
                required: true,
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            2: {
                name: 'format',
                required: true,
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            3: {
                name: 'leading_digits_pattern',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            4: {
                name: 'national_prefix_formatting_rule',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            6: {
                name: 'national_prefix_optional_when_formatting',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                defaultValue: false,
                type: Boolean
            },
            5: {
                name: 'domestic_carrier_code_formatting_rule',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            }
        };
        i18n.phonenumbers.NumberFormat.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.NumberFormat, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.NumberFormat.getDescriptor =
    i18n.phonenumbers.NumberFormat.prototype.getDescriptor;
i18n.phonenumbers.PhoneNumberDesc.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.PhoneNumberDesc.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'PhoneNumberDesc',
                fullName: 'i18n.phonenumbers.PhoneNumberDesc'
            },
            2: {
                name: 'national_number_pattern',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            9: {
                name: 'possible_length',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.INT32,
                type: Number
            },
            10: {
                name: 'possible_length_local_only',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.INT32,
                type: Number
            },
            6: {
                name: 'example_number',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            }
        };
        i18n.phonenumbers.PhoneNumberDesc.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.PhoneNumberDesc, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.PhoneNumberDesc.getDescriptor =
    i18n.phonenumbers.PhoneNumberDesc.prototype.getDescriptor;
i18n.phonenumbers.PhoneMetadata.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.PhoneMetadata.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'PhoneMetadata',
                fullName: 'i18n.phonenumbers.PhoneMetadata'
            },
            1: {
                name: 'general_desc',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            2: {
                name: 'fixed_line',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            3: {
                name: 'mobile',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            4: {
                name: 'toll_free',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            5: {
                name: 'premium_rate',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            6: {
                name: 'shared_cost',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            7: {
                name: 'personal_number',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            8: {
                name: 'voip',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            21: {
                name: 'pager',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            25: {
                name: 'uan',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            27: {
                name: 'emergency',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            28: {
                name: 'voicemail',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            29: {
                name: 'short_code',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            30: {
                name: 'standard_rate',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            31: {
                name: 'carrier_specific',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            33: {
                name: 'sms_services',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            24: {
                name: 'no_international_dialling',
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneNumberDesc
            },
            9: {
                name: 'id',
                required: true,
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            10: {
                name: 'country_code',
                fieldType: goog.proto2.Message.FieldType.INT32,
                type: Number
            },
            11: {
                name: 'international_prefix',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            17: {
                name: 'preferred_international_prefix',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            12: {
                name: 'national_prefix',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            13: {
                name: 'preferred_extn_prefix',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            15: {
                name: 'national_prefix_for_parsing',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            16: {
                name: 'national_prefix_transform_rule',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            18: {
                name: 'same_mobile_and_fixed_line_pattern',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                defaultValue: false,
                type: Boolean
            },
            19: {
                name: 'number_format',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.NumberFormat
            },
            20: {
                name: 'intl_number_format',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.NumberFormat
            },
            22: {
                name: 'main_country_for_code',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                defaultValue: false,
                type: Boolean
            },
            23: {
                name: 'leading_digits',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            26: {
                name: 'leading_zero_possible',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                defaultValue: false,
                type: Boolean
            }
        };
        i18n.phonenumbers.PhoneMetadata.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.PhoneMetadata, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.PhoneMetadata.getDescriptor =
    i18n.phonenumbers.PhoneMetadata.prototype.getDescriptor;
i18n.phonenumbers.PhoneMetadataCollection.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.PhoneMetadataCollection.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'PhoneMetadataCollection',
                fullName: 'i18n.phonenumbers.PhoneMetadataCollection'
            },
            1: {
                name: 'metadata',
                repeated: true,
                fieldType: goog.proto2.Message.FieldType.MESSAGE,
                type: i18n.phonenumbers.PhoneMetadata
            }
        };
        i18n.phonenumbers.PhoneMetadataCollection.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.PhoneMetadataCollection, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.PhoneMetadataCollection.getDescriptor =
    i18n.phonenumbers.PhoneMetadataCollection.prototype.getDescriptor;
/*phonenumber.pb.js*/
i18n.phonenumbers.PhoneNumber = function() {
    goog.proto2.Message.call(this);
};
goog.inherits(i18n.phonenumbers.PhoneNumber, goog.proto2.Message);
i18n.phonenumbers.PhoneNumber.descriptor_ = null;
i18n.phonenumbers.PhoneNumber.prototype.clone;
i18n.phonenumbers.PhoneNumber.prototype.getCountryCode = function() {
    return   (this.get$Value(1));
};
i18n.phonenumbers.PhoneNumber.prototype.getCountryCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(1));
};
i18n.phonenumbers.PhoneNumber.prototype.setCountryCode = function(value) {
    this.set$Value(1, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasCountryCode = function() {
    return this.has$Value(1);
};
i18n.phonenumbers.PhoneNumber.prototype.countryCodeCount = function() {
    return this.count$Values(1);
};
i18n.phonenumbers.PhoneNumber.prototype.clearCountryCode = function() {
    this.clear$Field(1);
};
i18n.phonenumbers.PhoneNumber.prototype.getNationalNumber = function() {
    return   (this.get$Value(2));
};
i18n.phonenumbers.PhoneNumber.prototype.getNationalNumberOrDefault = function() {
    return   (this.get$ValueOrDefault(2));
};
i18n.phonenumbers.PhoneNumber.prototype.setNationalNumber = function(value) {
    this.set$Value(2, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasNationalNumber = function() {
    return this.has$Value(2);
};
i18n.phonenumbers.PhoneNumber.prototype.nationalNumberCount = function() {
    return this.count$Values(2);
};
i18n.phonenumbers.PhoneNumber.prototype.clearNationalNumber = function() {
    this.clear$Field(2);
};
i18n.phonenumbers.PhoneNumber.prototype.getExtension = function() {
    return   (this.get$Value(3));
};
i18n.phonenumbers.PhoneNumber.prototype.getExtensionOrDefault = function() {
    return   (this.get$ValueOrDefault(3));
};
i18n.phonenumbers.PhoneNumber.prototype.setExtension = function(value) {
    this.set$Value(3, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasExtension = function() {
    return this.has$Value(3);
};
i18n.phonenumbers.PhoneNumber.prototype.extensionCount = function() {
    return this.count$Values(3);
};
i18n.phonenumbers.PhoneNumber.prototype.clearExtension = function() {
    this.clear$Field(3);
};
i18n.phonenumbers.PhoneNumber.prototype.getItalianLeadingZero = function() {
    return   (this.get$Value(4));
};
i18n.phonenumbers.PhoneNumber.prototype.getItalianLeadingZeroOrDefault = function() {
    return   (this.get$ValueOrDefault(4));
};
i18n.phonenumbers.PhoneNumber.prototype.setItalianLeadingZero = function(value) {
    this.set$Value(4, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasItalianLeadingZero = function() {
    return this.has$Value(4);
};
i18n.phonenumbers.PhoneNumber.prototype.italianLeadingZeroCount = function() {
    return this.count$Values(4);
};
i18n.phonenumbers.PhoneNumber.prototype.clearItalianLeadingZero = function() {
    this.clear$Field(4);
};
i18n.phonenumbers.PhoneNumber.prototype.getNumberOfLeadingZeros = function() {
    return   (this.get$Value(8));
};
i18n.phonenumbers.PhoneNumber.prototype.getNumberOfLeadingZerosOrDefault = function() {
    return   (this.get$ValueOrDefault(8));
};
i18n.phonenumbers.PhoneNumber.prototype.setNumberOfLeadingZeros = function(value) {
    this.set$Value(8, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasNumberOfLeadingZeros = function() {
    return this.has$Value(8);
};
i18n.phonenumbers.PhoneNumber.prototype.numberOfLeadingZerosCount = function() {
    return this.count$Values(8);
};
i18n.phonenumbers.PhoneNumber.prototype.clearNumberOfLeadingZeros = function() {
    this.clear$Field(8);
};
i18n.phonenumbers.PhoneNumber.prototype.getRawInput = function() {
    return   (this.get$Value(5));
};
i18n.phonenumbers.PhoneNumber.prototype.getRawInputOrDefault = function() {
    return   (this.get$ValueOrDefault(5));
};
i18n.phonenumbers.PhoneNumber.prototype.setRawInput = function(value) {
    this.set$Value(5, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasRawInput = function() {
    return this.has$Value(5);
};
i18n.phonenumbers.PhoneNumber.prototype.rawInputCount = function() {
    return this.count$Values(5);
};
i18n.phonenumbers.PhoneNumber.prototype.clearRawInput = function() {
    this.clear$Field(5);
};
i18n.phonenumbers.PhoneNumber.prototype.getCountryCodeSource = function() {
    return   (this.get$Value(6));
};
i18n.phonenumbers.PhoneNumber.prototype.getCountryCodeSourceOrDefault = function() {
    return   (this.get$ValueOrDefault(6));
};
i18n.phonenumbers.PhoneNumber.prototype.setCountryCodeSource = function(value) {
    this.set$Value(6, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasCountryCodeSource = function() {
    return this.has$Value(6);
};
i18n.phonenumbers.PhoneNumber.prototype.countryCodeSourceCount = function() {
    return this.count$Values(6);
};
i18n.phonenumbers.PhoneNumber.prototype.clearCountryCodeSource = function() {
    this.clear$Field(6);
};
i18n.phonenumbers.PhoneNumber.prototype.getPreferredDomesticCarrierCode = function() {
    return   (this.get$Value(7));
};
i18n.phonenumbers.PhoneNumber.prototype.getPreferredDomesticCarrierCodeOrDefault = function() {
    return   (this.get$ValueOrDefault(7));
};
i18n.phonenumbers.PhoneNumber.prototype.setPreferredDomesticCarrierCode = function(value) {
    this.set$Value(7, value);
};
i18n.phonenumbers.PhoneNumber.prototype.hasPreferredDomesticCarrierCode = function() {
    return this.has$Value(7);
};
i18n.phonenumbers.PhoneNumber.prototype.preferredDomesticCarrierCodeCount = function() {
    return this.count$Values(7);
};
i18n.phonenumbers.PhoneNumber.prototype.clearPreferredDomesticCarrierCode = function() {
    this.clear$Field(7);
};
i18n.phonenumbers.PhoneNumber.CountryCodeSource = {
    UNSPECIFIED: 0,
    FROM_NUMBER_WITH_PLUS_SIGN: 1,
    FROM_NUMBER_WITH_IDD: 5,
    FROM_NUMBER_WITHOUT_PLUS_SIGN: 10,
    FROM_DEFAULT_COUNTRY: 20
};
i18n.phonenumbers.PhoneNumber.prototype.getDescriptor = function() {
    var descriptor = i18n.phonenumbers.PhoneNumber.descriptor_;
    if (!descriptor) {
        var descriptorObj = {
            0: {
                name: 'PhoneNumber',
                fullName: 'i18n.phonenumbers.PhoneNumber'
            },
            1: {
                name: 'country_code',
                required: true,
                fieldType: goog.proto2.Message.FieldType.INT32,
                type: Number
            },
            2: {
                name: 'national_number',
                required: true,
                fieldType: goog.proto2.Message.FieldType.UINT64,
                type: Number
            },
            3: {
                name: 'extension',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            4: {
                name: 'italian_leading_zero',
                fieldType: goog.proto2.Message.FieldType.BOOL,
                type: Boolean
            },
            8: {
                name: 'number_of_leading_zeros',
                fieldType: goog.proto2.Message.FieldType.INT32,
                defaultValue: 1,
                type: Number
            },
            5: {
                name: 'raw_input',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            },
            6: {
                name: 'country_code_source',
                fieldType: goog.proto2.Message.FieldType.ENUM,
                defaultValue: i18n.phonenumbers.PhoneNumber.CountryCodeSource.UNSPECIFIED,
                type: i18n.phonenumbers.PhoneNumber.CountryCodeSource
            },
            7: {
                name: 'preferred_domestic_carrier_code',
                fieldType: goog.proto2.Message.FieldType.STRING,
                type: String
            }
        };
        i18n.phonenumbers.PhoneNumber.descriptor_ = descriptor =
            goog.proto2.Message.createDescriptor(
                i18n.phonenumbers.PhoneNumber, descriptorObj);
    }
    return descriptor;
};
i18n.phonenumbers.PhoneNumber['ctor'] = i18n.phonenumbers.PhoneNumber;
i18n.phonenumbers.PhoneNumber['ctor'].getDescriptor =
    i18n.phonenumbers.PhoneNumber.prototype.getDescriptor;
/*phonenumber.pb.js*/
/*
metadata.js
*/
i18n.phonenumbers.metadata = {};
i18n.phonenumbers.metadata.countryCodeToRegionCodeMap = {1:["US","AG","AI","AS","BB","BM","BS","CA","DM","DO","GD","GU","JM","KN","KY","LC","MP","MS","PR","SX","TC","TT","VC","VG","VI"],7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],383:["XK"],385:["HR"],386:["SI"],387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],691:["FM"],692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]};

/**
 * A mapping from a region code to the PhoneMetadata for that region.
 * @type {!Object.<string, Array>}
 */
i18n.phonenumbers.metadata.countryToMetadata = {"AC":[,[,,"(?:[01589]\\d|[46])\\d{4}",,,,,,,[5,6]],[,,"6[2-467]\\d{3}",,,,"62889",,,[5]],[,,"4\\d{4}",,,,"40123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AC",247,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[01589]\\d{5}",,,,"542011",,,[6]],,,[,,,,,,,,,[-1]]],"AD":[,[,,"(?:1|6\\d)\\d{7}|[136-9]\\d{5}",,,,,,,[6,8,9]],[,,"[78]\\d{5}",,,,"712345",,,[6]],[,,"690\\d{6}|[36]\\d{5}",,,,"312345",,,[6,9]],[,,"180[02]\\d{4}",,,,"18001234",,,[8]],[,,"[19]\\d{5}",,,,"912345",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AD",376,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[136-9]"]],[,"(\\d{4})(\\d{4})","$1 $2",["1"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],,[,,,,,,,,,[-1]],,,[,,"1800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AE":[,[,,"(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"[2-4679][2-8]\\d{6}",,,,"22345678",,,[8],[7]],[,,"5[024-68]\\d{7}",,,,"501234567",,,[9]],[,,"400\\d{6}|800\\d{2,9}",,,,"800123456"],[,,"900[02]\\d{5}",,,,"900234567",,,[9]],[,,"700[05]\\d{5}",,,,"700012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AE",971,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"600[25]\\d{5}",,,,"600212345",,,[9]],,,[,,,,,,,,,[-1]]],"AF":[,[,,"[2-7]\\d{8}",,,,,,,[9],[7]],[,,"(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",,,,"234567890",,,,[7]],[,,"7(?:[014-9]\\d|2[89]|3[01])\\d{6}",,,,"701234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AF",93,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AG":[,[,,"(?:268|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",,,,"2684601234",,,,[7]],[,,"268(?:464|7(?:1[3-9]|2\\d|3[246]|64|[78][0-689]))\\d{4}",,,,"2684641234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"26848[01]\\d{4}",,,,"2684801234",,,,[7]],"AG",1,"011","1",,,"1",,,,,,[,,"26840[69]\\d{4}",,,,"2684061234",,,,[7]],,"268",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AI":[,[,,"(?:264|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"2644(?:6[12]|9[78])\\d{4}",,,,"2644612345",,,,[7]],[,,"264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",,,,"2642351234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AI",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"264",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AL":[,[,,"(?:(?:[2-58]|6\\d)\\d\\d|700)\\d{5}|(?:8\\d{2,3}|900)\\d{3}",,,,,,,[6,7,8,9],[5]],[,,"(?:[2358](?:[16-9]\\d[2-9]|[2-5][2-9]\\d)|4(?:[2-57-9][2-9]|6\\d)\\d)\\d{4}",,,,"22345678",,,[8],[5,6,7]],[,,"6(?:[689][2-9]|7[2-6])\\d{6}",,,,"662123456",,,[9]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"900[1-9]\\d\\d",,,,"900123",,,[6]],[,,"808[1-9]\\d\\d",,,,"808123",,,[6]],[,,"700[2-9]\\d{4}",,,,"70021234",,,[8]],[,,,,,,,,,[-1]],"AL",355,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AM":[,[,,"(?:[1-489]\\d|55|60|77)\\d{6}",,,,,,,[8],[5,6]],[,,"(?:(?:1[0-2]|47)\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2)\\d{5}",,,,"10123456",,,,[5,6]],[,,"(?:4[1349]|55|77|88|9[13-9])\\d{6}",,,,"77123456"],[,,"800\\d{5}",,,,"80012345"],[,,"90[016]\\d{5}",,,,"90012345"],[,,"80[1-4]\\d{5}",,,,"80112345"],[,,,,,,,,,[-1]],[,,"60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|90)\\d{4}",,,,"60271234"],"AM",374,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["[23]"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[4-7]|88|9[13-9]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]"],"0 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AO":[,[,,"[29]\\d{8}",,,,,,,[9]],[,,"2\\d(?:[0134][25-9]|[25-9]\\d)\\d{5}",,,,"222123456"],[,,"9[1-49]\\d{7}",,,,"923123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AO",244,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AR":[,[,,"(?:11|(?:[2368]|9\\d)\\d)\\d{8}",,,,,,,[10,11],[6,7,8]],[,,"11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:[07]\\d|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|6[013-9])|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[012789]\\d|3[1-6]|4[02-9]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:0[0124-9]|[1-357]\\d|4[24-7]|6[02-9]|8[0-79]|9[1236-8])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[069]\\d|1[1568]|2[013-9]|3[145]|4[0-35-9]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[01578]\\d|2[15-7]|3[0-24-9]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}",,,,"1123456789",,,[10],[6,7,8]],[,,"675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})",,,,"91123456789",,,,[6,7,8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"60[04579]\\d{7}",,,,"6001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AR",54,"00","0",,,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?","9$1",,,[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{2})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{4})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(9)(11)(\\d{4})(\\d{4})","$2 15-$3-$4",["911"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9(?:2[2-4689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578]))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"],"0$1"],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9[23]"],"0$1"],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["11"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d{3})","$1",["1[0-2]|911"],"$1"]],[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(9)(11)(\\d{4})(\\d{4})","$1 $2 $3-$4",["911"]],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3-$4",["9(?:2[2-4689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578]))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3-$4",["9[23]"]],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["11"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"810\\d{7}",,,,,,,[10]],[,,"810\\d{7}",,,,"8101234567",,,[10]],,,[,,,,,,,,,[-1]]],"AS":[,[,,"(?:[58]\\d\\d|684|900)\\d{7}",,,,,,,[10],[7]],[,,"6846(?:22|33|44|55|77|88|9[19])\\d{4}",,,,"6846221234",,,,[7]],[,,"684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}",,,,"6847331234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"684",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AT":[,[,,"[1-35-9]\\d{8,12}|4(?:[0-24-9]\\d{4,11}|3(?:[05]\\d{3,10}|[2-467]\\d{3,4}|8\\d{3,6}|9\\d{3,7}))|[1-35-8]\\d{7}|[1-35-7]\\d{5,6}|[15]\\d{4}|1\\d{3}",,,,,,,[4,5,6,7,8,9,10,11,12,13],[3]],[,,"1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}",,,,"1234567890",,,,[3]],[,,"6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}",,,,"664123456",,,[7,8,9,10,11,12,13]],[,,"800\\d{6,10}",,,,"800123456",,,[9,10,11,12,13]],[,,"9(?:0[01]|3[019])\\d{6,10}",,,,"900123456",,,[9,10,11,12,13]],[,,"8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}",,,,"810123456",,,[8,9,10,11,12,13]],[,,,,,,,,,[-1]],[,,"5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|7[28]0\\d{6,10}",,,,"780123456",,,[5,6,7,8,9,10,11,12,13]],"AT",43,"00","0",,,"0",,,,[[,"(116\\d{3})","$1",["116"],"$1"],[,"(1)(\\d{3,12})","$1 $2",["1"],"0$1"],[,"(5\\d)(\\d{3,5})","$1 $2",["5[079]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["5[079]"],"0$1"],[,"(5\\d)(\\d{4})(\\d{4,7})","$1 $2 $3",["5[079]"],"0$1"],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:[28]0|32)|[89]"],"0$1"],[,"(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:[24][1-8]|35|[5-79])"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AU":[,[,,"1\\d{4,9}|(?:[2-478]\\d\\d|550)\\d{6}",,,,,,,[5,6,7,8,9,10]],[,,"[237]\\d{8}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|[6-8]\\d{4}|9(?:[02-9]\\d{3}|1(?:[0-57-9]\\d{2}|6[0135-9]\\d)))\\d{3}",,,,"212345678",,,[9],[8]],[,,"4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5\\d|71)|550\\d)\\d{5}",,,,"550123456",,,[9]],"AU",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011)|001[14-689]","0",,,"0",,"0011",,[[,"([2378])(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|[45]"],"0$1"],[,"(16)(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(16)(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(1[389]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1[389]0","1(?:[38]0|9)0"]],[,"(180)(2\\d{3})","$1 $2",["180","1802"]],[,"(19\\d)(\\d{3})","$1 $2",["19[13]"]],[,"(19\\d{2})(\\d{4})","$1 $2",["19[679]"]],[,"(13)(\\d{2})(\\d{2})","$1 $2 $3",["13[1-9]"]]],,[,,"16\\d{3,7}",,,,"1612345",,,[5,6,7,8,9]],1,,[,,"1(?:3(?:00\\d{3}|45[0-4]|\\d)\\d{3}|80(?:0\\d{6}|2\\d{3}))",,,,,,,[6,7,8,10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AW":[,[,,"(?:[25-79]\\d\\d|800)\\d{4}",,,,,,,[7]],[,,"5(?:2\\d|8[1-9])\\d{4}",,,,"5212345"],[,,"(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}",,,,"5601234"],[,,"800\\d{4}",,,,"8001234"],[,,"900\\d{4}",,,,"9001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:28\\d|501)\\d{4}",,,,"5011234"],"AW",297,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"AX":[,[,,"(?:(?:[1247]\\d|3[0-46-9]|[56]0)\\d\\d|800)\\d{4,6}|(?:[1-47]\\d|50)\\d{4,5}|2\\d{4}",,,,,,,[5,6,7,8,9,10]],[,,"18[1-8]\\d{3,6}",,,,"181234567",,,[6,7,8,9]],[,,"(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AX",358,"00|99(?:[01469]|5(?:11|3[23]|41|5[59]|77|88|9[09]))","0",,,"0",,"00",,,,[,,,,,,,,,[-1]],,,[,,"[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})"],[,,"10\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|3[09]\\d{4,8}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})",,,,"10112345"],,,[,,,,,,,,,[-1]]],"AZ":[,[,,"(?:(?:(?:[12457]\\d|60|88)\\d|365)\\d{3}|900200)\\d{3}",,,,,,,[9],[7]],[,,"(?:(?:1[28]\\d|2(?:[045]2|1[24]|2[2-4]|33|6[23]))\\d\\d|365(?:[0-46-9]\\d|5[0-35-9]))\\d{4}",,,,"123123456",,,,[7]],[,,"(?:36554|(?:4[04]|5[015]|60|7[07])\\d{3})\\d{4}",,,,"401234567"],[,,"88\\d{7}",,,,"881234567"],[,,"900200\\d{3}",,,,"900200123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AZ",994,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|365","[12]|365","[12]|365(?:[0-46-9]|5[0-35-9])"],"(0$1)"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[3-8]"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|365","[12]|365","[12]|365(?:[0-46-9]|5[0-35-9])"],"(0$1)"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[3-8]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BA":[,[,,"(?:[3589]\\d|49|6\\d\\d?|70)\\d{6}",,,,,,,[8,9],[6]],[,,"(?:3(?:[05-79][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}",,,,"30212345",,,[8],[6]],[,,"6(?:0(?:3\\d|40)|[1-356]\\d|44[0-6]|71[137])\\d{5}",,,,"61123456"],[,,"8[08]\\d{6}",,,,"80123456",,,[8]],[,,"9[0246]\\d{6}",,,,"90123456",,,[8]],[,,"8[12]\\d{6}",,,,"82123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BA",387,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70(?:3[0146]|[56]0)\\d{4}",,,,"70341234",,,[8]],,,[,,,,,,,,,[-1]]],"BB":[,[,,"(?:246|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7[35]7|9(?:1[89]|63))\\d{4}",,,,"2464123456",,,,[7]],[,,"246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|69[5-7]|8(?:[2-5]\\d|83))\\d{4}",,,,"2462501234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"(?:246976|900[2-9]\\d\\d)\\d{4}",,,,"9002123456",,,,[7]],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"24631\\d{5}",,,,"2463101234",,,,[7]],"BB",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"246",[,,,,,,,,,[-1]],[,,"246(?:292|367|4(?:1[7-9]|3[01]|44|67)|736)\\d{4}",,,,"2464301234",,,,[7]],,,[,,,,,,,,,[-1]]],"BD":[,[,,"[13469]\\d{9}|8[0-79]\\d{7,8}|[2-7]\\d{8}|[2-9]\\d{7}|[3-689]\\d{6}|[57-9]\\d{5}",,,,,,,[6,7,8,9,10]],[,,"2(?:[45]\\d{3}|7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|41|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[01367]|7[15]|8[0146-9]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8)|62\\d{2})|71\\d{2}|8(?:[18]|23|54)\\d{2}|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}",,,,"27111234",,,[6,7,8,9]],[,,"(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}",,,,"1812345678",,,[10]],[,,"80[03]\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"96(?:0[469]|1[0-4]|3[389]|6[69]|7[78])\\d{6}",,,,"9604123456",,,[10]],"BD",880,"00","0",,,"0",,,,[[,"(2)(\\d{7,8})","$1-$2",["2"],"0$1"],[,"(\\d{2})(\\d{4,6})","$1-$2",["[3-79]1"],"0$1"],[,"(\\d{4})(\\d{3,6})","$1-$2",["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[01367])"],"0$1"],[,"(\\d{3})(\\d{3,7})","$1-$2",["[3-79][2-9]|8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BE":[,[,,"4\\d{8}|[1-9]\\d{7}",,,,,,,[8,9]],[,,"(?:(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|9[2-4])\\d|8(?:0[2-8]|[1-79]\\d))\\d{5}",,,,"12345678",,,[8]],[,,"4(?:5[56]|6[0135-8]|[79]\\d|8[3-9])\\d{6}",,,,"470123456",,,[9]],[,,"800[1-9]\\d{4}",,,,"80012345",,,[8]],[,,"(?:70(?:2[0-57]|3[0457]|44|69|7[0579])|90(?:0[0-35-8]|1[36]|2[0-3568]|3[0135689]|4[2-68]|5[1-68]|6[0-378]|7[23568]|9[34679]))\\d{4}",,,,"90012345",,,[8]],[,,"7879\\d{4}",,,,"78791234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BE",32,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4[23]|9[2-4]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-7]|8(?:0[2-8]|[1-79])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"78(?:0[57]|1[0458]|2[25]|3[5-8]|48|[56]0|7[078])\\d{4}",,,,"78102345",,,[8]],,,[,,,,,,,,,[-1]]],"BF":[,[,,"[25-7]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:49|5[23]|6[56]|9[016-9])|4(?:4[569]|5[4-6]|6[56]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}",,,,"20491234"],[,,"(?:5[124-8]|[67]\\d)\\d{6}",,,,"70123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BF",226,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[25-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BG":[,[,,"[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",,,,,,,[6,7,8,9],[4,5]],[,,"(?:(?:[236]\\d|5[1-9]|8[1-6]|9[1-7])\\d|4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}|2\\d{5}",,,,"2123456",,,[6,7,8],[4,5]],[,,"(?:4(?:3[07-9]|8\\d)|(?:8[7-9]\\d|9(?:8\\d|9[69]))\\d)\\d{5}",,,,"48123456",,,[8,9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,"700\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"BG",359,"00","0",,,"0",,,,[[,"(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|70[1-9]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["7|80"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BH":[,[,,"[136-9]\\d{7}",,,,,,,[8]],[,,"(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d\\d))\\d{4}",,,,"17001234"],[,,"(?:3(?:[1-4679]\\d|5[013-69]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:3[03-9]|[69]\\d|7[0-6])))\\d{4}",,,,"36001234"],[,,"80\\d{6}",,,,"80123456"],[,,"(?:87|9[014578])\\d{6}",,,,"90123456"],[,,"84\\d{6}",,,,"84123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BH",973,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[1367]|8[047]|9[014578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BI":[,[,,"(?:[267]\\d|31)\\d{6}",,,,,,,[8]],[,,"22\\d{6}",,,,"22201234"],[,,"(?:29|31|6[189]|7[125-9])\\d{6}",,,,"79561234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BI",257,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|6[189]|7[125-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BJ":[,[,,"[2689]\\d{7}",,,,,,,[8]],[,,"2(?:02|1[037]|2[45]|3[68])\\d{5}",,,,"20211234"],[,,"(?:6\\d|9[03-9])\\d{6}",,,,"90011234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"857[58]\\d{4}",,,,"85751234"],"BJ",229,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"81\\d{6}",,,,"81123456"],,,[,,,,,,,,,[-1]]],"BL":[,[,,"(?:590|69\\d)\\d{6}",,,,,,,[9]],[,,"590(?:2[7-9]|5[12]|87)\\d{4}",,,,"590271234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BL",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BM":[,[,,"(?:441|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"441(?:2(?:02|23|[3479]\\d|61)|[46]\\d\\d|5(?:4\\d|60|89)|824)\\d{4}",,,,"4412345678",,,,[7]],[,,"441(?:[37]\\d|5[0-39])\\d{5}",,,,"4413701234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"441",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BN":[,[,,"[2-578]\\d{6}",,,,,,,[7]],[,,"(?:2(?:[013-9]\\d|2[0-7])|[3-5]\\d\\d)\\d{4}",,,,"2345678"],[,,"(?:22[89]|[78]\\d\\d)\\d{4}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BN",673,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BO":[,[,,"(?:[2-467]\\d{3}|80017)\\d{4}",,,,,,,[8,9],[7]],[,,"(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}",,,,"22123456",,,[8],[7]],[,,"[67]\\d{7}",,,,"71234567",,,[8]],[,,"80017\\d{4}",,,,"800171234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BO",591,"00(1\\d)?","0",,,"0(1\\d)?",,,,[[,"([234])(\\d{7})","$1 $2",["[2-4]"],,"0$CC $1"],[,"([67]\\d{7})","$1",["[67]"],,"0$CC $1"],[,"(800)(\\d{2})(\\d{4})","$1 $2 $3",["800"],,"0$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BQ":[,[,,"(?:[34]1|7\\d)\\d{5}",,,,,,,[7]],[,,"(?:318[023]|41(?:6[023]|70)|7(?:1[578]|50)\\d)\\d{3}",,,,"7151234"],[,,"(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}",,,,"3181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BQ",599,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"[347]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BR":[,[,,"(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",,,,,,,[8,9,10,11]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",,,,"1123456789",,,[10],[8]],[,,"(?:[189][1-9]|2[12478])(?:7|9\\d)\\d{7}|(?:3[1-578]|[46][1-9]|5[13-5]|7[13-579])(?:[6-9]|9\\d)\\d{7}",,,,"11961234567",,,[10,11],[8]],[,,"800\\d{6,7}",,,,"800123456",,,[9,10]],[,,"(?:300|[59]00\\d?)\\d{6}",,,,"300123456",,,[9,10]],[,,"(?:300\\d(?:\\d{2})?|4(?:0(?:0\\d|20)|370))\\d{4}",,,,"40041234",,,[8,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",,,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",,,[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","300|4(?:0(?:0|20)|370)"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],[,"(\\d{3,5})","$1",["1[125689]"]],[,"(\\d{4})(\\d{4})","$1-$2",["[2-9](?:0[1-9]|[1-9])"]],[,"(\\d{5})(\\d{4})","$1-$2",["9(?:0[1-9]|[1-9])"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)","0 $CC ($1)"]],[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","300|4(?:0(?:0|20)|370)"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)","0 $CC ($1)"]],[,,,,,,,,,[-1]],,,[,,"(?:300\\d|40(?:0\\d|20))\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BS":[,[,,"(?:242|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-4]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",,,,"2423456789",,,,[7]],[,,"242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}",,,,"2423591234",,,,[7]],[,,"(?:242300|8(?:00|33|44|55|66|77|88)[2-9]\\d\\d)\\d{4}",,,,"8002123456",,,,[7]],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"242",[,,,,,,,,,[-1]],[,,"242225[0-46-9]\\d{3}",,,,"2422250123"],,,[,,,,,,,,,[-1]]],"BT":[,[,,"[17]\\d{7}|[2-8]\\d{6}",,,,,,,[7,8],[6]],[,,"(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}",,,,"2345678",,,[7],[6]],[,,"(?:1[67]|77)\\d{6}",,,,"17123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BT",975,"00",,,,,,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[23568]|4[5-7]|7[246]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BW":[,[,,"(?:(?:[2-6]|7\\d)\\d|90)\\d{5}",,,,,,,[7,8]],[,,"(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[01])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}",,,,"2401234",,,[7]],[,,"7(?:[1-6]\\d|7[014-8])\\d{5}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"79[12][01]\\d{4}",,,,"79101234",,,[8]],"BW",267,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],[,"(\\d{2})(\\d{5})","$1 $2",["90"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BY":[,[,,"(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",,,,,,,[6,7,8,9,10,11],[5]],[,,"(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",,,,"152450911",,,[9],[5,6,7]],[,,"(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}",,,,"294911911",,,[9]],[,,"8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}",,,,"8011234567"],[,,"(?:810|902)\\d{7}",,,,"9021234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"249\\d{6}",,,,"249123456",,,[9]],"BY",375,"810","8",,,"8?0?",,"8~10",,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["17[0-3589]|2[4-9]|[34]","17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"],"8 0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])","1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"],"8 0$1"],[,"(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],[,"([89]\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8[01]|9"],"8 $1"],[,"(82\\d)(\\d{4})(\\d{4})","$1 $2 $3",["82"],"8 $1"],[,"(800)(\\d{3})","$1 $2",["800"],"8 $1"],[,"(800)(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,"8(?:0[13]|10|20\\d)\\d{7}|800\\d{3,7}|902\\d{7}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"BZ":[,[,,"(?:0800\\d|[2-8])\\d{6}",,,,,,,[7,11]],[,,"(?:2(?:[02]\\d|36)|[3-58][02]\\d|7(?:[02]\\d|32))\\d{4}",,,,"2221234",,,[7]],[,,"6[0-35-7]\\d{5}",,,,"6221234",,,[7]],[,,"0800\\d{7}",,,,"08001234123",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BZ",501,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CA":[,[,,"(?:[2-8]\\d|90)\\d{8}",,,,,,,[10],[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",,,,"5062345678",,,,[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",,,,"5062345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}",,,,"5002345678"],[,,"600[2-9]\\d{6}",,,,"6002012345"],"CA",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CC":[,[,,"1\\d{5,9}|(?:[48]\\d\\d|550)\\d{6}",,,,,,,[6,7,8,9,10]],[,,"8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:08|22|68)|4[29]8|62\\d|70[23]|959))\\d{3}",,,,"891621234",,,[9],[8]],[,,"4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2547-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5\\d|71)|550\\d)\\d{5}",,,,"550123456",,,[9]],"CC",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CD":[,[,,"[189]\\d{8}|[1-68]\\d{6}",,,,,,,[7,9]],[,,"12\\d{7}|[1-6]\\d{6}",,,,"1234567"],[,,"(?:8(?:[0-2459]\\d\\d|8)|9[017-9]\\d\\d)\\d{5}",,,,"991234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CD",243,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CF":[,[,,"(?:[27]\\d{3}|8776)\\d{4}",,,,,,,[8]],[,,"2[12]\\d{6}",,,,"21612345"],[,,"7[0257]\\d{6}",,,,"70012345"],[,,,,,,,,,[-1]],[,,"8776\\d{4}",,,,"87761234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CF",236,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CG":[,[,,"(?:(?:0\\d|80)\\d|222)\\d{6}",,,,,,,[9]],[,,"222[1-589]\\d{5}",,,,"222123456"],[,,"0[14-6]\\d{7}",,,,"061234567"],[,,,,,,,,,[-1]],[,,"80(?:0\\d\\d|11[0-4])\\d{4}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CG",242,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CH":[,[,,"8\\d{11}|[2-9]\\d{8}",,,,,,,[9,12]],[,,"(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}",,,,"212345678",,,[9]],[,,"7[35-9]\\d{7}",,,,"781234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[016]\\d{6}",,,,"900123456",,,[9]],[,,"84[0248]\\d{6}",,,,"840123456",,,[9]],[,,"878\\d{6}",,,,"878123456",,,[9]],[,,,,,,,,,[-1]],"CH",41,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]|[89]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],,[,,"74[0248]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"5[18]\\d{7}",,,,"581234567",,,[9]],,,[,,"860\\d{9}",,,,"860123456789",,,[12]]],"CI":[,[,,"[02-8]\\d{7}",,,,,,,[8]],[,,"(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}",,,,"21234567"],[,,"(?:[07][1-9]|[45]\\d|6[014-9]|8[4-9])\\d{6}",,,,"01234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CI",225,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[02-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CK":[,[,,"[2-8]\\d{4}",,,,,,,[5]],[,,"(?:2\\d|3[13-7]|4[1-5])\\d{3}",,,,"21234"],[,,"[5-8]\\d{4}",,,,"71234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CK",682,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CL":[,[,,"(?:1230|[2-57-9]\\d|6\\d{1,3})\\d{7}",,,,,,,[9,10,11]],[,,"2(?:1962\\d{4}|2\\d{7}|32[0-46-8]\\d{5})|(?:3[2-5]\\d|[47][1-35]\\d|5[1-3578]\\d|6[13-57]\\d|8(?:0[1-9]|[1-9]\\d)|9[2-9]\\d)\\d{6}",,,,"221234567",,,[9]],[,,"2(?:1962\\d{4}|2\\d{7}|32[0-46-8]\\d{5})|(?:3[2-5]\\d|[47][1-35]\\d|5[1-3578]\\d|6[13-57]\\d|8(?:0[1-9]|[1-9]\\d)|9[2-9]\\d)\\d{6}",,,,"961234567",,,[9]],[,,"800\\d{6}|1230\\d{7}",,,,"800123456",,,[9,11]],[,,,,,,,,,[-1]],[,,"600\\d{7,8}",,,,"6001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,"44\\d{7}",,,,"441234567",,,[9]],"CL",56,"(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0",,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"]],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["[68]00"]],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["600"]],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["123","1230"]],[,"(\\d{5})(\\d{4})","$1 $2",["219"],"($1)"],[,"(\\d{4,5})","$1",["[1-9]"],"$1"]],[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"]],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["[68]00"]],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["600"]],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["123","1230"]],[,"(\\d{5})(\\d{4})","$1 $2",["219"],"($1)"]],[,,,,,,,,,[-1]],,,[,,"600\\d{7,8}",,,,,,,[10,11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CM":[,[,,"(?:[26]\\d\\d|88)\\d{6}",,,,,,,[8,9]],[,,"2(?:22|33|4[23])\\d{6}",,,,"222123456",,,[9]],[,,"6[5-9]\\d{7}",,,,"671234567",,,[9]],[,,"88\\d{6}",,,,"88012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CM",237,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CN":[,[,,"(?:(?:(?:1[03-68]|2\\d)\\d\\d|[3-79])\\d|8[0-57-9])\\d{7}|[1-579]\\d{10}|8[0-57-9]\\d{8,9}|[1-79]\\d{9}|[1-9]\\d{7}|[12]\\d{6}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-4689]|6[2368]|9[02-9])|8(?:078|1[236-8]|2[5-7]|3\\d|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})",,,,"1012345678",,,,[5,6]],[,,"1(?:[38]\\d{3}|4[57]\\d{2}|5[0-35-9]\\d{2}|66\\d{2}|7(?:[0-35-8]\\d{2}|40[0-5])|9[89]\\d{2})\\d{6}",,,,"13123456789",,,[11]],[,,"(?:10)?800\\d{7}",,,,"8001234567",,,[10,12]],[,,"16[08]\\d{5}",,,,"16812345",,,[8]],[,,"400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",,,,"4001234567",,,[7,8,9,10,11],[5,6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CN",86,"(?:1(?:[12]\\d{3}|79\\d{2}|9[0-7]\\d{2}))?00","0",,,"0|(1(?:[12]\\d{3}|79\\d{2}|9[0-7]\\d{2}))",,"00",,[[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{5,6})","$1",["100|95"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d\\d[19]","[3-9]\\d\\d(?:10|9[56])"],"0$1","$CC $1"],[,"(\\d{3,4})(\\d{4})","$1 $2",["[2-9]"]],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:0[1-9]|[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[47-9]|7|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[457]|6[09])|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1(?:[3-57-9]|66)"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d\\d[19]","[3-9]\\d\\d(?:10|9[56])"],"0$1","$CC $1"],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:0[1-9]|[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[47-9]|7|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[457]|6[09])|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1(?:[3-57-9]|66)"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[,,,,,,,,,[-1]],,,[,,"(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}",,,,,,,[10,11,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CO":[,[,,"(?:1\\d|3)\\d{9}|[124-8]\\d{7}",,,,,,,[8,10,11],[7]],[,,"[124-8][2-9]\\d{6}",,,,"12345678",,,[8],[7]],[,,"3(?:0[0-5]|1\\d|2[0-3]|5[01])\\d{7}",,,,"3211234567",,,[10]],[,,"1800\\d{7}",,,,"18001234567",,,[11]],[,,"19(?:0[01]|4[78])\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CO",57,"00(?:4(?:[14]4|56)|[579])","0",,,"0([3579]|4(?:44|56))?",,,,[[,"(\\d)(\\d{7})","$1 $2",["1(?:[2-7]|8[2-9]|9[0-3])|[24-8]","1(?:[2-7]|8[2-9]|9(?:09|[1-3]))|[24-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1-$2-$3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"],"0$1"]],[[,"(\\d)(\\d{7})","$1 $2",["1(?:[2-7]|8[2-9]|9[0-3])|[24-8]","1(?:[2-7]|8[2-9]|9(?:09|[1-3]))|[24-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1 $2 $3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CR":[,[,,"(?:8\\d|90)\\d{8}|[24-8]\\d{7}",,,,,,,[8,10]],[,,"2(?:[024-7]\\d{2}|1(?:0[7-9]|[1-9]\\d))\\d{4}",,,,"22123456",,,[8]],[,,"5(?:0[01]|7[0-3])\\d{5}|6(?:[0-4]\\d{3}|500[01])\\d{3}|(?:7[0-3]|8[3-9])\\d{6}",,,,"83123456",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"90[059]\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"210[0-6]\\d{4}|4\\d{7}|5100\\d{4}",,,,"40001234",,,[8]],"CR",506,"00",,,,"(19(?:0[012468]|1[09]|20|66|77|99))",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[24-7]|8[3-9]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]0"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CU":[,[,,"[2-57]\\d{7}|[2-47]\\d{6}|[34]\\d{5}",,,,,,,[6,7,8],[4,5]],[,,"2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}",,,,"71234567",,,,[4,5]],[,,"5\\d{7}",,,,"51234567",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CU",53,"119","0",,,"0",,,,[[,"(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],[,"(\\d{2})(\\d{4,6})","$1 $2",["[2-4]"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CV":[,[,,"[2-59]\\d{6}",,,,,,,[7]],[,,"2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}",,,,"2211234"],[,,"(?:[34][36]|5[1-389]|9\\d)\\d{5}",,,,"9911234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CV",238,"0",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-59]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CW":[,[,,"(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",,,,,,,[7,8]],[,,"9(?:(?:[48]\\d|50)\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}",,,,"94151234"],[,,"9(?:5(?:[12467]\\d|3[01])|6(?:[15-9]\\d|3[01]))\\d{4}",,,,"95181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"60[0-2]\\d{4}",,,,"6001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CW",599,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[3467]"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],,[,,"955\\d{5}",,,,"95581234",,,[8]],1,"[69]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CX":[,[,,"1\\d{5,9}|(?:[48]\\d\\d|550)\\d{6}",,,,,,,[6,7,8,9,10]],[,,"8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:21|49|78|81)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",,,,"891641234",,,[9],[8]],[,,"4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2547-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5\\d|71)|550\\d)\\d{5}",,,,"550123456",,,[9]],"CX",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"CY":[,[,,"(?:[279]\\d|[58]0)\\d{6}",,,,,,,[8]],[,,"2[2-6]\\d{6}",,,,"22345678"],[,,"9[4-79]\\d{6}",,,,"96123456"],[,,"800\\d{5}",,,,"80001234"],[,,"90[09]\\d{5}",,,,"90012345"],[,,"80[1-9]\\d{5}",,,,"80112345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"CY",357,"00",,,,,,,,[[,"(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:50|77)\\d{6}",,,,"77123456"],,,[,,,,,,,,,[-1]]],"CZ":[,[,,"(?:[2-578]\\d|60|9\\d{1,4})\\d{7}",,,,,,,[9,10,11,12]],[,,"(?:2\\d|3[1257-9]|4[16-9]|5[13-9])\\d{7}",,,,"212345678",,,[9]],[,,"(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}",,,,"601123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:0[05689]|76)\\d{6}",,,,"900123456",,,[9]],[,,"8[134]\\d{7}",,,,"811234567",,,[9]],[,,"70[01]\\d{6}",,,,"700123456",,,[9]],[,,"9[17]0\\d{6}",,,,"910123456",,,[9]],"CZ",420,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9[36]"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["96"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"9(?:5\\d|7[2-4])\\d{6}",,,,"972123456",,,[9]],,,[,,"9(?:3\\d{9}|6\\d{7,10})",,,,"93123456789"]],"DE":[,[,,"(?:1|[358]\\d{11})\\d{3}|[1-35689]\\d{13}|4(?:[0-8]\\d{5,12}|9(?:[05]\\d|44|6[1-8])\\d{9})|[1-35-9]\\d{6,12}|49(?:[0-357]\\d|[46][1-8])\\d{4,8}|49(?:[0-3579]\\d|4[1-9]|6[0-8])\\d{3}|[1-9]\\d{5}|[13-68]\\d{4}",,,,,,,[4,5,6,7,8,9,10,11,12,13,14,15],[3]],[,,"2\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|4(?:0\\d{3,12}|[1-8]\\d{4,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|6(?:\\d{5,13}|9\\d{3,12})|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-8]\\d|9\\d?)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})",,,,"30123456",,,[5,6,7,8,9,10,11,12,13,14,15],[3,4]],[,,"1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7\\d{8,9})",,,,"15123456789",,,[10,11]],[,,"800\\d{7,12}",,,,"8001234567890",,,[10,11,12,13,14,15]],[,,"137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})",,,,"9001234567",,,[10,11]],[,,"1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})",,,,"18012345",,,[7,8,9,10,11,12,13,14]],[,,"700\\d{8}",,,,"70012345678",,,[11]],[,,,,,,,,,[-1]],"DE",49,"00","0",,,"0",,,,[[,"(1\\d{2})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(15\\d{3})(\\d{6})","$1 $2",["15[0568]"],"0$1"],[,"(1\\d{3})(\\d{7})","$1 $2",["15"],"0$1"],[,"(\\d{2})(\\d{3,11})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{3})(\\d{3,11})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14]|[4-9]1)|3(?:[35-9][15]|4[015])|[4-8][1-9]1|9(?:06|[1-9]1)","2(?:0[1-389]|1(?:[14]|2[0-8])|2[18]|3[14]|[4-9]1)|3(?:[35-9][15]|4[015])|[4-8][1-9]1|9(?:06|[1-9]1)"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|[7-9](?:0[1-9]|[1-9])","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|[49][1246]|6[1-4]|7[13468]|8[13568])|6(?:0[1356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|[7-9](?:0[1-9]|[1-9])"],"0$1"],[,"(3\\d{4})(\\d{1,10})","$1 $2",["3"],"0$1"],[,"(800)(\\d{7,12})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:37|80)|900","1(?:37|80)|900[1359]"],"0$1"],[,"(1\\d{2})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(18\\d{3})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(18\\d{2})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(18\\d)(\\d{8})","$1 $2",["18[2-579]"],"0$1"],[,"(700)(\\d{4})(\\d{4})","$1 $2 $3",["700"],"0$1"],[,"(138)(\\d{4})","$1 $2",["138"],"0$1"],[,"(15[013-68])(\\d{2})(\\d{8})","$1 $2 $3",["15[013-68]"],"0$1"],[,"(15[279]\\d)(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],[,"(1[67]\\d)(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"]],,[,,"16(?:4\\d{1,10}|[89]\\d{1,11})",,,,"16412345",,,[4,5,6,7,8,9,10,11,12,13,14]],,,[,,,,,,,,,[-1]],[,,"18(?:1\\d{5,11}|[2-9]\\d{8})",,,,"18500123456",,,[8,9,10,11,12,13,14]],,,[,,"1(?:5(?:(?:2\\d55|7\\d99|9\\d33)\\d{7}|(?:[034568]00|113)\\d{8})|6(?:013|255|399)\\d{7,8}|7(?:[015]13|[234]55|[69]33|[78]99)\\d{7,8})",,,,"177991234567",,,[12,13]]],"DJ":[,[,,"(?:2\\d|77)\\d{6}",,,,,,,[8]],[,,"2(?:1[2-5]|7[45])\\d{5}",,,,"21360003"],[,,"77\\d{6}",,,,"77831001"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DJ",253,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"DK":[,[,,"[2-9]\\d{7}",,,,,,,[8]],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}",,,,"32123456"],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}",,,,"32123456"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DK",45,"00",,,,,,,1,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"DM":[,[,,"(?:[58]\\d\\d|767|900)\\d{7}",,,,,,,[10],[7]],[,,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}",,,,"7674201234",,,,[7]],[,,"767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-7])\\d{4}",,,,"7672251234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"767",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"DO":[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"8(?:[04]9[2-9]\\d\\d|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d\\d|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9])))\\d{4}",,,,"8092345678",,,,[7]],[,,"8[024]9[2-9]\\d{6}",,,,"8092345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DO",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"8[024]9",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"DZ":[,[,,"(?:[1-4]|[5-79]\\d|80)\\d{7}",,,,,,,[8,9]],[,,"(?:(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d|9619)\\d{5}",,,,"12345678"],[,,"(?:(?:5[4-6]|7[7-9])\\d|6(?:[569]\\d|7[0-6]))\\d{6}",,,,"551234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"80[3-689]1\\d{5}",,,,"808123456",,,[9]],[,,"80[12]1\\d{5}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,"98[23]\\d{6}",,,,"983123456",,,[9]],"DZ",213,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"EC":[,[,,"1800\\d{6,7}|(?:[2-7]|9\\d)\\d{7}",,,,,,,[8,9,10,11],[7]],[,,"[2-7][2-7]\\d{6}",,,,"22123456",,,[8],[7]],[,,"9(?:(?:39|[57][89]|[89]\\d)\\d|6(?:[0-27-9]\\d|30))\\d{5}",,,,"991234567",,,[9]],[,,"1800\\d{6,7}",,,,"18001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[2-7]890\\d{4}",,,,"28901234",,,[8]],"EC",593,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[247]|[356][2-8]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["180","1800"],"$1"]],[[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[247]|[356][2-8]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["180","1800"],"$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"EE":[,[,,"8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d\\d|900)\\d{4}",,,,,,,[7,8,10]],[,,"(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}",,,,"3212345",,,[7]],[,,"(?:5\\d|8[1-4])\\d{6}|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}",,,,"51234567",,,[7,8]],[,,"800(?:(?:0\\d\\d|1)\\d|[2-9])\\d{3}",,,,"80012345"],[,,"(?:40\\d\\d|900)\\d{4}",,,,"9001234",,,[7,8]],[,,,,,,,,,[-1]],[,,"70[0-2]\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"EE",372,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],[,"(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-4])","[45]|8(?:00[1-9]|[1-4])"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["80"]]],,[,,,,,,,,,[-1]],,,[,,"800[2-9]\\d{3}",,,,,,,[7]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"EG":[,[,,"(?:[189]\\d?|[24-6])\\d{8}|[13]\\d{7}",,,,,,,[8,9,10],[7]],[,,"(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|5\\d|7[23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}",,,,"234567890",,,[8,9],[7]],[,,"1[0125]\\d{8}",,,,"1001234567",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"EG",20,"00","0",,,"0",,,,[[,"(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],[,"(\\d{2})(\\d{6,7})","$1 $2",["1(?:3|5[239])|[4-6]|[89][2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1[0-25]|[89]00"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"EH":[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"528[89]\\d{5}",,,,"528812345"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5924[01]\\d{4}",,,,"592401234"],"EH",212,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"528[89]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ER":[,[,,"[178]\\d{6}",,,,,,,[7],[6]],[,,"1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}",,,,"8370362",,,,[6]],[,,"17[1-3]\\d{4}|7\\d{6}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ER",291,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ES":[,[,,"(?:51|[6-9]\\d)\\d{7}",,,,,,,[9]],[,,"(?:8(?:[1356]\\d|[28][0-8]|[47][1-9])\\d{4}|9(?:(?:(?:[135]\\d|[28][0-8]|4[1-9])\\d\\d|7(?:[124-9]\\d\\d|3(?:[0-8]\\d|9[1-9])))\\d\\d|6(?:[0-8]\\d{4}|9(?:0(?:[0-57-9]\\d\\d|6(?:0[0-8]|1[1-9]|[2-9]\\d))|[1-9]\\d{3}))))\\d\\d",,,,"810123456"],[,,"(?:(?:6\\d|7[1-48])\\d{5}|9(?:6906(?:09|10)|7390\\d\\d))\\d\\d",,,,"612345678"],[,,"[89]00\\d{6}",,,,"800123456"],[,,"80[367]\\d{6}",,,,"803123456"],[,,"90[12]\\d{6}",,,,"901123456"],[,,"70\\d{7}",,,,"701234567"],[,,,,,,,,,[-1]],"ES",34,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[568]|7[0-48]|9(?:0[12]|[1-8])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"51\\d{7}",,,,"511234567"],,,[,,,,,,,,,[-1]]],"ET":[,[,,"(?:11|[2-59]\\d)\\d{7}",,,,,,,[9],[7]],[,,"(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:18|2[69]|39|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",,,,"111112345",,,,[7]],[,,"9\\d{8}",,,,"911234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ET",251,"00","0",,,"0",,,,[[,"([1-59]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[1-59]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FI":[,[,,"(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}|[1-35689]\\d{4}",,,,,,,[5,6,7,8,9,10]],[,,"(?:1[3-79][1-8]|[235689][1-8]\\d)\\d{2,6}",,,,"131234567",,,[5,6,7,8,9]],[,,"(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FI",358,"00|99(?:[01469]|5(?:11|3[23]|41|5[59]|77|88|9[09]))","0",,,"0",,"00",,[[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]0|[6-8])0"],"0$1"],[,"(75\\d{3})","$1",["75[12]"],"0$1"],[,"(116\\d{3})","$1",["116"],"$1"],[,"(\\d{2})(\\d{4,10})","$1 $2",["[14]|2[09]|50|7[135]"],"0$1"],[,"(\\d)(\\d{4,11})","$1 $2",["[25689][1-8]|3"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,"[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})"],[,,"10\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|3[09]\\d{4,8}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})",,,,"10112345"],,,[,,,,,,,,,[-1]]],"FJ":[,[,,"(?:(?:0800\\d|[235-9])\\d|45)\\d{5}",,,,,,,[7,11]],[,,"(?:(?:3[0-5]|8[58])\\d|6(?:03|[25-7]\\d))\\d{4}",,,,"3212345",,,[7]],[,,"(?:[279]\\d|45|5[01568]|8[034679])\\d{5}",,,,"7012345",,,[7]],[,,"0800\\d{7}",,,,"08001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FJ",679,"0(?:0|52)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FK":[,[,,"[2-7]\\d{4}",,,,,,,[5]],[,,"[2-47]\\d{4}",,,,"31234"],[,,"[56]\\d{4}",,,,"51234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FK",500,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FM":[,[,,"[39]\\d{6}",,,,,,,[7]],[,,"(?:3[2357]0[1-9]|9[2-6]\\d\\d)\\d{3}",,,,"3201234"],[,,"(?:3[2357]0[1-9]|9[2-7]\\d\\d)\\d{3}",,,,"3501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FM",691,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["3(?:20|[357])|9","3(?:20[1-9]|[357])|9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FO":[,[,,"(?:[2-8]\\d|90)\\d{4}",,,,,,,[6]],[,,"(?:20|[3-4]\\d|8[19])\\d{4}",,,,"201234"],[,,"(?:[27][1-9]|5\\d)\\d{4}",,,,"211234"],[,,"80[257-9]\\d{3}",,,,"802123"],[,,"90(?:[1345][15-7]|2[125-7]|99)\\d{2}",,,,"901123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6[0-36]|88)\\d{4}",,,,"601234"],"FO",298,"00",,,,"(10(?:01|[12]0|88))",,,,[[,"(\\d{6})","$1",,,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"FR":[,[,,"[1-9]\\d{8}",,,,,,,[9]],[,,"[1-5]\\d{8}",,,,"123456789"],[,,"(?:6\\d{2}|7(?:00|[3-9]\\d))\\d{6}",,,,"612345678"],[,,"80[0-5]\\d{6}",,,,"801234567"],[,,"8[129]\\d{7}",,,,"891123456"],[,,"884\\d{6}",,,,"884012345"],[,,,,,,,,,[-1]],[,,"9\\d{8}",,,,"912345678"],"FR",33,"00","0",,,"0",,,,[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(1\\d{2})(\\d{3})","$1 $2",["11"],"$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"80[6-9]\\d{6}",,,,"806123456"],,,[,,,,,,,,,[-1]]],"GA":[,[,,"(?:0\\d|[2-7])\\d{6}",,,,,,,[7,8]],[,,"01\\d{6}",,,,"01441234",,,[8]],[,,"(?:0[2-7]|[2-7])\\d{6}",,,,"06031234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GA",241,"00",,,,,,,,[[,"(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GB":[,[,,"[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",,,,,,,[7,9,10],[4,5,6,8]],[,,"2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{7}|1(?:1(?:3[0-58]|4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])|21[0-7]|31[0-8]|[4-69]1\\d)\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[28][02-57-9]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[2-46-8]\\d{2}|16977[23]\\d{3}",,,,"1212345678",,,[9,10],[4,5,6,7,8]],[,,"7(?:[1-3]\\d{3}|4(?:[0-46-9]\\d{2}|5(?:[0-689]\\d|7[0-57-9]))|5(?:0[0-8]|[13-9]\\d|2[0-35-9])\\d|7(?:0(?:0[01]|[1-9]\\d)|[1-7]\\d{2}|8[02-9]\\d|9[0-689]\\d)|8(?:[014-9]\\d|[23][0-8])\\d|9(?:[024-9]\\d{2}|1(?:[02-9]\\d|1[028])|3[0-689]\\d))\\d{5}",,,,"7400123456",,,[10]],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})",,,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}",,,,"9012345678",,,[10]],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})",,,,"8431234567",,,[7,10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GB",44,"00","0"," x",,"0",,,,[[,"(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-57-9]|62)","7(?:[1-57-9]|624)"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7[06]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:[02-9]1|1)|3|9[018]"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],[,"(1\\d{3})(\\d{5,6})","$1 $2",["1"],"0$1"],[,"(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],[,"(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"],"0$1"],[,"(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"],"0$1"],[,"(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1"],[,"(800)(\\d{6})","$1 $2",["800"],"0$1"]],,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],1,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],"GD":[,[,,"(?:473|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",,,,"4732691234",,,,[7]],[,,"473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}",,,,"4734031234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GD",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"473",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GE":[,[,,"(?:[3-57]\\d\\d|800)\\d{6}",,,,,,,[9],[6]],[,,"(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}",,,,"322123456",,,,[6]],[,,"(?:5(?:[14]4|5[0157-9]|68|7[0147-9]|9[1-35-9])|790)\\d{6}",,,,"555123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"706\\d{6}",,,,"706123456"],"GE",995,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5|790"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"706\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GF":[,[,,"[56]94\\d{6}",,,,,,,[9]],[,,"594(?:[023]\\d|1[01]|4[03-9]|5[6-9]|6[0-3]|80|9[014])\\d{4}",,,,"594101234"],[,,"694(?:[0-249]\\d|3[0-48])\\d{4}",,,,"694201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GF",594,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GG":[,[,,"(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",,,,,,,[7,9,10],[6]],[,,"1481[25-9]\\d{5}",,,,"1481256789",,,[10],[6]],[,,"7(?:781\\d|839\\d|911[17])\\d{5}",,,,"7781123456",,,[10]],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})",,,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}",,,,"9012345678",,,[10]],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})",,,,"8431234567",,,[7,10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GG",44,"00","0",,,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],"GH":[,[,,"(?:[235]\\d{3}|800)\\d{5}",,,,,,,[8,9],[7]],[,,"3(?:0(?:[237]\\d|80)|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}",,,,"302345678",,,[9],[7]],[,,"(?:2[034678]\\d|5(?:[0457]\\d|6[01]))\\d{6}",,,,"231234567",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GH",233,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"800\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GI":[,[,,"(?:[25]\\d\\d|629)\\d{5}",,,,,,,[8]],[,,"2(?:(?:00\\d|2(?:2[2457]|50))\\d|1(?:6[24-7]\\d|90[0-2]))\\d{3}",,,,"20012345"],[,,"(?:5[46-8]\\d|629)\\d{5}",,,,"57123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GI",350,"00",,,,,,,,[[,"(\\d{3})(\\d{5})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GL":[,[,,"(?:19|[2-689]\\d)\\d{4}",,,,,,,[6]],[,,"(?:19|3[1-7]|6[14689]|8[14-79]|9\\d)\\d{4}",,,,"321000"],[,,"(?:[25][1-9]|4[2-9])\\d{4}",,,,"221234"],[,,"80\\d{4}",,,,"801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[89]\\d{4}",,,,"381234"],"GL",299,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GM":[,[,,"[2-9]\\d{6}",,,,,,,[7]],[,,"(?:4(?:[23]\\d\\d|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6[67]\\d|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}",,,,"5661234"],[,,"[23679]\\d{6}",,,,"3012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GM",220,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GN":[,[,,"(?:30|6\\d\\d|722)\\d{6}",,,,,,,[8,9]],[,,"30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}",,,,"30241234",,,[8]],[,,"6[02356]\\d{7}",,,,"601123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"722\\d{6}",,,,"722123456",,,[9]],"GN",224,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GP":[,[,,"(?:590|69\\d)\\d{6}",,,,,,,[9]],[,,"590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}",,,,"590201234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GP",590,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GQ":[,[,,"(?:222|(?:3\\d|55|[89]0)\\d)\\d{6}",,,,,,,[9]],[,,"3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}",,,,"333091234"],[,,"(?:222|55[015])\\d{6}",,,,"222123456"],[,,"80\\d[1-9]\\d{5}",,,,"800123456"],[,,"90\\d[1-9]\\d{5}",,,,"900123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GQ",240,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],[,"(\\d{3})(\\d{6})","$1 $2",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GR":[,[,,"(?:[268]\\d|[79]0)\\d{8}",,,,,,,[10]],[,,"2(?:1\\d\\d|2(?:2[1-46-9]|[36][1-8]|4[1-7]|5[1-4]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|[269][1-6]|3[1245]|4[1-7]|5[13-9]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",,,,"2123456789"],[,,"6(?:8[57-9]|9\\d)\\d{7}",,,,"6912345678"],[,,"800\\d{7}",,,,"8001234567"],[,,"90[19]\\d{7}",,,,"9091234567"],[,,"8(?:0[16]|12|25)\\d{7}",,,,"8011234567"],[,,"70\\d{8}",,,,"7012345678"],[,,,,,,,,,[-1]],"GR",30,"00",,,,,,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["2[3-8]1|[689]"]],[,"(\\d{4})(\\d{6})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GT":[,[,,"(?:1\\d{3}|[2-7])\\d{7}",,,,,,,[8,11]],[,,"[267][2-9]\\d{6}",,,,"22456789",,,[8]],[,,"[3-5]\\d{7}",,,,"51234567",,,[8]],[,,"18[01]\\d{8}",,,,"18001112222",,,[11]],[,,"19\\d{9}",,,,"19001112222",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GT",502,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GU":[,[,,"(?:[58]\\d\\d|671|900)\\d{7}",,,,,,,[10],[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GU",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"671",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GW":[,[,,"[49]\\d{8}|4\\d{6}",,,,,,,[7,9]],[,,"443\\d{6}",,,,"443201234",,,[9]],[,,"9(?:5\\d|6[569]|77)\\d{6}",,,,"955012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"40\\d{5}",,,,"4012345",,,[7]],"GW",245,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["40"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"GY":[,[,,"(?:(?:(?:[2-46]\\d|77)\\d|862)\\d|9008)\\d{3}",,,,,,,[7]],[,,"(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}",,,,"2201234"],[,,"6\\d{6}",,,,"6091234"],[,,"(?:289|862)\\d{4}",,,,"2891234"],[,,"9008\\d{3}",,,,"9008123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GY",592,"001",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-46-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"HK":[,[,,"8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",,,,,,,[5,6,7,8,9,11]],[,,"(?:2(?:[13-8]\\d|2[013-9]|9[0-24-9])\\d|3(?:(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69])\\d|8(?:4[04]|9\\d))|58(?:0[1-8]|1[2-9]))\\d{4}",,,,"21234567",,,[8]],[,,"(?:46(?:0[0-6]|10|4[0-57-9])|5(?:(?:[1-59][0-46-9]|6[0-4689])\\d|7(?:[0-2469]\\d|30))|6(?:(?:0[1-9]|[13-59]\\d|[68][0-57-9]|7[0-79])\\d|2(?:[0-57-9]\\d|6[01]))|707[1-5]|8480|9(?:(?:0[1-9]|1[02-9]|[358][0-8]|[467]\\d)\\d|2(?:[0-8]\\d|9[03-9])))\\d{4}",,,,"51234567",,,[8]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900(?:[0-24-9]\\d{7}|3\\d{1,4})",,,,"90012345678",,,[5,6,7,8,11]],[,,,,,,,,,[-1]],[,,"8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}",,,,"81123456",,,[8]],[,,,,,,,,,[-1]],"HK",852,"00(?:30|5[09]|[126-9]?)",,,,,,"00",,[[,"(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],,[,,"7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}",,,,"71123456",,,[8]],,,[,,,,,,,,,[-1]],[,,"30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}",,,,"30161234",,,[8]],,,[,,,,,,,,,[-1]]],"HN":[,[,,"[237-9]\\d{7}",,,,,,,[8]],[,,"2(?:2(?:0[019]|1[1-36]|[23]\\d|4[04-6]|5[57]|64|7[013689]|8[0146-9]|9[0-2])|4(?:07|2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:08|16|4[03-5]|5\\d|6[4-6]|74|80)|6(?:[056]\\d|17|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[034])|8(?:79|8[0-357-9]|9[1-57-9]))\\d{4}",,,,"22123456"],[,,"[37-9]\\d{7}",,,,"91234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"HN",504,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"HR":[,[,,"(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",,,,,,,[6,7,8,9]],[,,"1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"9(?:01\\d|[1259]\\d{2}|7(?:[0679]\\d|51)|8\\d{1,2})\\d{5}",,,,"921234567",,,[8,9]],[,,"80[01]\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"6(?:[01]\\d{0,2}|[459]\\d{2})\\d{4}",,,,"611234",,,[6,7,8]],[,,,,,,,,,[-1]],[,,"7[45]\\d{6}",,,,"74123456",,,[8]],[,,,,,,,,,[-1]],"HR",385,"00","0",,,"0",,,,[[,"(1)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"([2-5]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],[,"(9\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(6[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],[,"([67]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"],"0$1"],[,"(80[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["80[01]"],"0$1"],[,"(80[01])(\\d{3})(\\d{3})","$1 $2 $3",["80[01]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:62\\d?|72)\\d{6}",,,,"62123456",,,[8,9]],,,[,,,,,,,,,[-1]]],"HT":[,[,,"[2-489]\\d{7}",,,,,,,[8]],[,,"2(?:2\\d|5[1-5]|81|9[149])\\d{5}",,,,"22453300"],[,,"[34]\\d{7}",,,,"34101234"],[,,"8\\d{7}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:[67][0-4]|8[0-3589]|9\\d)\\d{5}",,,,"98901234"],"HT",509,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-489]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"HU":[,[,,"[2357]\\d{8}|[1-9]\\d{7}",,,,,,,[8,9],[6]],[,,"(?:1\\d|2[2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|7[2-9]|8[2-57-9]|9[2-69])\\d{6}",,,,"12345678",,,[8],[6]],[,,"(?:[257]0|3[01])\\d{7}",,,,"201234567",,,[9]],[,,"[48]0\\d{6}",,,,"80123456",,,[8]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"21\\d{7}",,,,"211234567",,,[9]],"HU",36,"00","06",,,"06",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"($1)"]],,[,,,,,,,,,[-1]],,,[,,"[48]0\\d{6}",,,,,,,[8]],[,,"38\\d{7}",,,,"381234567",,,[9]],,,[,,,,,,,,,[-1]]],"ID":[,[,,"(?:[1-36]|8\\d{5})\\d{6}|[1-9]\\d{8,10}|[2-9]\\d{7}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"2(?:[124]\\d{7,8}|(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])\\d{5,8})|(?:3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}|6(?:1(?:[0-8]\\d{4,7}|9\\d{4,8})|(?:[25]\\d|3[1-69]|4[1-6])\\d{5,8})|2(?:1(?:14|500)|2\\d{3})\\d{3}",,,,"218350123",,,[7,8,9,10,11],[5,6]],[,,"8[1-35-9]\\d{7,10}",,,,"812345678",,,[9,10,11,12]],[,,"(?:177\\d|800)\\d{5,7}",,,,"8001234567",,,[8,9,10,11]],[,,"809\\d{7}",,,,"8091234567",,,[10]],[,,"804\\d{7}",,,,"8041234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ID",62,"0(?:0[17-9]|10(?:00|1[67]))","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],[,"(\\d{2})(\\d{5,8})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[2-579]|6[2-5]"],"(0$1)"],[,"(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"8071\\d{6}",,,,,,,[10]],[,,"(?:1500|8071\\d{3})\\d{3}",,,,"8071123456",,,[7,10]],,,[,,,,,,,,,[-1]]],"IE":[,[,,"[148]\\d{9}|[124-9]\\d{8}|[124-69]\\d{7}|[24-69]\\d{6}",,,,,,,[7,8,9,10],[5,6]],[,,"1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})",,,,"2212345",,,,[5,6]],[,,"8(?:22\\d{6}|[35-9]\\d{7})",,,,"850123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"15(?:1[2-8]|[2-8]0|9[089])\\d{6}",,,,"1520123456",,,[10]],[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,,"700\\d{6}",,,,"700123456",,,[9]],[,,"76\\d{7}",,,,"761234567",,,[9]],"IE",353,"00","0",,,"0",,,,[[,"(1)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],[,"(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["40[24]|50[45]"],"(0$1)"],[,"(48)(\\d{4})(\\d{4})","$1 $2 $3",["48"],"(0$1)"],[,"(818)(\\d{3})(\\d{3})","$1 $2 $3",["818"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[24-69]|7[14]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["76|8[35-9]"],"0$1"],[,"(8\\d)(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8[35-9]5"],"0$1"],[,"(700)(\\d{3})(\\d{3})","$1 $2 $3",["700"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:5|8[059])","1(?:5|8[059]0)"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"18[59]0\\d{6}",,,,,,,[10]],[,,"818\\d{6}",,,,"818123456",,,[9]],,,[,,"8[35-9]5\\d{7}",,,,"8551234567",,,[10]]],"IL":[,[,,"1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",,,,,,,[7,8,9,10,11,12]],[,,"(?:153\\d{1,2}|[2-489])\\d{7}",,,,"21234567",,,[8,11,12],[7]],[,,"5(?:[0-489][2-9]\\d|5(?:01|2[2-5]|3[23]|4[45]|5[05689]|6[6-8]|7[0-267]|8[7-9]|9[1-9])|6\\d{2})\\d{5}",,,,"502345678",,,[9]],[,,"1(?:80[019]\\d{3}|255)\\d{3}",,,,"1800123456",,,[7,10]],[,,"1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}",,,,"1919123456",,,[8,9,10]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,"7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6[58]\\d|7\\d{2}|8(?:2\\d|33|55|77|81)|9[2357-9]\\d)\\d{5}",,,,"771234567",,,[9]],"IL",972,"0(?:0|1[2-9])","0",,,"0",,,,[[,"([2-489])(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],[,"([57]\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],[,"(153)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["153"]],[,"(1)([7-9]\\d{2})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],[,"(1255)(\\d{3})","$1-$2",["125","1255"]],[,"(1200)(\\d{3})(\\d{3})","$1-$2-$3",["120","1200"]],[,"(1212)(\\d{2})(\\d{2})","$1-$2-$3",["121","1212"]],[,"(1599)(\\d{6})","$1-$2",["159","1599"]],[,"(151)(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["151"]]],,[,,,,,,,,,[-1]],,,[,,"1700\\d{6}",,,,,,,[10]],[,,"1599\\d{6}",,,,"1599123456",,,[10]],,,[,,"151\\d{8,9}",,,,"15112340000",,,[11,12]]],"IM":[,[,,"(?:1624|(?:[3578]\\d|90)\\d\\d)\\d{6}",,,,,,,[10],[6]],[,,"1624[5-8]\\d{5}",,,,"1624756789",,,,[6]],[,,"7(?:4576|[59]24\\d|624[0-4689])\\d{5}",,,,"7924123456"],[,,"808162\\d{4}",,,,"8081624567"],[,,"(?:872299|90[0167]624)\\d{4}",,,,"9016247890"],[,,"8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}",,,,"8456247890"],[,,"70\\d{8}",,,,"7012345678"],[,,"56\\d{8}",,,,"5612345678"],"IM",44,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],"IN":[,[,,"(?:00800|1\\d{0,5}|[2-9]\\d\\d)\\d{7}",,,,,,,[8,9,10,11,12,13],[6,7]],[,,"(?:11|2[02]|33|4[04]|79|80)[2-7]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}",,,,"7410410123",,,[10],[6,7,8]],[,,"(?:6(?:0(?:0[0-3569]|26|33)\\d|1279|2(?:[06]\\d|3[02589]|8[0-479]|9[0-79])\\d|3(?:0[0-79]\\d|5(?:0[0-6]|[1-9]\\d)|6[0-4679]\\d|7[0-24-9]\\d|[89]\\d{2})|9(?:0[019]|13)\\d)|7(?:0\\d{3}|19[0-5]\\d|2(?:[0235679]\\d{2}|[14][017-9]\\d|8(?:[0-59]\\d|[678][089]))|3(?:[05-8]\\d{2}|1(?:[089]\\d|11|7[02-8])|2(?:[0-49][089]|[5-8]\\d)|3[017-9]\\d|4(?:[07-9]\\d|11)|9(?:[016-9]\\d|[2-5][089]))|4(?:0\\d{2}|1(?:[015-9]\\d|[23][089]|4[089])|2(?:0[089]|[1-7][089]|[89]\\d)|3(?:[0-8][089]|9\\d)|4(?:[089]\\d|11|7[02-8])|[56]\\d[089]|7(?:[089]\\d|11|7[02-8])|8(?:[0-24-7][089]|[389]\\d)|9(?:[0-6][089]|7[089]|[89]\\d))|5(?:[0346-8]\\d{2}|1(?:[07-9]\\d|11)|2(?:[04-9]\\d|[123][089])|5[017-9]\\d|9(?:[0-6][089]|[7-9]\\d))|6(?:0(?:[0-47]\\d|[5689][089])|(?:1[0-257-9]|[6-9]\\d)\\d|2(?:[0-4]\\d|[5-9][089])|3(?:[02-8][089]|[19]\\d)|4\\d[089]|5(?:[0-367][089]|[4589]\\d))|7(?:0(?:0[02-9]|[13-7][089]|[289]\\d)|[1-9]\\d{2})|8(?:[0-79]\\d{2}|8(?:[089]\\d|11|7[02-9]))|9(?:[089]\\d{2}|313|7(?:[02-8]\\d|9[07-9])))|8(?:0(?:[01589]\\d{2}|6[67]\\d|7(?:[02-8]\\d|9[04-9]))|1(?:[0-57-9]\\d{2}|6(?:[089]\\d|7[02-8]))|2(?:0(?:[089]\\d|7[02-8])|[14](?:[089]\\d|7[02-8])|[235-9]\\d{2})|3(?:[0357-9]\\d{2}|1(?:[089]\\d|7[02-8])|2(?:[089]\\d|7[02-8])|4\\d{2}|6(?:[089]\\d|7[02-8]))|[45]\\d{3}|6(?:[02457-9]\\d{2}|1(?:[089]\\d|7[02-8])|3(?:[089]\\d|7[02-8])|6(?:[08]\\d|7[02-8]|9\\d))|7(?:0[07-9]\\d|[1-69]\\d{2}|[78](?:[089]\\d|7[02-8]))|8(?:[0-25-9]\\d{2}|3(?:[089]\\d|7[02-8])|4(?:[0489]\\d|7[02-8]))|9(?:[02-9]\\d{2}|1(?:[0289]\\d|7[02-8])))|9\\d{4})\\d{5}",,,,"8123456789",,,[10]],[,,"00800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))",,,,"1800123456"],[,,"186[12]\\d{9}",,,,"1861123456789",,,[13]],[,,"1860\\d{7}",,,,"18603451234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IN",91,"00","0",,,"0",,,,[[,"(\\d{8})","$1",["561","5616","56161"],"$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["6(?:0[023]|12|2[03689]|3[05-9]|9[019])|7(?:[02-8]|19|9[037-9])|8(?:0[015-9]|[1-9])|9","6(?:0(?:0|26|33)|127|2(?:[06]|3[02589]|8[0-379]|9[0-4679])|3(?:0[0-79]|5[0-46-9]|6[0-4679]|7[0-24-9]|[89])|9[019])|7(?:[07]|19[0-5]|2(?:[0235-9]|[14][017-9])|3(?:[025-9]|[134][017-9])|4(?:[0-35689]|[47][017-9])|5(?:[02-46-9]|[15][017-9])|6(?:[02-9]|1[0-257-9])|8(?:[0-79]|8[0189])|9(?:[089]|31|7[02-9]))|8(?:0(?:[01589]|6[67]|7[02-9])|1(?:[0-57-9]|6[07-9])|2(?:[014][07-9]|[235-9])|3(?:[03-57-9]|[126][07-9])|[45]|6(?:[02457-9]|[136][07-9])|7(?:[078][07-9]|[1-69])|8(?:[0-25-9]|3[07-9]|4[047-9])|9(?:[02-9]|1[027-9]))|9","6(?:0(?:0|26|33)|1279|2(?:[06]|3[02589]|8[0-379]|9[0-4679])|3(?:0[0-79]|5[0-46-9]|6[0-4679]|7[0-24-9]|[89])|9[019])|7(?:0|19[0-5]|2(?:[0235-79]|[14][017-9]|8(?:[0-69]|[78][089]))|3(?:[05-8]|1(?:[0189]|7[02-9])|2(?:[0-49][089]|[5-8])|3[017-9]|4(?:[07-9]|11)|9(?:[01689]|[2-5][089]|7[0189]))|4(?:[056]|1(?:[0135-9]|[24][089])|[29](?:[0-7][089]|[89])|3(?:[0-8][089]|9)|[47](?:[089]|11|7[02-8])|8(?:[0-24-7][089]|[389]))|5(?:[0346-9]|[15][017-9]|2(?:[03-9]|[12][089]))|6(?:[0346-9]|1[0-257-9]|2(?:[0-4]|[5-9][089])|5(?:[0-367][089]|[4589]))|7(?:0(?:[02-9]|1[089])|[1-9])|8(?:[0-79]|8(?:0[0189]|11|8[013-9]|9))|9(?:[089]|313|7(?:[02-8]|9[07-9])))|8(?:0(?:[01589]|6[67]|7(?:[02-8]|9[04-9]))|1(?:[0-57-9]|6(?:[089]|7[02-8]))|2(?:[014](?:[089]|7[02-8])|[235-9])|3(?:[03-57-9]|[126](?:[089]|7[02-8]))|[45]|6(?:[02457-9]|[136](?:[089]|7[02-8]))|7(?:0[07-9]|[1-69]|[78](?:[089]|7[02-8]))|8(?:[0-25-9]|3(?:[089]|7[02-8])|4(?:[0489]|7[02-8]))|9(?:[02-9]|1(?:[0289]|7[02-8])))|9"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-9]|80[2-46]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[59][14]|[68][1-9]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1|9[15])|6(?:12|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"],"0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[23579]|[468][1-9])|[2-8]"],"0$1",,1],[,"(\\d{2})(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3 $4",["008"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],"$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3",["160","1600"],"$1",,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],"$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["180","1800"],"$1",,1],[,"(\\d{4})(\\d{3,4})(\\d{4})","$1 $2 $3",["186","1860"],"$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18[06]"],"$1",,1]],,[,,,,,,,,,[-1]],,,[,,"00800\\d{7}|1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))"],[,,"140\\d{7}",,,,"1409305260",,,[10]],,,[,,,,,,,,,[-1]]],"IO":[,[,,"3\\d{6}",,,,,,,[7]],[,,"37\\d{5}",,,,"3709100"],[,,"38\\d{5}",,,,"3801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IO",246,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"IQ":[,[,,"(?:1|[2-6]\\d?|7\\d\\d)\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"7[3-9]\\d{8}",,,,"7912345678",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IQ",964,"00","0",,,"0",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"([2-6]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"IR":[,[,,"[1-9]\\d{9}|[1-8]\\d{5,6}",,,,,,,[6,7,10],[4,5,8]],[,,"(?:(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:\\d{8}|(?:[16]|[289]\\d?)\\d{3}))|94(?:000|11[0-7]|2\\d{2}|30[01]|4(?:11|40))\\d{5}",,,,"2123456789",,,,[4,5,8]],[,,"9(?:0(?:[1-35]\\d{2}|44\\d)|[13]\\d{3}|2[0-2]\\d{2}|9(?:[01]\\d{2}|44\\d|8(?:10|88)|9(?:0[013]|1[134]|21|9[89])))\\d{5}",,,,"9123456789",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"993\\d{7}",,,,"9932123456",,,[10]],"IR",98,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"],[,"(\\d{2})(\\d{4,5})","$1 $2",["[1-8]"],"0$1"],[,"(\\d{4,5})","$1",["96"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:9411[1-7]|94440)\\d{5}",,,,,,,[10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"IS":[,[,,"(?:38\\d|[4-9])\\d{6}",,,,,,,[7,9]],[,,"(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}",,,,"4101234",,,[7]],[,,"(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[027-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-8]\\d|9[0-3])|8(?:2[0-59]|[3469]\\d|5[1-9]|8[28]))\\d{4}",,,,"6111234"],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"90\\d{5}",,,,"9011234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"49\\d{5}",,,,"4921234",,,[7]],"IS",354,"00|1(?:0(?:01|[12]0)|100)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"809\\d{4}",,,,"8091234",,,[7]],,,[,,"(?:689|8(?:7[0189]|80)|95[48])\\d{4}",,,,"6891234",,,[7]]],"IT":[,[,,"0\\d{6}(?:\\d{4})?|3[0-8]\\d{9}|(?:[0138]\\d?|55)\\d{8}|[08]\\d{5}(?:\\d{2})?",,,,,,,[6,7,8,9,10,11]],[,,"0(?:(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d|6(?:[0-57-9]\\d\\d|6(?:[0-8]\\d|9[0-79])))\\d{1,6}",,,,"0212345678"],[,,"33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}",,,,"3123456789",,,[9,10,11]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:(?:0878|1(?:44|6[346])\\d)\\d\\d|89(?:2|(?:4[5-9]|(?:5[5-9]|9)\\d\\d)\\d))\\d{3}|89[45][0-4]\\d\\d",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"IT",39,"00",,,,,,,,[[,"(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],[,"(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],[,"(\\d{4})(\\d{4})","$1 $2",["894"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1(?:44|[67]|99)|[38]"]],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3"]],[,"(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],1,,[,,"848\\d{6}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"JE":[,[,,"(?:1534|(?:[3578]\\d|90)\\d\\d)\\d{6}",,,,,,,[10],[6]],[,,"1534[0-24-8]\\d{5}",,,,"1534456789",,,,[6]],[,,"7(?:509\\d|7(?:00[378]|97[7-9])|829\\d|937\\d)\\d{5}",,,,"7797712345"],[,,"80(?:07(?:35|81)|8901)\\d{4}",,,,"8007354567"],[,,"(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}",,,,"9018105678"],[,,"8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}",,,,"8447034567"],[,,"701511\\d{4}",,,,"7015115678"],[,,"56\\d{8}",,,,"5612345678"],"JE",44,"00","0",,,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456"],,,[,,,,,,,,,[-1]],[,,"3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],"JM":[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[0237-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}",,,,"8765230123",,,,[7]],[,,"876(?:(?:2[14-9]|[348]\\d)\\d|5(?:0[3-9]|[2-57-9]\\d|6[0-24-9])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}",,,,"8762101234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"JM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"876",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"JO":[,[,,"(?:(?:(?:[268]|7\\d)\\d|32|53)\\d|900)\\d{5}",,,,,,,[8,9]],[,,"(?:2(?:6(?:2[0-35-9]|3[0-578]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[05]0|3(?:00|33)|4(?:0[0-25]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[178]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[0239]))|87(?:[029]0|7[08]))\\d{4}",,,,"62001234",,,[8]],[,,"7(?:55[0-49]|(?:7[025-9]|[89][0-25-9])\\d)\\d{5}",,,,"790123456",,,[9]],[,,"80\\d{6}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,"85\\d{6}",,,,"85012345",,,[8]],[,,"70\\d{7}",,,,"700123456",,,[9]],[,,,,,,,,,[-1]],"JO",962,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7[457-9]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["7"],"0$1"]],,[,,"74(?:66|77)\\d{5}",,,,"746612345",,,[9]],,,[,,,,,,,,,[-1]],[,,"8(?:10|8\\d)\\d{5}",,,,"88101234",,,[8]],,,[,,,,,,,,,[-1]]],"JP":[,[,,"00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",,,,,,,[8,9,10,11,12,13,14,15,16,17]],[,,"(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|(?:2[2-9]|[36][1-9])\\d|4(?:[2-578]\\d|6[02-8]|9[2-59])|5(?:[2-589]\\d|6[1-9]|7[2-8])|7(?:[25-9]\\d|3[4-9]|4[02-9])|8(?:[2679]\\d|3[2-9]|4[5-9]|5[1-9]|8[03-9])|9(?:[2-58]\\d|[679][1-9]))\\d{6}",,,,"312345678",,,[9]],[,,"[7-9]0[1-9]\\d{7}",,,,"9012345678",,,[10]],[,,"(?:00(?:(?:37|66)\\d{4,11}|777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)|(?:120|800\\d)\\d{4})\\d\\d",,,,"120123456"],[,,"990\\d{6}",,,,"990123456",,,[9]],[,,,,,,,,,[-1]],[,,"60\\d{7}",,,,"601234567",,,[9]],[,,"50[1-9]\\d{7}",,,,"5012345678",,,[10]],"JP",81,"010","0",,,"0",,,,[[,"(\\d{4})(\\d{4})","$1-$2",["007","0077","00777","00777[01]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:[2-46]|5[2-8]|7[2-689]|8[2-7]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:[3-6][2-9]|7[2-6]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|4[2-69]|[5-7]))","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6[56]))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6(?:5[25]|60)))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:[34]7|[56]9|74|9[14-79])|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["2[2-9]|4|7[235-9]|9[49]"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{3,4})","$1-$2-$3",["007"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{4})","$1-$2-$3",["008"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{4})(\\d{4,5})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{5})(\\d{5,6})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{6})(\\d{6,7})","$1-$2-$3",["0"]]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:[2-46]|5[2-8]|7[2-689]|8[2-7]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:[3-6][2-9]|7[2-6]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|4[2-69]|[5-7]))","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6[56]))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))","1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6(?:5[25]|60)))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:[34]7|[56]9|74|9[14-79])|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["2[2-9]|4|7[235-9]|9[49]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"]],[,,"20\\d{8}",,,,"2012345678",,,[10]],,,[,,"00(?:(?:37|66)\\d{4,11}|777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d"],[,,"570\\d{6}",,,,"570123456",,,[9]],,,[,,,,,,,,,[-1]]],"KE":[,[,,"(?:(?:2|80)0\\d?|[4-7]\\d\\d|900)\\d{6}|[4-6]\\d{6,7}",,,,,,,[7,8,9,10]],[,,"20\\d{6,7}|4(?:0\\d{6,7}|[136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|2\\d{7}|6\\d{6,7})",,,,"202012345",,,[7,8,9]],[,,"7\\d{8}",,,,"712123456",,,[9]],[,,"800[24-8]\\d{5,6}",,,,"800223456",,,[9,10]],[,,"900[02-9]\\d{5}",,,,"900223456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KE",254,"000","0",,,"0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KG":[,[,,"(?:[235-7]\\d|99)\\d{7}|800\\d{6,7}",,,,,,,[9,10],[5,6]],[,,"(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}",,,,"312123456",,,[9],[5,6]],[,,"(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|7(?:[07]\\d|55)|99[69])\\d{6}",,,,"700123456",,,[9]],[,,"800\\d{6,7}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KG",996,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[25-79]|31[25]"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["3(?:1[36]|[2-9])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d)(\\d{3})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KH":[,[,,"1\\d{9}|[1-9]\\d{7,8}",,,,,,,[8,9,10],[6,7]],[,,"(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}",,,,"23756789",,,[8,9],[6,7]],[,,"(?:1(?:[013-79]\\d|[28]\\d{1,2})|2[3-6]48|3(?:[18]\\d{2}|[2-6]48)|4[2-4]48|5[2-5]48|6(?:[016-9]\\d|[2-5]48)|7(?:[07-9]\\d|[16]\\d{2}|[2-5]48)|8(?:[013-79]\\d|8\\d{2})|9(?:6\\d{2}|7\\d{1,2}|[0-589]\\d))\\d{5}",,,,"91234567",,,[8,9]],[,,"1800(?:1\\d|2[019])\\d{4}",,,,"1800123456",,,[10]],[,,"1900(?:1\\d|2[09])\\d{4}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KH",855,"00[14-9]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["1\\d[1-9]|[2-9]"],"0$1"],[,"(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[89]0","1[89]00"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KI":[,[,,"(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",,,,,,,[5,8]],[,,"(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}|(?:65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d{2}|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500)))\\d{3}",,,,"31234"],[,,"(?:6(?:200[01]|30[01]\\d)|7(?:200[01]|3(?:0[0-5]\\d|140)))\\d{3}",,,,"72001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"30(?:0[01]\\d{2}|12(?:11|20))\\d{2}",,,,"30010000",,,[8]],"KI",686,"00",,,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KM":[,[,,"[3478]\\d{6}",,,,,,,[7]],[,,"7[4-7]\\d{5}",,,,"7712345"],[,,"[34]\\d{6}",,,,"3212345"],[,,,,,,,,,[-1]],[,,"8\\d{6}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KM",269,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KN":[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}",,,,"8692361234",,,,[7]],[,,"869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}",,,,"8697652917",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KN",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"869",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KP":[,[,,"(?:(?:19\\d|2)\\d|85)\\d{6}",,,,,,,[8,10],[6,7]],[,,"2\\d{7}|85\\d{6}",,,,"21234567",,,[8],[6,7]],[,,"19[123]\\d{7}",,,,"1921234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KP",850,"00|99","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KR":[,[,,"(?:00[1-9]\\d{2,4}|[12]|5\\d{3})\\d{7}|(?:(?:00|[13-6])\\d|70)\\d{8}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}",,,,,,,[5,6,8,9,10,11,12,13,14],[3,7]],[,,"2[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})",,,,"22123456",,,[5,6,8,9,10],[3,7]],[,,"1[0-26-9]\\d{7,8}",,,,"1000000000",,,[9,10]],[,,"(?:00(?:3(?:08|68\\d)|798\\d{1,3})|80\\d)\\d{6}",,,,"801234567",,,[9,11,12,13,14]],[,,"60[2-9]\\d{6}",,,,"602345678",,,[9]],[,,,,,,,,,[-1]],[,,"50\\d{8,9}",,,,"5012345678",,,[10,11]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"KR",82,"00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","0",,,"0(8[1-46-8]|85\\d{2})?",,,,[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1(?:5[246-9]|6[046-8]|8[03579])","1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))"],"$1","0$CC-$1"],[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11","1[016-9]114"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60[2-9]|80"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1[0-25-9]|(?:3[1-3]|[46][1-4]|5[1-5])[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]0"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["50"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3})(\\d{3})","$1 $2 $3",["003","0030","00308"],"$1","0$CC-$1"],[,"(\\d{5})(\\d{3,4})(\\d{4})","$1 $2 $3",["00[37]","00(?:36|79)","00(?:36|79)8"],"$1","0$CC-$1"],[,"(\\d{5})(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["007","0079","00798"],"$1","0$CC-$1"]],[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1(?:5[246-9]|6[046-8]|8[03579])","1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))"],"$1","0$CC-$1"],[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11","1[016-9]114"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60[2-9]|80"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1[0-25-9]|(?:3[1-3]|[46][1-4]|5[1-5])[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]0"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["50"],"0$1","0$CC-$1"]],[,,"15\\d{7,8}",,,,"1523456789",,,[9,10]],,,[,,"00(?:3(?:08|68\\d)|798\\d{1,3})\\d{6}",,,,,,,[11,12,13,14]],[,,"1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))\\d{4}",,,,"15441234",,,[8]],,,[,,,,,,,,,[-1]]],"KW":[,[,,"(?:18|[2569]\\d\\d)\\d{5}",,,,,,,[7,8]],[,,"2(?:[23]\\d\\d|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7]))\\d{4}",,,,"22345678",,,[8]],[,,"(?:5(?:(?:[05]\\d|1[0-7]|6[56])\\d|2(?:22|5[25]))|6(?:(?:0[034679]|5[015-9]|6\\d)\\d|222|7(?:0[013-9]|[67]\\d)|9(?:[069]\\d|3[039]))|9(?:(?:0[09]|22|4[01479]|55|6[0679]|8[057-9]|9\\d)\\d|11[01]|7(?:02|[1-9]\\d)))\\d{4}",,,,"50012345",,,[8]],[,,"18\\d{5}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KW",965,"00",,,,,,,,[[,"(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],[,"(\\d{3})(\\d{5})","$1 $2",["[25]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KY":[,[,,"(?:345|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}",,,,"3452221234",,,,[7]],[,,"345(?:32[1-9]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|9(?:1[67]|2[2-9]|3[689]))\\d{4}",,,,"3453231234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"(?:345976|900[2-9]\\d\\d)\\d{4}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KY",1,"011","1",,,"1",,,,,,[,,"345849\\d{4}",,,,"3458491234"],,"345",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"KZ":[,[,,"(?:33622|(?:7\\d|80)\\d{3})\\d{5}",,,,,,,[10]],[,,"33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}",,,,"7123456789"],[,,"7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}",,,,"7710009998"],[,,"800\\d{7}",,,,"8001234567"],[,,"809\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567"],[,,"751\\d{7}",,,,"7511234567"],"KZ",7,"810","8",,,"8",,"8~10",,,,[,,,,,,,,,[-1]],,,[,,"751\\d{7}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LA":[,[,,"(?:2\\d|3)\\d{8}|(?:[235-8]\\d|41)\\d{6}",,,,,,,[8,9,10],[6]],[,,"(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}",,,,"21212862",,,[8,9],[6]],[,,"20(?:2[2389]|5[24-689]|7[6-8]|9[1-35-9])\\d{6}",,,,"2023123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LA",856,"00","0",,,"0",,,,[[,"(20)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["20"],"0$1"],[,"([2-8]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],[,"(30)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LB":[,[,,"[7-9]\\d{7}|[13-9]\\d{6}",,,,,,,[7,8]],[,,"(?:(?:[14-69]\\d|8[02-9])\\d|7(?:[2-57]\\d|62|8[0-7]|9[04-9]))\\d{4}",,,,"1123456",,,[7]],[,,"(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3]))\\d{5}",,,,"71123456"],[,,,,,,,,,[-1]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,"80\\d{6}",,,,"80123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LB",961,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LC":[,[,,"(?:[58]\\d\\d|758|900)\\d{7}",,,,,,,[10],[7]],[,,"758(?:4(?:30|5\\d|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}",,,,"7584305678",,,,[7]],[,,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[01]))\\d{4}",,,,"7582845678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"LC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"758",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LI":[,[,,"(?:(?:[2378]|6\\d\\d)\\d|90)\\d{5}",,,,,,,[7,9]],[,,"(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}",,,,"2345678",,,[7]],[,,"6(?:5(?:09|1\\d|20)|6(?:0[0-6]|10|2[06-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}",,,,"660234567"],[,,"80(?:02[28]|9\\d{2})\\d{2}",,,,"8002222",,,[7]],[,,"90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}",,,,"9002222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LI",423,"00","0",,,"0|10(?:01|20|66)",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[237-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[56]"]],[,"(69)(7\\d{2})(\\d{4})","$1 $2 $3",["697"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"870(?:28|87)\\d{2}",,,,"8702812",,,[7]],,,[,,"697(?:42|56|[78]\\d)\\d{4}",,,,"697861234",,,[9]]],"LK":[,[,,"(?:[1-7]\\d|[89]1)\\d{7}",,,,,,,[9],[7]],[,,"1(?:1[2-57]\\d{6}|973\\d{5})|(?:2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7]|[89]1)[2-57]\\d{6}",,,,"112345678",,,,[7]],[,,"7[0125-8]\\d{7}",,,,"712345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LK",94,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LR":[,[,,"(?:[25]\\d|33|77|88)\\d{7}|(?:2\\d|[45])\\d{6}",,,,,,,[7,8,9]],[,,"(?:2\\d{3}|33333)\\d{4}",,,,"21234567",,,[8,9]],[,,"(?:(?:(?:20|77|88)\\d|330|555)\\d|4[67])\\d{5}|5\\d{6}",,,,"770123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"332(?:02|[2-5]\\d)\\d{4}",,,,"332021234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LR",231,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[45]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23578]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LS":[,[,,"(?:[256]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"2\\d{7}",,,,"22123456"],[,,"[56]\\d{7}",,,,"50123456"],[,,"800[256]\\d{4}",,,,"80021234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LS",266,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2568]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LT":[,[,,"(?:[3469]\\d|52|[78]0)\\d{6}",,,,,,,[8]],[,,"(?:3[1478]|4[124-6]|52)\\d{6}",,,,"31234567"],[,,"6\\d{7}",,,,"61234567"],[,,"800\\d{5}",,,,"80012345"],[,,"9(?:0[0239]|10)\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"LT",370,"00","8",,,"[08]",,,,[[,"([34]\\d)(\\d{6})","$1 $2",["37|4(?:1|5[45]|6[2-4])"],"(8-$1)",,1],[,"([3-6]\\d{2})(\\d{5})","$1 $2",["3[148]|4(?:[24]|6[09])|528|6"],"(8-$1)",,1],[,"([7-9]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",,1],[,"(5)(2\\d{2})(\\d{4})","$1 $2 $3",["52[0-79]"],"(8-$1)",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70[67]\\d{5}",,,,"70712345"],,,[,,,,,,,,,[-1]]],"LU":[,[,,"[2457-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5(?:[013-9]\\d{1,8}|2\\d{1,3}))|6\\d{8}",,,,,,,[4,5,6,7,8,9,10,11]],[,,"2[2-9]\\d{2,9}|(?:3(?:[0-46-9]\\d|5[013-9])|[457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8}",,,,"27123456"],[,,"6(?:[269][18]|5[158]|7[189]|81)\\d{6}",,,,"628123456",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90[015]\\d{5}",,,,"90012345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,,,,,,,,[-1]],[,,"20(?:1\\d{5}|[2-689]\\d{1,7})",,,,"20201234",,,[4,5,6,7,8,9,10]],"LU",352,"00",,,,"(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)",,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-5]|7[1-9]|[89](?:0[2-9]|[1-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[2-5]|7[1-9]|[89](?:0[2-9]|[1-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})","$1 $2 $3 $4",["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:0[2-9]|[1-9])|9(?:0[2-46-9]|[1-9])"],,"$CC $1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["70|80[01]|90[015]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LV":[,[,,"(?:[268]\\d|90)\\d{6}",,,,,,,[8]],[,,"6\\d{7}",,,,"63123456"],[,,"2\\d{7}",,,,"21234567"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,"81\\d{6}",,,,"81123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LV",371,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[269]|8[01]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"LY":[,[,,"(?:[2569]\\d|71)\\d{7}",,,,,,,[9],[7]],[,,"(?:2[1345]|5[1347]|6[123479]|71)\\d{7}",,,,"212345678",,,,[7]],[,,"9[1-6]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LY",218,"00","0",,,"0",,,,[[,"([25-79]\\d)(\\d{7})","$1-$2",["[25-79]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MA":[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}",,,,"520123456"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5924[01]\\d{4}",,,,"592401234"],"MA",212,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{6})","$1-$2",["5(?:2[015-7]|3[0-4])|[67]"],"0$1"],[,"(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|9)|892","5(?:2(?:[2-48]|9[0-7])|3(?:[5-79]|8[0-7])|9)|892"],"0$1"],[,"(\\d{5})(\\d{4})","$1-$2",["5[23]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5"],"0$1"],[,"(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MC":[,[,,"(?:(?:[349]|6\\d)\\d\\d|870)\\d{5}",,,,,,,[8,9]],[,,"(?:870|9[2-47-9]\\d)\\d{5}",,,,"99123456",,,[8]],[,,"(?:(?:3|6\\d)\\d\\d|4(?:4\\d|5[1-9]))\\d{5}",,,,"612345678"],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MC",377,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["8"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"870\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MD":[,[,,"(?:[235-7]\\d|[89]0)\\d{6}",,,,,,,[8]],[,,"(?:(?:2[1-9]|3[1-79])\\d|5(?:33|5[257]))\\d{5}",,,,"22212345"],[,,"(?:562|6\\d\\d|7(?:[189]\\d|6[07]|7[457-9]))\\d{5}",,,,"62112345"],[,,"800\\d{5}",,,,"80012345"],[,,"90[056]\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,,,,,,,,[-1]],[,,"3[08]\\d{6}",,,,"30123456"],"MD",373,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"803\\d{5}",,,,"80312345"],,,[,,,,,,,,,[-1]]],"ME":[,[,,"(?:20|[3-79]\\d|80\\d?)\\d{6}",,,,,,,[8,9],[6]],[,,"(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:[01][2467]|2[2-467]))\\d{5}",,,,"30234567",,,[8],[6]],[,,"6(?:00\\d|3[024]\\d|6[0-25]\\d|[7-9]\\d{2})\\d{4}",,,,"67622901",,,[8]],[,,"80(?:[0-2578]|9\\d)\\d{5}",,,,"80080002"],[,,"(?:9(?:4[1568]|5[178]))\\d{5}",,,,"94515151",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"78[1-49]\\d{5}",,,,"78108780",,,[8]],"ME",382,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-57-9]|6[036-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"77[1-9]\\d{5}",,,,"77273012",,,[8]],,,[,,,,,,,,,[-1]]],"MF":[,[,,"(?:590|69\\d)\\d{6}",,,,,,,[9]],[,,"590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}",,,,"590271234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MF",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MG":[,[,,"[23]\\d{8}",,,,,,,[9],[7]],[,,"20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}",,,,"202123456",,,,[7]],[,,"3[2-49]\\d{7}",,,,"321234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"22\\d{7}",,,,"221234567"],"MG",261,"00","0",,,"0",,,,[[,"([23]\\d)(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MH":[,[,,"(?:(?:[256]\\d|45)\\d|329)\\d{4}",,,,,,,[7]],[,,"(?:247|528|625)\\d{4}",,,,"2471234"],[,,"(?:(?:23|54)5|329|45[56])\\d{4}",,,,"2351234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"635\\d{4}",,,,"6351234"],"MH",692,"011","1",,,"1",,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-6]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MK":[,[,,"[2-578]\\d{7}",,,,,,,[8],[6,7]],[,,"(?:2(?:[23]\\d|5[0-24578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}",,,,"22012345",,,,[6,7]],[,,"7(?:[0-25-8]\\d{2}|3[2-4]\\d|421|9[23]\\d)\\d{4}",,,,"72345678"],[,,"800\\d{5}",,,,"80012345"],[,,"5[02-9]\\d{6}",,,,"50012345"],[,,"8(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"80123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MK",389,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"([347]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],[,"([58]\\d{2})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ML":[,[,,"(?:[246-9]\\d|50)\\d{6}",,,,,,,[8]],[,,"(?:2(?:0(?:2\\d|7[0-8])|1(?:2[67]|[4-689]\\d))|4(?:0[0-4]|4[1-39])\\d)\\d{4}",,,,"20212345"],[,,"(?:2(?:079|17\\d)|50\\d{2}|[679]\\d{3}|8[239]\\d{2})\\d{4}",,,,"65012345"],[,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ML",223,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]],[,"(\\d{4})","$1",["67|74"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[,,,,,,,,,[-1]],,,[,,"80\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MM":[,[,,"(?:1|[24-7]\\d)\\d{5,7}|8\\d{6,9}|9(?:[0-46-9]\\d{6,8}|5\\d{6})|2\\d{5}",,,,,,,[6,7,8,9,10],[5]],[,,"1(?:2\\d{1,2}|[35]\\d|4(?:\\d|2[2-469]|39|6[25]|70)|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|2[246]\\d{4}|39\\d{4}|62\\d{4}|70\\d{4}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2(?:[25-8]|4(?:80)?)|3(?:2(?:02)?|[36]|4(?:70)?|56?)|[46][2-6]|5(?:[35]|4(?:70)?))\\d{4}|5(?:2(?:2(?:\\d{1,2})?|[35-8]|4(?:70)?)|3[2-68]|4(?:21?|4(?:70)?|[5-8])|5[23]|6[2-4]|7(?:[235-8]|4(?:80)?)|8(?:[25-7]|4(?:70)?)|9(?:[235-7]|4(?:70)?))\\d{4}|6(?:0[23]|1(?:2(?:0|4\\d)?|[356])|2[2-6]|3(?:[25-6]|4(?:70)?)|4(?:2(?:4\\d)?|[3-6])|5[2-4]|6[2-8]|7(?:[2367]|4(?:\\d|39|[67]0)|5\\d?|8[145]\\d)|8[245]|9(?:20?|4))\\d{4}|7(?:[04](?:[25-8]|4(?:70)?)|1(?:20?|[35-7]|4(?:70)?)|22|3[2-4]|5(?:[235-7]|4(?:70)?))\\d{4}|8(?:1(?:2\\d{1,2}|[35689]\\d|4(?:70)?\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3(?:2|4(?:70)?)\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}",,,,"1234567",,,[6,7,8,9],[5]],[,,"17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3(?:[0-36]|4[069])\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|6(?:1\\d|9\\d{2}|\\d)|7(?:3|5[0-2]|[6-9]\\d)\\d|8(?:\\d|9\\d{2})|9(?:1\\d|[5-7]\\d{2}|[089]))\\d{5}",,,,"92123456",,,[7,8,9,10]],[,,"80080[01][1-9]\\d{3}",,,,"8008001234",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:1(?:333|468)|2468)\\d{4}",,,,"13331234",,,[8]],"MM",95,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["1|2[245]"],"0$1"],[,"(2)(\\d{4})(\\d{4})","$1 $2 $3",["251"],"0$1"],[,"(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[4-8]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-8]"],"0$1"],[,"(9)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],[,"(9)([34]\\d{4})(\\d{4})","$1 $2 $3",["9(?:3[0-36]|4[0-57-9])"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92[56]"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["93"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MN":[,[,,"[12]\\d{8,9}|[1257-9]\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}",,,,"50123456",,,,[6,7]],[,,"(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}",,,,"88123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"7[05-8]\\d{6}",,,,"75123456",,,[8]],"MN",976,"001","0",,,"0",,,,[[,"([12]\\d)(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],[,"([12]2\\d)(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],[,"([12]\\d{3})(\\d{5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)2"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[57-9]"],"$1"],[,"([12]\\d{4})(\\d{4,5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)[4-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MO":[,[,,"(?:28|[68]\\d)\\d{6}",,,,,,,[8]],[,,"(?:28[2-57-9]|8(?:11|[2-57-9]\\d))\\d{5}",,,,"28212345"],[,,"6(?:[2356]\\d\\d|8(?:[02][5-9]|[1478]\\d|[356][0-4]))\\d{4}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MO",853,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[268]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MP":[,[,,"(?:[58]\\d\\d|(?:67|90)0)\\d{7}",,,,,,,[10],[7]],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MP",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"670",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MQ":[,[,,"(?:596|69\\d)\\d{6}",,,,,,,[9]],[,,"596(?:0[0-7]|10|2[7-9]|3[05-9]|4[0-46-8]|[5-7]\\d|8[09]|9[4-8])\\d{4}",,,,"596301234"],[,,"69(?:6(?:[0-47-9]\\d|5[0-6]|6[0-4])|727)\\d{4}",,,,"696201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MQ",596,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[56]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MR":[,[,,"(?:[2-4]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"(?:25[08]|35\\d|45[1-7])\\d{5}",,,,"35123456"],[,,"[2-4][0-46-9]\\d{6}",,,,"22123456"],[,,"800\\d{5}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MR",222,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MS":[,[,,"(?:(?:[58]\\d\\d|900)\\d\\d|66449)\\d{5}",,,,,,,[10],[7]],[,,"664491\\d{4}",,,,"6644912345",,,,[7]],[,,"66449[2-6]\\d{4}",,,,"6644923456",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"664",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MT":[,[,,"(?:(?:[2579]\\d\\d|800)\\d|3550)\\d{4}",,,,,,,[8]],[,,"2(?:0(?:[169]\\d|3[1-4])|[1-357]\\d\\d)\\d{4}",,,,"21001234"],[,,"(?:7(?:210|[79]\\d\\d)|9(?:2(?:1[01]|31)|69[67]|8(?:1[1-3]|89|97)|9\\d\\d))\\d{4}",,,,"96961234"],[,,"800[3467]\\d{4}",,,,"80071234"],[,,"5(?:0(?:0(?:37|43)|(?:6\\d|70|9[0168])\\d)|[12]\\d0[1-5])\\d{3}",,,,"50037123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3550\\d{4}",,,,"35501234"],"MT",356,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]],,[,,"7117\\d{4}",,,,"71171234"],,,[,,,,,,,,,[-1]],[,,"501\\d{5}",,,,"50112345"],,,[,,,,,,,,,[-1]]],"MU":[,[,,"(?:[2-468]|5\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:2(?:[03478]\\d|1[0-7]|6[1-79])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}",,,,"54480123"],[,,"5(?:2[589]\\d|4(?:2[1-389]|[489]\\d|7[1-9])|7\\d{2}|8(?:[0-689]\\d|7[15-8])|9[0-8]\\d)\\d{4}",,,,"52512345",,,[8]],[,,"80[012]\\d{4}",,,,"8001234",,,[7]],[,,"30\\d{5}",,,,"3012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3(?:20|9\\d)\\d{4}",,,,"3201234",,,[7]],"MU",230,"0(?:0|[2-7]0|33)",,,,,,"020",,[[,"([2-46-9]\\d{2})(\\d{4})","$1 $2",["[2-46-9]"]],[,"(5\\d{3})(\\d{4})","$1 $2",["5"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MV":[,[,,"(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",,,,,,,[7,10]],[,,"(?:3(?:0[0-3]|3[0-59])|6(?:[57][02468]|6[024-68]|8[024689]))\\d{4}",,,,"6701234",,,[7]],[,,"(?:46[46]|(?:7[2-9]|9[14-9])\\d)\\d{4}",,,,"7712345",,,[7]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MV",960,"0(?:0|19)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1-$2",["[367]|4(?:00|[56])|9[14-9]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"4[05]0\\d{4}",,,,"4001234",,,[7]],,,[,,,,,,,,,[-1]]],"MW":[,[,,"1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}",,,,,,,[7,9]],[,,"(?:1[2-9]|21\\d\\d)\\d{5}",,,,"1234567"],[,,"(?:111|(?:77|88|99)\\d)\\d{6}",,,,"991234567",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"31\\d{7}",,,,"310123456",,,[9]],"MW",265,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[17-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MX":[,[,,"(?:1\\d|[2-9])\\d{9}",,,,,,,[10,11],[7,8]],[,,"(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-9]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",,,,"2221234567",,,[10],[7,8]],[,,"1(?:(?:33|55|81)\\d{8}|(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-9]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})",,,,"12221234567",,,[11]],[,,"8(?:00|88)\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,"300\\d{7}",,,,"3001234567",,,[10]],[,,"500\\d{7}",,,,"5001234567",,,[10]],[,,,,,,,,,[-1]],"MX",52,"0[09]","01",,,"0[12]|04[45](\\d{10})","1$1",,,[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","044 $2 $3 $4",["1(?:33|55|81)"],"$1",,1],[,"(1)(\\d{3})(\\d{3})(\\d{4})","044 $2 $3 $4",["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"],"$1",,1]],[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3 $4",["1(?:33|55|81)"]],[,"(1)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MY":[,[,,"(?:1\\d\\d?|3\\d|[4-9])\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"(?:3(?:2[0-36-9]|3[0-368]|4[0-278]|5[0-24-8]|6[0-467]|7[1246-9]|8\\d|9[0-57])\\d|4(?:2[0-689]|[3-79]\\d|8[1-35689])|5(?:2[0-589]|[346]\\d|5[0-489]|7[1-9]|8[0-567-9]|9[23])|6(?:2[2-9]|3[135789]|[46]\\d|5[0-6]|7[0-35-9]|85|9[015-8])|7(?:[2579]\\d|3[03-68]|4[0-8]|8[0-35-9]|6[5-9])|8(?:[24][2-8]|3[2-5]|5[2-7]|6[2-589]|7[2-578]|[89][2-9])|9(?:0[57]|13|[25-7]\\d|[3489][0-8]))\\d{5}",,,,"323856789",,,[8,9],[6,7]],[,,"1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])\\d|1(?:[1-5]\\d{2}|6(?:0[5-9]|[1-9]\\d))\\d|[23679][2-9]\\d{2}|4(?:[235-9]\\d{2}|400)|59\\d{3}|8(?:1[23]\\d|[236]\\d{2}|4(?:[06]\\d|7[0-4])|5[7-9]\\d|7[016-9]\\d|8(?:[01]\\d|[27][0-4])|9[0-8]\\d))\\d{4}",,,,"123456789",,,[9,10]],[,,"1[378]00\\d{6}",,,,"1300123456",,,[10]],[,,"1600\\d{6}",,,,"1600123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"154(?:6(?:0\\d|1[0-3])|8(?:[25]1|4[0189]|7[0-4679]))\\d{4}",,,,"1546012345",,,[10]],"MY",60,"00","0",,,"0",,,,[[,"([4-79])(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],[,"(3)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],[,"([18]\\d)(\\d{3})(\\d{3,4})","$1-$2 $3",["1[02-46-9][1-9]|8"],"0$1"],[,"(1)([36-8]00)(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]0","1[36-8]00"]],[,"(11)(\\d{4})(\\d{4})","$1-$2 $3",["11"],"0$1"],[,"(15[49])(\\d{3})(\\d{4})","$1-$2 $3",["15[49]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"MZ":[,[,,"(?:2|8\\d)\\d{7}",,,,,,,[8,9]],[,,"2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}",,,,"21123456",,,[8]],[,,"8[2-7]\\d{7}",,,,"821234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MZ",258,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-7]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NA":[,[,,"[68]\\d{7,8}",,,,,,,[8,9]],[,,"6(?:1(?:[02-4]\\d\\d|17)|2(?:17|54\\d|69|70)|3(?:17|2[0237]\\d|34|6[289]|7[01]|81)|4(?:17|(?:27|41|5[25])\\d|69|7[01])|5(?:17|2[236-8]\\d|69|7[01])|6(?:17|26\\d|38|42|69|7[01])|7(?:17|(?:2[2-4]|30)\\d|6[89]|7[01]))\\d{4}|6(?:1(?:2[2-7]|3[01378]|4[0-4]|69|7[014])|25[0-46-8]|32\\d|4(?:2[0-27]|4[016]|5[0-357])|52[02-9]|62[56]|7(?:2[2-69]|3[013]))\\d{4}",,,,"61221234"],[,,"(?:60|8[1245])\\d{7}",,,,"811234567",,,[9]],[,,"80\\d{7}",,,,"800123456",,,[9]],[,,"8701\\d{5}",,,,"870123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8(?:3\\d\\d|86)\\d{5}",,,,"88612345"],"NA",264,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8[0-5]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NC":[,[,,"[2-57-9]\\d{5}",,,,,,,[6]],[,,"(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}",,,,"201234"],[,,"(?:5[0-4]|[79]\\d|8[0-79])\\d{4}",,,,"751234"],[,,,,,,,,,[-1]],[,,"36\\d{4}",,,,"366711"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NC",687,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[247-9]|3[0-6]|5[0-4]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NE":[,[,,"[0289]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",,,,"20201234"],[,,"(?:8[04589]|9\\d)\\d{6}",,,,"93123456"],[,,"08\\d{6}",,,,"08123456"],[,,"09\\d{6}",,,,"09123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NE",227,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["09|[289]"]],[,"(08)(\\d{3})(\\d{3})","$1 $2 $3",["08"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NF":[,[,,"[13]\\d{5}",,,,,,,[6],[5]],[,,"(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}",,,,"106609",,,,[5]],[,,"3[58]\\d{4}",,,,"381234",,,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NF",672,"00",,,,,,,,[[,"(\\d{2})(\\d{4})","$1 $2",["1"]],[,"(\\d)(\\d{5})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NG":[,[,,"[78]\\d{10,13}|[7-9]\\d{9}|[1-9]\\d{7}|[124-7]\\d{6}",,,,,,,[7,8,10,11,12,13,14],[5,6]],[,,"[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}",,,,"18040123",,,[7,8],[5,6]],[,,"(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70(?:[1-689]\\d|7[0-3])|8(?:0(?:1[01]|[2-9]\\d)|1(?:[0-8]\\d|9[01]))|90[235-9]\\d)\\d{6}",,,,"8021234567",,,[8,10]],[,,"800\\d{7,11}",,,,"80017591759",,,[10,11,12,13,14]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NG",234,"009","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-6]|7(?:0[1-9]|[1-79])|8[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["70|8[01]|90[235-9]"],"0$1"],[,"([78]00)(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]00"],"0$1"],[,"([78]00)(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]00"],"0$1"],[,"(78)(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"700\\d{7,11}",,,,"7001234567",,,[10,11,12,13,14]],,,[,,,,,,,,,[-1]]],"NI":[,[,,"(?:1800|[25-8]\\d{3})\\d{4}",,,,,,,[8]],[,,"2\\d{7}",,,,"21234567"],[,,"(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}",,,,"81234567"],[,,"1800\\d{4}",,,,"18001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NI",505,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NL":[,[,,"(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8])|[89]\\d{0,3})\\d{6}|1\\d{4,5}",,,,,,,[5,6,7,8,9,10]],[,,"(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d\\d)\\d{6}",,,,"101234567",,,[9]],[,,"6[1-58]\\d{7}",,,,"612345678",,,[9]],[,,"800\\d{4,7}",,,,"8001234",,,[7,8,9,10]],[,,"90[069]\\d{4,7}",,,,"9061234",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:85|91)\\d{7}",,,,"851234567",,,[9]],"NL",31,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,4})","$1 $2",["14"]],[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|[7-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-5]"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6[1-58]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["6"],"0$1"]],[[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|[7-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-5]"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6[1-58]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["6"],"0$1"]],[,,"66\\d{7}",,,,"662345678",,,[9]],,,[,,"140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])",,,,,,,[5,6]],[,,"140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])|8[478]\\d{7}",,,,"14020",,,[5,6,9]],,,[,,,,,,,,,[-1]]],"NO":[,[,,"(?:0|[2-9]\\d{3})\\d{4}",,,,,,,[5,8]],[,,"(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}",,,,"21234567",,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"40612345",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"NO",47,"00",,,,,,,,[[,"([489]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],[,"([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",,,,"01234"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],"NP":[,[,,"9\\d{9}|[1-9]\\d{7}",,,,,,,[8,10],[6,7]],[,,"(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}",,,,"14567890",,,[8],[6,7]],[,,"9(?:6[0-3]|7[245]|8[0-24-68])\\d{7}",,,,"9841234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NP",977,"00","0",,,"0",,,,[[,"(1)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-69]|7[15-9])"],"0$1"],[,"(9\\d{2})(\\d{7})","$1-$2",["9(?:6[013]|7[245]|8)"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NR":[,[,,"(?:444|55\\d|888)\\d{4}",,,,,,,[7]],[,,"(?:444|888)\\d{4}",,,,"4441234"],[,,"55[4-9]\\d{4}",,,,"5551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NR",674,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[458]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NU":[,[,,"(?:[47]|888\\d)\\d{3}",,,,,,,[4,7]],[,,"[47]\\d{3}",,,,"7012",,,[4]],[,,"888[4-9]\\d{3}",,,,"8884012",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NU",683,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"NZ":[,[,,"[28]\\d{7,9}|[346]\\d{7}|(?:508|[79]\\d)\\d{6,7}",,,,,,,[8,9,10],[7]],[,,"(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}",,,,"32345678",,,[8],[7]],[,,"2(?:[028]\\d{7,8}|1\\d{6,8}|[79]\\d{7})",,,,"211234567"],[,,"508\\d{6,7}|80\\d{6,8}",,,,"800123456"],[,,"90\\d{6,7}",,,,"900123456",,,[8,9]],[,,,,,,,,,[-1]],[,,"70\\d{7}",,,,"701234567",,,[9]],[,,,,,,,,,[-1]],"NZ",64,"0(?:0|161)","0",,,"0",,"00",,[[,"(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["240|[346]|7[2-57-9]|9[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:1[1-9]|[69]|7[0-35-9])|70|86"],"0$1"],[,"(2\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["2[028]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["90"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|5|[89]0"],"0$1"]],,[,,"[28]6\\d{6,7}",,,,"26123456",,,[8,9]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"OM":[,[,,"(?:[279]\\d{3}|500|8007\\d?)\\d{4}",,,,,,,[7,8,9]],[,,"2[2-6]\\d{6}",,,,"23123456",,,[8]],[,,"(?:7(?:[19]\\d|22)|9(?:0[1-9]|[1-9]\\d))\\d{5}",,,,"92123456",,,[8]],[,,"(?:500|8007\\d?)\\d{4}",,,,"80071234"],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"OM",968,"00",,,,,,,,[[,"(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],[,"(\\d{2})(\\d{6})","$1 $2",["2"]],[,"(\\d{4})(\\d{4})","$1 $2",["[79]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PA":[,[,,"(?:[1-57-9]|6\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:1(?:0\\d|1[479]|2[37]|3[0137]|4[17]|5[05]|[68][58]|7[0167]|9[39])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[026-9])|3(?:[089]\\d|1[014-7]|2[0-35]|33|4[0-579]|55|6[068]|7[06-8])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[05]|7[0-24-9]|8[7-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}",,,,"2001234",,,[7]],[,,"(?:1[16]1|21[89]|6(?:[02-9]\\d|1[0-5])\\d|8(?:1[01]|7[23]))\\d{4}",,,,"61234567"],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}",,,,"8601234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PA",507,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["6"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PE":[,[,,"(?:[14-8]|9\\d)\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}",,,,"11234567",,,[8],[6,7]],[,,"9\\d{8}",,,,"912345678",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"805\\d{5}",,,,"80512345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,"80[24]\\d{5}",,,,"80212345",,,[8]],[,,,,,,,,,[-1]],"PE",51,"19(?:1[124]|77|90)00","0"," Anexo ",,"0",,,,[[,"(1)(\\d{7})","$1 $2",["1"],"(0$1)"],[,"([4-8]\\d)(\\d{6})","$1 $2",["[4-7]|8[2-4]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PF":[,[,,"[48]\\d{7}|4\\d{5}",,,,,,,[6,8]],[,,"4(?:[09][45689]\\d|4)\\d{4}",,,,"40412345"],[,,"8[79]\\d{6}",,,,"87123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PF",689,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[09]|8[79]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]]],,[,,,,,,,,,[-1]],,,[,,"44\\d{4}",,,,,,,[6]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PG":[,[,,"(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",,,,,,,[7,8]],[,,"(?:3[0-2]\\d|4[257]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}",,,,"3123456",,,[7]],[,,"(?:7(?:[0-689]\\d|75)|81\\d)\\d{5}",,,,"70123456",,,[8]],[,,"180\\d{4}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"2(?:0[0-47]|7[568])\\d{4}",,,,"2751234",,,[7]],"PG",675,"140[1-3]|00",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[13-689]|27"]],[,"(\\d{4})(\\d{4})","$1 $2",["20|[78]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PH":[,[,,"(?:1800\\d{2,4}|2|[89]\\d{4})\\d{5}|[3-8]\\d{8}|[28]\\d{7}",,,,,,,[6,8,9,10,11,12,13],[5,7]],[,,"2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})",,,,"21234567",,,[6,8,9,10],[5,7]],[,,"(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[235-9]|5[056]|6[5-7]|7[34-79]|89|9[4-9]))\\d{7}",,,,"9051234567",,,[10]],[,,"1800\\d{7,9}",,,,"180012345678",,,[11,12,13]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PH",63,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],[,"(2)(\\d{5})","$1 $2",["2"],"(0$1)"],[,"(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],[,"(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],[,"([3-8]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[3-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["81|9"],"0$1"],[,"(1800)(\\d{3})(\\d{4})","$1 $2 $3",["180","1800"]],[,"(1800)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["180","1800"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PK":[,[,,"(?:122|[24-8]\\d{4,5}|9(?:[013-9]\\d{2,4}|2(?:[01]\\d\\d|2(?:[025-8]\\d|1[01]))\\d))\\d{6}|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",,,,,,,[8,9,10,11,12],[6,7]],[,,"(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}",,,,"2123456789",,,[9,10],[6,7,8]],[,,"3(?:[014]\\d|2[0-5]|3[0-7]|55|64)\\d{7}",,,,"3012345678",,,[10]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,"122\\d{6}",,,,"122044444",,,[9]],[,,,,,,,,,[-1]],"PK",92,"00","0",,,"0",,,,[[,"([89]00)(\\d{3})(\\d{2})","$1 $2 $3",["[89]00"],"0$1"],[,"(1\\d{3})(\\d{5})","$1 $2",["1"],"$1"],[,"(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],[,"(\\d{3})(\\d{6,7})","$1 $2",["2[349]|45|54|60|72|8[2-5]|9[2-469]","(?:2[349]|45|54|60|72|8[2-5]|9[2-469])\\d[2-9]"],"(0$1)"],[,"(58\\d{3})(\\d{5})","$1 $2",["58[126]"],"(0$1)"],[,"(3\\d{2})(\\d{7})","$1 $2",["3"],"0$1"],[,"(\\d{2})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"],"(0$1)"],[,"(\\d{3})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[349]|45|54|60|72|8[2-5]|9[2-9]","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}",,,,"21111825888",,,[11,12]],,,[,,,,,,,,,[-1]]],"PL":[,[,,"[1-9]\\d{6}(?:\\d{2})?|6\\d{5}(?:\\d{2})?",,,,,,,[6,7,8,9]],[,,"(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:\\d{7}|19\\d{3})",,,,"123456789",,,[7,9]],[,,"(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}",,,,"512345678",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"70[01346-8]\\d{6}",,,,"701234567",,,[9]],[,,"801\\d{6}",,,,"801234567",,,[9]],[,,,,,,,,,[-1]],[,,"39\\d{7}",,,,"391234567",,,[9]],"PL",48,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["11[68]|64"]],[,"(\\d{5})","$1",["19"]],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["26|39|45|5[0137]|6[0469]|7[02389]|8[08]"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]]],,[,,"64\\d{4,7}",,,,"641234567"],,,[,,,,,,,,,[-1]],[,,"804\\d{6}",,,,"804123456",,,[9]],,,[,,,,,,,,,[-1]]],"PM":[,[,,"[45]\\d{5}",,,,,,,[6]],[,,"(?:4[1-3]|50)\\d{4}",,,,"430123"],[,,"(?:4[02-4]|5[05])\\d{4}",,,,"551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PM",508,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PR":[,[,,"(?:[589]\\d\\d|787)\\d{7}",,,,,,,[10],[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"PR",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"787|939",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PS":[,[,,"(?:(?:1\\d|5)\\d\\d|[2489]2)\\d{6}",,,,,,,[8,9,10],[7]],[,,"(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}",,,,"22234567",,,[8],[7]],[,,"5[69]\\d{7}",,,,"599123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,,,,,,,,[-1]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PS",970,"00","0",,,"0",,,,[[,"([2489])(2\\d{2})(\\d{4})","$1 $2 $3",["[2489]2"],"0$1"],[,"(5[69]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["5[69]"],"0$1"],[,"(1[78]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[78]0","1[78]00"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PT":[,[,,"(?:[26-9]\\d|30)\\d{7}",,,,,,,[9]],[,,"2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}",,,,"212345678"],[,,"9(?:[1-36]\\d\\d|480)\\d{5}",,,,"912345678"],[,,"80[02]\\d{6}",,,,"800123456"],[,,"(?:6(?:0[178]|4[68])\\d|76(?:0[1-57]|1[2-47]|2[237]))\\d{5}",,,,"760123456"],[,,"80(?:8\\d|9[1579])\\d{5}",,,,"808123456"],[,,"884[0-4689]\\d{5}",,,,"884123456"],[,,"30\\d{7}",,,,"301234567"],"PT",351,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70(?:7\\d|8[17])\\d{5}",,,,"707123456"],,,[,,"600\\d{6}",,,,"600110000"]],"PW":[,[,,"(?:[25-8]\\d\\d|345|488|900)\\d{4}",,,,,,,[7]],[,,"(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}",,,,"2771234"],[,,"(?:6[2-4689]0|77\\d|88[0-4])\\d{4}",,,,"6201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PW",680,"01[12]",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"PY":[,[,,"(?:[2-46-9]\\d|5[0-8])\\d{7}|[2-9]\\d{5,7}",,,,,,,[6,7,8,9],[5]],[,,"(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}",,,,"212345678",,,[7,8,9],[5,6]],[,,"9(?:51|6[129]|[78][1-6]|9[1-5])\\d{6}",,,,"961456789",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8700[0-4]\\d{4}",,,,"870012345",,,[9]],"PY",595,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["9[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["870","8700"]],[,"(\\d{3})(\\d{4,5})","$1 $2",["[2-8][1-9]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8][1-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[2-9]0\\d{4,7}",,,,"201234567"],,,[,,,,,,,,,[-1]]],"QA":[,[,,"(?:(?:2|[3-7]\\d)\\d\\d|800)\\d{4}",,,,,,,[7,8]],[,,"4[04]\\d{6}",,,,"44123456",,,[8]],[,,"[35-7]\\d{7}",,,,"33123456",,,[8]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"QA",974,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["2[126]|8"]],[,"(\\d{4})(\\d{4})","$1 $2",["[3-7]"]]],,[,,"2(?:[12]\\d|61)\\d{4}",,,,"2123456",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"RE":[,[,,"(?:26|[68]\\d)\\d{7}",,,,,,,[9]],[,,"262\\d{6}",,,,"262161234"],[,,"69(?:2\\d\\d|3(?:0[0-46]|1[013]|2[0-2]|3[0-39]|4\\d|5[05]|6[0-26]|7[0-27]|8[0-38]|9[0-479]))\\d{4}",,,,"692123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89[1-37-9]\\d{6}",,,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RE",262,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[268]"],"0$1"]],,[,,,,,,,,,[-1]],1,"262|69|8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"RO":[,[,,"(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}",,,,,,,[6,9]],[,,"[23][13-6]\\d{7}|(?:2(?:19\\d|[3-6]\\d9)|31\\d\\d)\\d\\d",,,,"211234567"],[,,"7(?:(?:[02-7]\\d|8[03-8]|99)\\d|1(?:[01]\\d|20))\\d{5}",,,,"712034567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[036]\\d{6}",,,,"900123456",,,[9]],[,,"801\\d{6}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RO",40,"00","0"," int ",,"0",,,,[[,"(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],[,"(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[237-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"37\\d{7}",,,,"372123456",,,[9]],,,[,,,,,,,,,[-1]]],"RS":[,[,,"[127]\\d{6,11}|3(?:[0-79]\\d{5,10}|8(?:[02-9]\\d{4,9}|1\\d{4,5}))|6\\d{7,9}|800\\d{3,9}|90\\d{4,8}|7\\d{5}",,,,,,,[6,7,8,9,10,11,12],[5]],[,,"(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}",,,,"10234567",,,[7,8,9,10,11,12],[5,6]],[,,"6(?:[0-689]|7\\d)\\d{6,7}",,,,"601234567",,,[8,9,10]],[,,"800\\d{3,9}",,,,"80012345"],[,,"(?:90[0169]|78\\d)\\d{3,7}",,,,"90012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RS",381,"00","0",,,"0",,,,[[,"([23]\\d{2})(\\d{4,9})","$1 $2",["(?:2[389]|39)0"],"0$1"],[,"([1-3]\\d)(\\d{5,10})","$1 $2",["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"],"0$1"],[,"(6\\d)(\\d{6,8})","$1 $2",["6"],"0$1"],[,"([89]\\d{2})(\\d{3,9})","$1 $2",["[89]"],"0$1"],[,"(7[26])(\\d{4,9})","$1 $2",["7[26]"],"0$1"],[,"(7[08]\\d)(\\d{4,9})","$1 $2",["7[08]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7[06]\\d{4,10}",,,,"700123456"],,,[,,,,,,,,,[-1]]],"RU":[,[,,"[347-9]\\d{9}",,,,,,,[10]],[,,"(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",,,,"3011234567"],[,,"9\\d{9}",,,,"9123456789"],[,,"80[04]\\d{7}",,,,"8001234567"],[,,"80[39]\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567"],[,,,,,,,,,[-1]],"RU",7,"810","8",,,"8",,"8~10",,[[,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3",["[1-79]"],"$1",,1],[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"RW":[,[,,"(?:06|[27]\\d\\d|[89]00)\\d{6}",,,,,,,[8,9]],[,,"(?:06|2[258]\\d)\\d{6}",,,,"250123456"],[,,"7[238]\\d{7}",,,,"720123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900\\d{6}",,,,"900123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RW",250,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SA":[,[,,"(?:(?:[15]|8\\d)\\d|92)\\d{7}",,,,,,,[9,10],[7]],[,,"1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}",,,,"112345678",,,[9],[7]],[,,"5(?:[013-689]\\d|7[0-36-8])\\d{6}",,,,"512345678",,,[9]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"925\\d{6}",,,,"925012345",,,[9]],[,,"920\\d{6}",,,,"920012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SA",966,"00","0",,,"0",,,,[[,"(1\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[1-467]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(92\\d{2})(\\d{5})","$1 $2",["92"],"$1"],[,"(800)(\\d{3})(\\d{4})","$1 $2 $3",["800"],"$1"],[,"(811)(\\d{3})(\\d{3,4})","$1 $2 $3",["811"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"811\\d{7}",,,,"8110123456"],,,[,,,,,,,,,[-1]]],"SB":[,[,,"(?:[1-6]|[7-9]\\d\\d)\\d{4}",,,,,,,[5,7]],[,,"(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}",,,,"40123",,,[5]],[,,"(?:48|(?:(?:7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d)\\d{3}",,,,"7421234"],[,,"1[38]\\d{3}",,,,"18123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[12]\\d{3}",,,,"51123",,,[5]],"SB",677,"0[01]",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["7[1-9]|8[4-9]|9(?:1[2-9]|2[013-9]|3[0-2]|[46]|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SC":[,[,,"(?:(?:(?:[24]\\d|64)\\d|971)\\d|8000)\\d{3}",,,,,,,[7]],[,,"4[2-46]\\d{5}",,,,"4217123"],[,,"2[5-8]\\d{5}",,,,"2510123"],[,,"8000\\d{3}",,,,"8000000"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:64\\d|971)\\d{4}",,,,"6412345"],"SC",248,"0(?:[02]|10?)",,,,,,"00",,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SD":[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1(?:5\\d|8[3567])\\d{6}",,,,"151231234"],[,,"(?:1[0-2]|9[0-3569])\\d{7}",,,,"911231234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SD",249,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SE":[,[,,"(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|[27]\\d{5}",,,,,,,[6,7,8,9,10,12]],[,,"1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:[0246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:[03]\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8\\d{6,8}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})",,,,"8123456",,,[7,8,9]],[,,"7[02369]\\d{7}",,,,"701234567",,,[9]],[,,"20\\d{4,7}",,,,"20123456",,,[6,7,8,9]],[,,"649\\d{6}|9(?:00|39|44)[1-8]\\d{3,6}",,,,"9001234567",,,[7,8,9,10]],[,,"77(?:0\\d{3}(?:\\d{3})?|[1-7]\\d{6})",,,,"771234567",,,[6,9]],[,,"75[1-8]\\d{6}",,,,"751234567",,,[9]],[,,,,,,,,,[-1]],"SE",46,"00","0",,,"0",,,,[[,"([1-469]\\d)(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1"],[,"(9[034]\\d)(\\d{4})","$1-$2",["9(?:00|39|44)"],"0$1"],[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["7"],"0$1"],[,"(77)(\\d{2})(\\d{2})","$1-$2$3",["77"],"0$1"],[,"(20)(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1"],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9[034]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["25[245]|67[3-68]"],"0$1"]],[[,"([1-469]\\d)(\\d{3})(\\d{2})","$1 $2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"]],[,"(9[034]\\d)(\\d{4})","$1 $2",["9(?:00|39|44)"]],[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1 $2 $3 $4",["8"]],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1 $2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7"]],[,"(77)(\\d{2})(\\d{2})","$1 $2 $3",["77"]],[,"(20)(\\d{2,3})(\\d{2})","$1 $2 $3",["20"]],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["9[034]"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["25[245]|67[3-68]"]]],[,,"74[02-9]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"(?:25[245]|67[3-68])\\d{9}",,,,"254123456789",,,[12]]],"SG":[,[,,"(?:1\\d{3}|[369]|7000|8(?:\\d{2})?)\\d{7}",,,,,,,[8,10,11]],[,,"6[1-9]\\d{6}",,,,"61234567",,,[8]],[,,"(?:8[1-8]|9[0-8])\\d{6}",,,,"81234567",,,[8]],[,,"(?:18|8)00\\d{7}",,,,"18001234567",,,[10,11]],[,,"1900\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[12]\\d{6}",,,,"31234567",,,[8]],"SG",65,"0[0-3]\\d",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[369]|8[1-8]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1[89]"]],[,"(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["70"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7000\\d{7}",,,,"70001234567",,,[11]],,,[,,,,,,,,,[-1]]],"SH":[,[,,"(?:[256]\\d|8)\\d{3}",,,,,,,[4,5]],[,,"2(?:[0-57-9]\\d|6[4-9])\\d\\d",,,,"22158"],[,,"[56]\\d{4}",,,,"51234",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"262\\d\\d",,,,"26212",,,[5]],"SH",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],1,"[256]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SI":[,[,,"[1-8]\\d{7}|90\\d{4,6}|8\\d{4,6}",,,,,,,[5,6,7,8]],[,,"(?:1\\d|[25][2-8]|3[24-8]|4[24-8]|7[3-8])\\d{6}",,,,"11234567",,,[8],[7]],[,,"(?:[37][01]\\d|4[0139]\\d|51\\d|6(?:[48]\\d|5[15-7]|9[69]))\\d{5}",,,,"31234567",,,[8]],[,,"80\\d{4,6}",,,,"80123456",,,[6,7,8]],[,,"90\\d{4,6}|89[1-3]\\d{2,5}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:59|8[1-3])\\d{6}",,,,"59012345",,,[8]],"SI",386,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|[34][24-8]|5[2-8]|7[3-8]"],"(0$1)"],[,"([3-7]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],[,"([89][09])(\\d{3,6})","$1 $2",["[89][09]"],"0$1"],[,"([58]\\d{2})(\\d{5})","$1 $2",["59|8[1-3]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SJ":[,[,,"(?:0|(?:[4589]\\d|79)\\d\\d)\\d{4}",,,,,,,[5,8]],[,,"79\\d{6}",,,,"79123456",,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"41234567",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"SJ",47,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",,,,"01234"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],"SK":[,[,,"[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",,,,,,,[6,7,9]],[,,"(?:2(?:16|[2-9]\\d{3})|[3-5][1-8]\\d{3})\\d{4}|(?:2|[3-5][1-8])1[67]\\d{3}|[3-5][1-8]16\\d\\d",,,,"221234567"],[,,"9(?:0(?:[1-8]\\d|9[1-9])|(?:1[0-24-9]|[45]\\d)\\d)\\d{5}",,,,"912123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:00|[78]\\d)\\d{6}",,,,"900123456",,,[9]],[,,"8[5-9]\\d{7}",,,,"850123456",,,[9]],[,,,,,,,,,[-1]],[,,"6(?:02|5[0-4]|9[0-6])\\d{6}",,,,"690123456",,,[9]],"SK",421,"00","0",,,"0",,,,[[,"(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],[,"(\\d{4})(\\d{3})","$1 $2",["909","9090"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"]],,[,,"9090\\d{3}",,,,"9090123",,,[7]],,,[,,"(?:(?:602|8(?:00|[5-9]\\d))\\d{3}|9(?:0(?:0\\d{3}|90)|[78]\\d{4}))\\d{3}",,,,,,,[7,9]],[,,"96\\d{7}",,,,"961234567",,,[9]],,,[,,,,,,,,,[-1]]],"SL":[,[,,"(?:[2-578]\\d|66|99)\\d{6}",,,,,,,[8],[6]],[,,"[235]2[2-4][2-9]\\d{4}",,,,"22221234",,,,[6]],[,,"(?:2[15]|3[013-5]|4[04]|5[05]|66|7[5-9]|8[08]|99)\\d{6}",,,,"25123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SL",232,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",,"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SM":[,[,,"(?:0549|[5-7]\\d)\\d{6}",,,,,,,[8,10],[6]],[,,"0549(?:8[0157-9]|9\\d)\\d{4}",,,,"0549886377",,,[10],[6]],[,,"6[16]\\d{6}",,,,"66661212",,,[8]],[,,,,,,,,,[-1]],[,,"7[178]\\d{6}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[158]\\d{6}",,,,"58001110",,,[8]],"SM",378,"00",,,,"([89]\\d{5})","0549$1",,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","$1 $2",["054","0549"]],[,"(\\d{6})","0549 $1",["[89]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","($1) $2",["054","0549"]],[,"(\\d{6})","(0549) $1",["[89]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SN":[,[,,"(?:[378]\\d{4}|93330)\\d{4}",,,,,,,[9]],[,,"3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}",,,,"301012345"],[,,"7(?:[06-8]\\d|21|90)\\d{6}",,,,"701234567"],[,,"800\\d{6}",,,,"800123456"],[,,"88[4689]\\d{6}",,,,"884123456"],[,,"81[02468]\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"(?:3(?:392|9[01]\\d)\\d|93330)\\d{4}",,,,"933301234"],"SN",221,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SO":[,[,,"[346-9]\\d{8}|[12679]\\d{7}|(?:[1-4]\\d|59)\\d{5}|[1348]\\d{5}",,,,,,,[6,7,8,9]],[,,"(?:1\\d{1,2}|2[0-79]\\d|3[0-46-8]?\\d|4[0-7]?\\d|59\\d|8[125])\\d{4}",,,,"4012345",,,[6,7]],[,,"(?:15\\d|2(?:4\\d|8)|3[59]\\d{2}|4[89]\\d{2}|6[1-9]?\\d{2}|7(?:[1-8]\\d|9\\d{1,2})|8[08]\\d{2}|9(?:0[67]|[2-9])\\d)\\d{5}",,,,"71123456",,,[7,8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SO",252,"00","0",,,"0",,,,[[,"(\\d{6})","$1",["[134]"]],[,"(\\d)(\\d{6})","$1 $2",["[13-5]|2[0-79]"]],[,"(\\d)(\\d{7})","$1 $2",["24|[67]"]],[,"(\\d{2})(\\d{4})","$1 $2",["8[125]"]],[,"(\\d{2})(\\d{5,7})","$1 $2",["15|28|6[1-35-9]|799|9[2-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3[59]|4[89]|6[24-6]|79|8[08]|90"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SR":[,[,,"(?:[2-5]|68|[78]\\d)\\d{5}",,,,,,,[6,7]],[,,"(?:2[1-3]|3[0-7]|(?:4|68)\\d|5[2-58])\\d{4}",,,,"211234"],[,,"(?:7[124-7]|8[125-9])\\d{5}",,,,"7412345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"56\\d{4}",,,,"561234",,,[6]],"SR",597,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-4]|5[2-58]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["5"]],[,"(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SS":[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"18\\d{7}",,,,"181234567"],[,,"(?:12|9[1257])\\d{7}",,,,"977123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SS",211,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ST":[,[,,"(?:22|9\\d)\\d{5}",,,,,,,[7]],[,,"22\\d{5}",,,,"2221234"],[,,"9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d\\d)\\d{3}",,,,"9812345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ST",239,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SV":[,[,,"[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?",,,,,,,[7,8,11]],[,,"2[1-6]\\d{6}",,,,"21234567",,,[8]],[,,"[67]\\d{7}",,,,"70123456",,,[8]],[,,"800\\d{4}(?:\\d{4})?",,,,"8001234",,,[7,11]],[,,"900\\d{4}(?:\\d{4})?",,,,"9001234",,,[7,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SV",503,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[89]"]],[,"(\\d{4})(\\d{4})","$1 $2",["[267]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SX":[,[,,"(?:(?:[58]\\d\\d|900)\\d|7215)\\d{6}",,,,,,,[10],[7]],[,,"7215(?:4[2-8]|8[239]|9[056])\\d{4}",,,,"7215425678",,,,[7]],[,,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",,,,"7215205678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"SX",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"721",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SY":[,[,,"[1-39]\\d{8}|[1-5]\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}",,,,"112345678",,,,[6,7]],[,,"9(?:22|[3-589]\\d|6[024-9])\\d{6}",,,,"944567890",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SY",963,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",,1],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"SZ":[,[,,"(?:0800|(?:[237]\\d|900)\\d\\d)\\d{4}",,,,,,,[8,9]],[,,"[23][2-5]\\d{6}",,,,"22171234",,,[8]],[,,"7[6-9]\\d{6}",,,,"76123456",,,[8]],[,,"0800\\d{4}",,,,"08001234",,,[8]],[,,"900\\d{6}",,,,"900012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70\\d{6}",,,,"70012345",,,[8]],"SZ",268,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[0237]"]],[,"(\\d{5})(\\d{4})","$1 $2",["9"]]],,[,,,,,,,,,[-1]],,,[,,"0800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TA":[,[,,"8\\d{3}",,,,,,,[4]],[,,"8\\d{3}",,,,"8999"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TA",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TC":[,[,,"(?:[58]\\d\\d|649|900)\\d{7}",,,,,,,[10],[7]],[,,"649(?:712|9(?:4\\d|50))\\d{4}",,,,"6497121234",,,,[7]],[,,"649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-8])|4[34][1-3])\\d{4}",,,,"6492311234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"64971[01]\\d{4}",,,,"6497101234",,,,[7]],"TC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"649",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TD":[,[,,"(?:22|[69]\\d|77)\\d{6}",,,,,,,[8]],[,,"22(?:[37-9]0|5[0-5]|6[89])\\d{4}",,,,"22501234"],[,,"(?:6[023568]|77|9\\d)\\d{6}",,,,"63012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TD",235,"00|16",,,,,,"00",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2679]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TG":[,[,,"[279]\\d{7}",,,,,,,[8]],[,,"2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}",,,,"22212345"],[,,"(?:7[09]|9[0-36-9])\\d{6}",,,,"90112345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TG",228,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TH":[,[,,"(?:1\\d\\d?|[2-57]|[689]\\d)\\d{7}",,,,,,,[8,9,10]],[,,"(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}",,,,"21234567",,,[8]],[,,"(?:14|6[1-6]|[89]\\d)\\d{7}",,,,"812345678",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"1900\\d{6}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"6[08]\\d{7}",,,,"601234567",,,[9]],"TH",66,"00[1-9]","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["14|[3-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TJ":[,[,,"(?:[3-59]\\d|77|88)\\d{7}",,,,,,,[9],[3,5,7]],[,,"(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",,,,"372123456",,,,[3,5,7]],[,,"(?:41[18]|(?:5[05]|77|88|9[0-35-9])\\d)\\d{6}",,,,"917123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TJ",992,"810","8",,,"8",,"8~10",,[[,"([349]\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],,,1],[,"([457-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[148]|[578]|9(?:[0235-9]|1[59])"],,,1],[,"(331700)(\\d)(\\d{2})","$1 $2 $3",["331","3317","33170","331700"],,,1],[,"(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3[1-5]","3(?:[1245]|3(?:[02-9]|1[0-589]))"],,,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TK":[,[,,"[2-47]\\d{3,6}",,,,,,,[4,5,6,7]],[,,"(?:2[2-4]|[34]\\d)\\d{2,5}",,,,"3101"],[,,"7[2-4]\\d{2,5}",,,,"7290"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TK",690,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TL":[,[,,"(?:[2-4]\\d|7\\d\\d?|[89]0)\\d{5}",,,,,,,[7,8]],[,,"(?:2[1-5]|3[1-9]|4[1-4])\\d{5}",,,,"2112345",,,[7]],[,,"7[3-8]\\d{6}",,,,"77212345",,,[8]],[,,"80\\d{5}",,,,"8012345",,,[7]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,"70\\d{5}",,,,"7012345",,,[7]],[,,,,,,,,,[-1]],"TL",670,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],[,"(\\d{4})(\\d{4})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TM":[,[,,"[1-6]\\d{7}",,,,,,,[8]],[,,"(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}",,,,"12345678"],[,,"6[1-9]\\d{6}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TM",993,"810","8",,,"8",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],[,"(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TN":[,[,,"[2-57-9]\\d{7}",,,,,,,[8]],[,,"(?:(?:3[0-2]|7\\d)\\d{3}|81200)\\d{3}",,,,"30010123"],[,,"(?:(?:[259]\\d|4[0-6])\\d\\d|3(?:001|1(?:[1-35]\\d|40)|240|(?:6[0-4]|91)\\d))\\d{4}",,,,"20123456"],[,,"8010\\d{4}",,,,"80101234"],[,,"88\\d{6}",,,,"88123456"],[,,"8[12]10\\d{4}",,,,"81101234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TN",216,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TO":[,[,,"(?:(?:080|[56])0|[2-4]\\d|[78]\\d(?:\\d{2})?)\\d{3}",,,,,,,[5,7]],[,,"(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}",,,,"20123",,,[5]],[,,"(?:7[578]|8[46-9])\\d{5}",,,,"7715123",,,[7]],[,,"0800\\d{3}",,,,"0800222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TO",676,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1-$2",["[2-6]|7[014]|8[05]"]],[,"(\\d{3})(\\d{4})","$1 $2",["7[578]|8"]],[,"(\\d{4})(\\d{3})","$1 $2",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TR":[,[,,"(?:[2-58]\\d\\d|900)\\d{7}|4\\d{6}",,,,,,,[7,10]],[,,"(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}",,,,"2123456789",,,[10]],[,,"5(?:(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{2}|6161)\\d{5}",,,,"5012345678",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"(?:8[89]8|900)\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,"592(?:21[12]|461)\\d{4}",,,,"5922121234",,,[10]],[,,,,,,,,,[-1]],"TR",90,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4(?:[0-35-9]|4[0-35-9])"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[02-69]|1[06])"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["51|[89]"],"0$1",,1],[,"(444)(\\d{1})(\\d{3})","$1 $2 $3",["444"],,,1]],,[,,"512\\d{7}",,,,"5123456789",,,[10]],,,[,,"444\\d{4}",,,,,,,[7]],[,,"444\\d{4}|850\\d{7}",,,,"4441444"],,,[,,,,,,,,,[-1]]],"TT":[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"868(?:2(?:01|[23]\\d)|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",,,,"8682211234",,,,[7]],[,,"868(?:2(?:6[6-9]|[7-9]\\d)|[37](?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d))\\d{4}",,,,"8682911234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"TT",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"868",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"868619\\d{4}",,,,"8686191234",,,,[7]]],"TV":[,[,,"(?:2|7\\d\\d|90)\\d{4}",,,,,,,[5,6,7]],[,,"2[02-9]\\d{3}",,,,"20123",,,[5]],[,,"(?:7[01]\\d|90)\\d{4}",,,,"901234",,,[6,7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TV",688,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"TW":[,[,,"(?:[24589]|7\\d)\\d{8}|[2-8]\\d{7}|2\\d{6}",,,,,,,[7,8,9,10]],[,,"(?:2(?:[235-8]\\d{3}|4\\d{2,3})|3[2-9]\\d{2}|4(?:[239]\\d|[78])\\d{2}|5[2-8]\\d{2}|6[235-79]\\d{2}|7[1-9]\\d{2}|8(?:2(?:3\\d|66)|[7-9]\\d{2}))\\d{4}",,,,"221234567",,,[8,9]],[,,"9[0-8]\\d{7}",,,,"912345678",,,[9]],[,,"80[0-79]\\d{6}",,,,"800123456",,,[9]],[,,"20(?:2|[013-9]\\d{2})\\d{4}",,,,"203123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"99\\d{7}",,,,"990123456",,,[9]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"TW",886,"0(?:0[25679]|19)","0","#",,"0",,,,[[,"(20)(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],[,"([258]0)(\\d{3})(\\d{4})","$1 $2 $3",["20[013-9]|50[0-46-9]|80[0-79]"],"0$1"],[,"([2-8])(\\d{3,4})(\\d{4})","$1 $2 $3",["[25][2-8]|[346]|[78][1-9]"],"0$1"],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],[,"(70)(\\d{4})(\\d{4})","$1 $2 $3",["70"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"50[0-46-9]\\d{6}",,,,"500123456",,,[9]],,,[,,,,,,,,,[-1]]],"TZ":[,[,,"(?:[26-8]\\d|41|90)\\d{7}",,,,,,,[9]],[,,"2[2-8]\\d{7}",,,,"222345678"],[,,"(?:6[2-9]|7[13-9])\\d{7}",,,,"621234567"],[,,"80[08]\\d{6}",,,,"800123456"],[,,"90\\d{7}",,,,"900123456"],[,,"8(?:40|6[01])\\d{6}",,,,"840123456"],[,,,,,,,,,[-1]],[,,"41\\d{7}",,,,"412345678"],"TZ",255,"00[056]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:8(?:[04]0|6[01])|90\\d)\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"UA":[,[,,"[3-9]\\d{8}",,,,,,,[9],[5,6,7]],[,,"(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",,,,"311234567",,,,[5,6,7]],[,,"(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}",,,,"391234567"],[,,"800\\d{6}",,,,"800123456"],[,,"900[2-49]\\d{5}",,,,"900212345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"89[1-579]\\d{6}",,,,"891234567"],"UA",380,"00","0",,,"0",,"0~0",,[[,"([3-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[38]9|4(?:[45][0-5]|87)|5(?:0|[67][37])|6[36-8]|7|9[1-9]","[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|7|9[1-9]"],"0$1"],[,"([3-689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["(?:3[1-8]|4[136-8])2|5(?:[12457]2|6[24])|6(?:[12][29]|[49]2|5[24])|8[0-8]|90","3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[12][29]|[49]2|5[24])|8[0-8]|90"],"0$1"],[,"([3-6]\\d{3})(\\d{5})","$1 $2",["3(?:[1-46-8]|5[013-9])|4(?:[137][013-9]|[45][6-9]|6|8[4-6])|5(?:[1245][013-9]|3|6[0135689]|7[4-6])|6(?:[12][13-8]|[49][013-9]|5[0135-9])","3(?:[1-46-8](?:[013-9]|22)|5[013-9])|4(?:[137][013-9]|[45][6-9]|6(?:[013-9]|22)|8[4-6])|5(?:[1245][013-9]|3|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][13-8]|[49][013-9]|5[0135-9])"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"UG":[,[,,"(?:(?:[29]0|[347]\\d)\\d|800)\\d{6}",,,,,,,[9],[5,6,7]],[,,"20(?:[0147]\\d{3}|2(?:40|[5-9]\\d)\\d|3(?:0[0-4]|[2367]\\d)\\d|5[0-4]\\d{2}|6(?:00[0-2]|30[0-4]|[5-9]\\d{2})|8[0-2]\\d{2})\\d{3}|[34]\\d{8}",,,,"312345678",,,,[5,6,7]],[,,"7(?:[0157-9]\\d{2}|2(?:[03]\\d|60)|30\\d|4[0-4]\\d)\\d{5}",,,,"712345678"],[,,"800[123]\\d{5}",,,,"800123456"],[,,"90[123]\\d{6}",,,,"901123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UG",256,"00[057]","0",,,"0",,,,[[,"(\\d{3})(\\d{6})","$1 $2",["20[0-8]|4(?:6[45]|[7-9])|[7-9]","20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])|[7-9]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["3|4(?:[1-5]|6[0-36-9])"],"0$1"],[,"(2024)(\\d{5})","$1 $2",["202","2024"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"US":[,[,,"[2-9]\\d{9}",,,,,,,[10],[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",,,,"2015550123",,,,[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",,,,"2015550123",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"US",1,"011","1",,,"1",,,1,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"]],[,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],,,1]],[[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[2-9]"]]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,"710[2-9]\\d{6}",,,,"7102123456"],,,[,,,,,,,,,[-1]]],"UY":[,[,,"(?:[249]\\d\\d|80)\\d{5}|9\\d{6}",,,,,,,[7,8]],[,,"2\\d{7}|4[2-7]\\d{6}",,,,"21231234",,,[8],[7]],[,,"9[1-9]\\d{6}",,,,"94231234",,,[8]],[,,"80[05]\\d{4}",,,,"8001234",,,[7]],[,,"90[0-8]\\d{4}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UY",598,"0(?:1[3-9]\\d|0)","0"," int. ",,"0",,"00",,[[,"(\\d{4})(\\d{4})","$1 $2",["[24]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9[1-9]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["[89]0"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"UZ":[,[,,"[679]\\d{8}",,,,,,,[9],[7]],[,,"(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}",,,,"669050123",,,,[7]],[,,"6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UZ",998,"810","8",,,"8",,"8~10",,[[,"([679]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[679]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VA":[,[,,"0\\d{6}(?:\\d{4})?|3[0-8]\\d{9}|(?:[0138]\\d?|55)\\d{8}|[08]\\d{5}(?:\\d{2})?",,,,,,,[6,7,8,9,10,11]],[,,"06698\\d{1,6}",,,,"0669812345"],[,,"33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}",,,,"3123456789",,,[9,10,11]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:(?:0878|1(?:44|6[346])\\d)\\d\\d|89(?:2|(?:4[5-9]|(?:5[5-9]|9)\\d\\d)\\d))\\d{3}|89[45][0-4]\\d\\d",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"VA",39,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"06698",[,,"848\\d{6}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VC":[,[,,"(?:[58]\\d\\d|784|900)\\d{7}",,,,,,,[10],[7]],[,,"784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",,,,"7842661234",,,,[7]],[,,"784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4]))\\d{4}",,,,"7844301234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"784",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VE":[,[,,"(?:(?:[24]\\d|50)\\d|[89]00)\\d{7}",,,,,,,[10],[7]],[,,"(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}",,,,"2121234567",,,,[7]],[,,"4(?:1[24-8]|2[46])\\d{7}",,,,"4121234567"],[,,"800\\d{7}",,,,"8001234567"],[,,"900\\d{7}",,,,"9001234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VE",58,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{7})","$1-$2",,"0$1","$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VG":[,[,,"(?:284|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"284(?:(?:229|774|8(?:52|6[459]))\\d|4(?:22\\d|9(?:[45]\\d|6[0-5])))\\d{3}",,,,"2842291234",,,,[7]],[,,"284(?:(?:3(?:0[0-3]|4[0-7]|68|9[34])|54[0-57])\\d|4(?:(?:4[0-6]|68)\\d|9(?:6[6-9]|9\\d)))\\d{3}",,,,"2843001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VG",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"284",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VI":[,[,,"(?:(?:34|90)0|[58]\\d\\d)\\d{7}",,,,,,,[10],[7]],[,,"340(?:2(?:01|2[06-8]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"340(?:2(?:01|2[06-8]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VI",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"340",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"VN":[,[,,"[12]\\d{9}|[135-9]\\d{8}|(?:[16]\\d?|[78])\\d{6}",,,,,,,[7,8,9,10]],[,,"2(?:0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|8[2-7]|9[0-4679])\\d{7}",,,,"2101234567",,,[10]],[,,"(?:(?:1(?:2\\d|6[2-9]|8[68]|99)|3\\d|7[06-9])\\d|5(?:2[23]|[689]\\d)|8(?:[1-58]\\d|6[5689]|9[689])|9(?:[0-8]\\d|9[013-9]))\\d{6}",,,,"912345678",,,[9,10]],[,,"1800\\d{4,6}",,,,"1800123456",,,[8,9,10]],[,,"1900\\d{4,6}",,,,"1900123456",,,[8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:67|99)2\\d{6}",,,,"992012345",,,[9]],"VN",84,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[17]99"],"0$1",,1],[,"(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(\\d{3})(\\d{4,5})","$1 $2",["69"],"0$1",,1],[,"(\\d{4})(\\d{4,6})","$1 $2",["1[89]0"],,,1],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[69]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3578]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,"(?:[17]99|69\\d\\d?)\\d{4}",,,,,,,[7,8]],[,,"(?:[17]99|69\\d\\d?|80\\d)\\d{4}",,,,"1992000",,,[7,8]],,,[,,,,,,,,,[-1]]],"VU":[,[,,"(?:(?:[23]|[57]\\d\\d|900)\\d|[48]8)\\d{3}",,,,,,,[5,7]],[,,"(?:(?:2[02-9]|88)\\d|3(?:[5-7]\\d|8[0-8])|48[4-9])\\d\\d",,,,"22123",,,[5]],[,,"(?:5(?:[0-689]\\d|7[2-5])|7[013-7]\\d)\\d{4}",,,,"5912345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VU",678,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[579]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:3[03]|900\\d)\\d{3}",,,,"30123"],,,[,,,,,,,,,[-1]]],"WF":[,[,,"(?:[45]0|68|72|8\\d)\\d{4}",,,,,,,[6]],[,,"(?:50|68|72)\\d{4}",,,,"501234"],[,,"(?:50|68|72|8[23])\\d{4}",,,,"501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WF",681,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[4-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"[48]0\\d{4}",,,,"401234"]],"WS":[,[,,"(?:[2-6]|8\\d(?:\\d{4})?)\\d{4}|[78]\\d{6}",,,,,,,[5,6,7,10]],[,,"(?:[2-5]\\d|6[1-9])\\d{3}",,,,"22123",,,[5]],[,,"(?:7[25-7]|8(?:[3-7]|9\\d{3}))\\d{5}",,,,"7212345",,,[7,10]],[,,"800\\d{3}",,,,"800123",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WS",685,"0",,,,,,,,[[,"(\\d{5})","$1",["[2-6]"]],[,"(\\d{3})(\\d{3,7})","$1 $2",["8"]],[,"(\\d{2})(\\d{5})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"XK":[,[,,"(?:[23]\\d{2,3}|4\\d\\d|[89]00)\\d{5}",,,,,,,[8,9]],[,,"(?:2[89]|39)0\\d{6}|[23][89]\\d{6}",,,,"28012345"],[,,"4[3-79]\\d{6}",,,,"43201234",,,[8]],[,,"800\\d{5}",,,,"80001234",,,[8]],[,,"900\\d{5}",,,,"90001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"XK",383,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-4]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"YE":[,[,,"(?:1|7\\d)\\d{7}|[1-7]\\d{6}",,,,,,,[7,8,9],[6]],[,,"(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}",,,,"1234567",,,[7,8],[6]],[,,"7[0137]\\d{7}",,,,"712345678",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YE",967,"00","0",,,"0",,,,[[,"([1-7])(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7[0137]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"YT":[,[,,"(?:(?:26|63)9|80\\d)\\d{6}",,,,,,,[9]],[,,"269(?:0[67]|5[01]|6\\d|[78]0)\\d{4}",,,,"269601234"],[,,"639(?:0[0-79]|1[019]|[267]\\d|3[09]|[45]0|9[04-79])\\d{4}",,,,"639012345"],[,,"80\\d{7}",,,,"801234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YT",262,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"269|63",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ZA":[,[,,"[1-9]\\d{8}|8\\d{4,7}",,,,,,,[5,6,7,8,9]],[,,"(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}",,,,"101234567",,,[9]],[,,"(?:6\\d|7[0-46-9]|8[1-5])\\d{7}|8[1-4]\\d{3,6}",,,,"711234567"],[,,"80\\d{7}",,,,"801234567",,,[9]],[,,"(?:86[2-9]|9[0-2]\\d)\\d{6}",,,,"862345678",,,[9]],[,,"860\\d{6}",,,,"860123456",,,[9]],[,,,,,,,,,[-1]],[,,"87\\d{7}",,,,"871234567",,,[9]],"ZA",27,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"861\\d{6}",,,,"861123456",,,[9]],,,[,,,,,,,,,[-1]]],"ZM":[,[,,"(?:(?:21|9\\d)\\d|800)\\d{6}",,,,,,,[9],[6,7]],[,,"21[1-8]\\d{6}",,,,"211234567",,,,[6,7]],[,,"9[4-9]\\d{7}",,,,"955123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ZM",260,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})","$1 $2",,"$1"],[,"([1-8])(\\d{2})(\\d{4})","$1 $2 $3",["[1-8]"],"$1"],[,"([29]\\d)(\\d{7})","$1 $2",["[29]"],"0$1"],[,"(800)(\\d{3})(\\d{3})","$1 $2 $3",["800"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"ZW":[,[,,"2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",,,,,,,[5,6,7,8,9,10],[3,4]],[,,"(?:2(?:02[014]|[49]2\\d|[56]20|72[03])|3(?:123|92\\d)|5(?:42\\d|525)|6(?:[16-8]21|52[013])|8(?:[1349]28|523))\\d{5}|(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|37|6[78]|75\\d|98|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|[4-8]|9\\d)|2(?:0\\d{2}|12|292|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|1[2-4]|26|[37]2|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83\\d|2582\\d{2}|65[2-8])\\d{2}|(?:4\\d{6,7}|9[2-9]\\d{4,5})",,,,"1312345",,,,[3,4]],[,,"(?:7(?:1\\d|3[2-9]|7[1-9]|8[2-5])|8644)\\d{6}",,,,"712345678",,,[9,10]],[,,"80(?:[01]\\d|20|8[0-8])\\d{3}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"86(?:1[12]|30|55|77|8[368])\\d{6}",,,,"8686123456",,,[10]],"ZW",263,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{7})","($1) $2",["(?:2[04-79]|39|5[45]|6[15-8]|8[13-59])2","2(?:02[014]|[49]2|[56]20|72[03])|392|5(?:42|525)|6(?:[16-8]21|52[013])|8(?:[1349]28|523)"],"0$1"],[,"([49])(\\d{3})(\\d{2,4})","$1 $2 $3",["4|9[2-9]"],"0$1"],[,"(7\\d)(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(86\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["86[24]"],"0$1"],[,"([2356]\\d{2})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8|[78])|3(?:[09]8|17|3[78]|7[1569]|8[37])|5[15][78]|6(?:[29]8|37|[68][78]|75)"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329"],"0$1"],[,"([1-356]\\d)(\\d{3,5})","$1 $2",["1[3-9]|2[02569]|3[0-69]|5[05689]|6"],"0$1"],[,"([235]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[23]9|54"],"0$1"],[,"([25]\\d{3})(\\d{3,5})","$1 $2",["(?:25|54)8","258[23]|5483"],"0$1"],[,"(8\\d{3})(\\d{6})","$1 $2",["86"],"0$1"],[,"(80\\d)(\\d{4})","$1 $2",["80"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"800":[,[,,"\\d{8}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{8}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",800,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"808":[,[,,"\\d{8}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{8}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",808,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"870":[,[,,"[35-7]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"(?:[356]\\d|7[6-8])\\d{7}",,,,"301234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",870,,,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[35-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"878":[,[,,"10\\d{10}",,,,,,,[12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"10\\d{10}",,,,"101234567890"],"001",878,,,,,,,,1,[[,"(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"881":[,[,,"[67]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"[67]\\d{8}",,,,"612345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",881,,,,,,,,,[[,"(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"882":[,[,,"[13]\\d{6}(?:\\d{2,5})?|1\\d{7}",,,,,,,[7,8,9,10,11,12]],[,,,,,,,,,[-1]],[,,"3(?:(?:2\\d|37)\\d\\d|4(?:2|7\\d{3}))\\d{4}",,,,"3421234",,,[7,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])|6\\d{1,6})|3(?:45|9\\d{3})\\d{3})\\d{4}",,,,"390123456789"],"001",882,,,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["16|342"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["34[57]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["34"]],[,"(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["[13]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"348[57]\\d{7}",,,,"34851234567",,,[11]]],"883":[,[,,"51\\d{7}(?:\\d{3})?",,,,,,,[9,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"51[013]0\\d{8}|5100\\d{5}",,,,"510012345"],"001",883,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["510"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["5"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],"888":[,[,,"\\d{11}",,,,,,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",888,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"\\d{11}",,,,"12345678901"],,,[,,,,,,,,,[-1]]],"979":[,[,,"\\d{9}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{9}",,,,"123456789"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",979,,,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]]};
/*
metadata.js
*/

/*phonenumberutil.js
 */
i18n.phonenumbers.PhoneNumberUtil = function() {
    this.regionToMetadataMap = {};
};
goog.addSingletonGetter(i18n.phonenumbers.PhoneNumberUtil);
i18n.phonenumbers.Error = {
    INVALID_COUNTRY_CODE: 'Invalid country calling code',
    NOT_A_NUMBER: 'The string supplied did not seem to be a phone number',
    TOO_SHORT_AFTER_IDD: 'Phone number too short after IDD',
    TOO_SHORT_NSN: 'The string supplied is too short to be a phone number',
    TOO_LONG: 'The string supplied is too long to be a phone number'
};
i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_ = 1;
i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_ = 2;
i18n.phonenumbers.PhoneNumberUtil.MAX_LENGTH_FOR_NSN_ = 17;
i18n.phonenumbers.PhoneNumberUtil.MAX_LENGTH_COUNTRY_CODE_ = 3;
i18n.phonenumbers.PhoneNumberUtil.MAX_INPUT_STRING_LENGTH_ = 250;
i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_ = 'ZZ';
i18n.phonenumbers.PhoneNumberUtil.COLOMBIA_MOBILE_TO_FIXED_LINE_PREFIX_ = '3';
i18n.phonenumbers.PhoneNumberUtil.MOBILE_TOKEN_MAPPINGS_ = {
    52: '1',
    54: '9'
};
i18n.phonenumbers.PhoneNumberUtil.GEO_MOBILE_COUNTRIES_ = [
    52,     54,     55   ];
i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN = '+';
i18n.phonenumbers.PhoneNumberUtil.STAR_SIGN_ = '*';
i18n.phonenumbers.PhoneNumberUtil.RFC3966_EXTN_PREFIX_ = ';ext=';
i18n.phonenumbers.PhoneNumberUtil.RFC3966_PREFIX_ = 'tel:';
i18n.phonenumbers.PhoneNumberUtil.RFC3966_PHONE_CONTEXT_ = ';phone-context=';
i18n.phonenumbers.PhoneNumberUtil.RFC3966_ISDN_SUBADDRESS_ = ';isub=';
i18n.phonenumbers.PhoneNumberUtil.DIGIT_MAPPINGS = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '\uFF10': '0',    '\uFF11': '1',    '\uFF12': '2',    '\uFF13': '3',    '\uFF14': '4',    '\uFF15': '5',    '\uFF16': '6',    '\uFF17': '7',    '\uFF18': '8',    '\uFF19': '9',    '\u0660': '0',    '\u0661': '1',    '\u0662': '2',    '\u0663': '3',    '\u0664': '4',    '\u0665': '5',    '\u0666': '6',    '\u0667': '7',    '\u0668': '8',    '\u0669': '9',    '\u06F0': '0',    '\u06F1': '1',    '\u06F2': '2',    '\u06F3': '3',    '\u06F4': '4',    '\u06F5': '5',    '\u06F6': '6',    '\u06F7': '7',    '\u06F8': '8',    '\u06F9': '9'   };
i18n.phonenumbers.PhoneNumberUtil.DIALLABLE_CHAR_MAPPINGS_ = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '+': i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN,
    '*': '*',
    '#': '#'
};
i18n.phonenumbers.PhoneNumberUtil.ALPHA_MAPPINGS_ = {
    'A': '2',
    'B': '2',
    'C': '2',
    'D': '3',
    'E': '3',
    'F': '3',
    'G': '4',
    'H': '4',
    'I': '4',
    'J': '5',
    'K': '5',
    'L': '5',
    'M': '6',
    'N': '6',
    'O': '6',
    'P': '7',
    'Q': '7',
    'R': '7',
    'S': '7',
    'T': '8',
    'U': '8',
    'V': '8',
    'W': '9',
    'X': '9',
    'Y': '9',
    'Z': '9'
};
i18n.phonenumbers.PhoneNumberUtil.ALL_NORMALIZATION_MAPPINGS_ = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '\uFF10': '0',    '\uFF11': '1',    '\uFF12': '2',    '\uFF13': '3',    '\uFF14': '4',    '\uFF15': '5',    '\uFF16': '6',    '\uFF17': '7',    '\uFF18': '8',    '\uFF19': '9',    '\u0660': '0',    '\u0661': '1',    '\u0662': '2',    '\u0663': '3',    '\u0664': '4',    '\u0665': '5',    '\u0666': '6',    '\u0667': '7',    '\u0668': '8',    '\u0669': '9',    '\u06F0': '0',    '\u06F1': '1',    '\u06F2': '2',    '\u06F3': '3',    '\u06F4': '4',    '\u06F5': '5',    '\u06F6': '6',    '\u06F7': '7',    '\u06F8': '8',    '\u06F9': '9',    'A': '2',
    'B': '2',
    'C': '2',
    'D': '3',
    'E': '3',
    'F': '3',
    'G': '4',
    'H': '4',
    'I': '4',
    'J': '5',
    'K': '5',
    'L': '5',
    'M': '6',
    'N': '6',
    'O': '6',
    'P': '7',
    'Q': '7',
    'R': '7',
    'S': '7',
    'T': '8',
    'U': '8',
    'V': '8',
    'W': '9',
    'X': '9',
    'Y': '9',
    'Z': '9'
};
i18n.phonenumbers.PhoneNumberUtil.ALL_PLUS_NUMBER_GROUPING_SYMBOLS_ = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G',
    'H': 'H',
    'I': 'I',
    'J': 'J',
    'K': 'K',
    'L': 'L',
    'M': 'M',
    'N': 'N',
    'O': 'O',
    'P': 'P',
    'Q': 'Q',
    'R': 'R',
    'S': 'S',
    'T': 'T',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z',
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'H',
    'i': 'I',
    'j': 'J',
    'k': 'K',
    'l': 'L',
    'm': 'M',
    'n': 'N',
    'o': 'O',
    'p': 'P',
    'q': 'Q',
    'r': 'R',
    's': 'S',
    't': 'T',
    'u': 'U',
    'v': 'V',
    'w': 'W',
    'x': 'X',
    'y': 'Y',
    'z': 'Z',
    '-': '-',
    '\uFF0D': '-',
    '\u2010': '-',
    '\u2011': '-',
    '\u2012': '-',
    '\u2013': '-',
    '\u2014': '-',
    '\u2015': '-',
    '\u2212': '-',
    '/': '/',
    '\uFF0F': '/',
    ' ': ' ',
    '\u3000': ' ',
    '\u2060': ' ',
    '.': '.',
    '\uFF0E': '.'
};
i18n.phonenumbers.PhoneNumberUtil.SINGLE_INTERNATIONAL_PREFIX_ =
    /[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?/;
i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION =
    '-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \u00A0\u00AD\u200B\u2060\u3000' +
    '()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E';
i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ =
    '0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9';
i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_ = 'A-Za-z';
i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ = '+\uFF0B';
i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_PATTERN =
    new RegExp('[' + i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ + ']+');
i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN =
    new RegExp('^[' + i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ + ']+');
i18n.phonenumbers.PhoneNumberUtil.SEPARATOR_PATTERN_ =
    '[' + i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION + ']+';
i18n.phonenumbers.PhoneNumberUtil.CAPTURING_DIGIT_PATTERN =
    new RegExp('([' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + '])');
i18n.phonenumbers.PhoneNumberUtil.VALID_START_CHAR_PATTERN_ =
    new RegExp('[' + i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ +
        i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']');
i18n.phonenumbers.PhoneNumberUtil.SECOND_NUMBER_START_PATTERN_ = /[\\\/] *x/;
i18n.phonenumbers.PhoneNumberUtil.UNWANTED_END_CHAR_PATTERN_ =
    new RegExp('[^' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ +
        i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_ + '#]+$');
i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_PHONE_PATTERN_ =
    /(?:.*?[A-Za-z]){3}.*/;
i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_PHONE_NUMBER_PATTERN_ =
    '[' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']{' +
    i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_ + '}';
i18n.phonenumbers.PhoneNumberUtil.VALID_PHONE_NUMBER_ =
    '[' + i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_ + ']*(?:[' +
    i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION +
    i18n.phonenumbers.PhoneNumberUtil.STAR_SIGN_ + ']*[' +
    i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']){3,}[' +
    i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION +
    i18n.phonenumbers.PhoneNumberUtil.STAR_SIGN_ +
    i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_ +
    i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']*';
i18n.phonenumbers.PhoneNumberUtil.DEFAULT_EXTN_PREFIX_ = ' ext. ';
i18n.phonenumbers.PhoneNumberUtil.CAPTURING_EXTN_DIGITS_ =
    '([' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']{1,7})';
i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERNS_FOR_PARSING_ =
    i18n.phonenumbers.PhoneNumberUtil.RFC3966_EXTN_PREFIX_ +
    i18n.phonenumbers.PhoneNumberUtil.CAPTURING_EXTN_DIGITS_ + '|' +
    '[ \u00A0\\t,]*' +
    '(?:e?xt(?:ensi(?:o\u0301?|\u00F3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|' +
    '\u0434\u043E\u0431|' +
    '[;,x\uFF58#\uFF03~\uFF5E]|int|anexo|\uFF49\uFF4E\uFF54)' +
    '[:\\.\uFF0E]?[ \u00A0\\t,-]*' +
    i18n.phonenumbers.PhoneNumberUtil.CAPTURING_EXTN_DIGITS_ + '#?|' +
    '[- ]+([' + i18n.phonenumbers.PhoneNumberUtil.VALID_DIGITS_ + ']{1,5})#';
i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERN_ =
    new RegExp('(?:' +
        i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERNS_FOR_PARSING_ +
        ')$', 'i');
i18n.phonenumbers.PhoneNumberUtil.VALID_PHONE_NUMBER_PATTERN_ =
    new RegExp(
        '^' +
        i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_PHONE_NUMBER_PATTERN_ +
        '$|' +
        '^' + i18n.phonenumbers.PhoneNumberUtil.VALID_PHONE_NUMBER_ +
        '(?:' + i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERNS_FOR_PARSING_ +
        ')?' + '$', 'i');
i18n.phonenumbers.PhoneNumberUtil.NON_DIGITS_PATTERN_ = /\D+/;
i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_PATTERN_ = /(\$\d)/;
i18n.phonenumbers.PhoneNumberUtil.NP_PATTERN_ = /\$NP/;
i18n.phonenumbers.PhoneNumberUtil.FG_PATTERN_ = /\$FG/;
i18n.phonenumbers.PhoneNumberUtil.CC_PATTERN_ = /\$CC/;
i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_ONLY_PREFIX_PATTERN_ =
    /^\(?\$1\)?$/;
i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY = '001';
i18n.phonenumbers.PhoneNumberFormat = {
    E164: 0,
    INTERNATIONAL: 1,
    NATIONAL: 2,
    RFC3966: 3
};
i18n.phonenumbers.PhoneNumberType = {
    FIXED_LINE: 0,
    MOBILE: 1,
    FIXED_LINE_OR_MOBILE: 2,
    TOLL_FREE: 3,
    PREMIUM_RATE: 4,
    SHARED_COST: 5,
    VOIP: 6,
    PERSONAL_NUMBER: 7,
    PAGER: 8,
    UAN: 9,
    VOICEMAIL: 10,
    UNKNOWN: -1
};
i18n.phonenumbers.PhoneNumberUtil.MatchType = {
    NOT_A_NUMBER: 0,
    NO_MATCH: 1,
    SHORT_NSN_MATCH: 2,
    NSN_MATCH: 3,
    EXACT_MATCH: 4
};
i18n.phonenumbers.PhoneNumberUtil.ValidationResult = {
    IS_POSSIBLE: 0,
    IS_POSSIBLE_LOCAL_ONLY: 4,
    INVALID_COUNTRY_CODE: 1,
    TOO_SHORT: 2,
    INVALID_LENGTH: 5,
    TOO_LONG: 3
};
i18n.phonenumbers.PhoneNumberUtil.extractPossibleNumber = function(number) {
    var possibleNumber;
    var start = number
        .search(i18n.phonenumbers.PhoneNumberUtil.VALID_START_CHAR_PATTERN_);
    if (start >= 0) {
        possibleNumber = number.substring(start);
        possibleNumber = possibleNumber.replace(
            i18n.phonenumbers.PhoneNumberUtil.UNWANTED_END_CHAR_PATTERN_, '');
        var secondNumberStart = possibleNumber
            .search(i18n.phonenumbers.PhoneNumberUtil.SECOND_NUMBER_START_PATTERN_);
        if (secondNumberStart >= 0) {
            possibleNumber = possibleNumber.substring(0, secondNumberStart);
        }
    } else {
        possibleNumber = '';
    }
    return possibleNumber;
};
i18n.phonenumbers.PhoneNumberUtil.isViablePhoneNumber = function(number) {
    if (number.length < i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_) {
        return false;
    }
    return i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
        i18n.phonenumbers.PhoneNumberUtil.VALID_PHONE_NUMBER_PATTERN_, number);
};
i18n.phonenumbers.PhoneNumberUtil.normalize = function(number) {
    if (i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
            i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_PHONE_PATTERN_, number)) {
        return i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(number,
            i18n.phonenumbers.PhoneNumberUtil.ALL_NORMALIZATION_MAPPINGS_, true);
    } else {
        return i18n.phonenumbers.PhoneNumberUtil.normalizeDigitsOnly(number);
    }
};
i18n.phonenumbers.PhoneNumberUtil.normalizeSB_ = function(number) {
    var normalizedNumber = i18n.phonenumbers.PhoneNumberUtil.normalize(number
        .toString());
    number.clear();
    number.append(normalizedNumber);
};
i18n.phonenumbers.PhoneNumberUtil.normalizeDigitsOnly = function(number) {
    return i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(number,
        i18n.phonenumbers.PhoneNumberUtil.DIGIT_MAPPINGS, true);
};
i18n.phonenumbers.PhoneNumberUtil.normalizeDiallableCharsOnly =
    function(number) {
        return i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(number,
            i18n.phonenumbers.PhoneNumberUtil.DIALLABLE_CHAR_MAPPINGS_,
            true  );
    };
i18n.phonenumbers.PhoneNumberUtil.convertAlphaCharactersInNumber =
    function(number) {
        return i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(number,
            i18n.phonenumbers.PhoneNumberUtil.ALL_NORMALIZATION_MAPPINGS_, false);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getLengthOfGeographicalAreaCode =
    function(number) {
        var metadata = this.getMetadataForRegion(this.getRegionCodeForNumber(number));
        if (metadata == null) {
            return 0;
        }
        if (!metadata.hasNationalPrefix() && !number.hasItalianLeadingZero()) {
            return 0;
        }
        if (!this.isNumberGeographical(number)) {
            return 0;
        }
        return this.getLengthOfNationalDestinationCode(number);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getLengthOfNationalDestinationCode =
    function(number) {
        var copiedProto;
        if (number.hasExtension()) {
            copiedProto = number.clone();
            copiedProto.clearExtension();
        } else {
            copiedProto = number;
        }
        var nationalSignificantNumber = this.format(copiedProto,
            i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
        var numberGroups = nationalSignificantNumber.split(
            i18n.phonenumbers.PhoneNumberUtil.NON_DIGITS_PATTERN_);
        if (numberGroups[0].length == 0) {
            numberGroups.shift();
        }
        if (numberGroups.length <= 2) {
            return 0;
        }
        if (this.getNumberType(number) == i18n.phonenumbers.PhoneNumberType.MOBILE) {
            var mobileToken = i18n.phonenumbers.PhoneNumberUtil.getCountryMobileToken(
                number.getCountryCodeOrDefault());
            if (mobileToken != '') {
                return numberGroups[2].length + mobileToken.length;
            }
        }
        return numberGroups[1].length;
    };
i18n.phonenumbers.PhoneNumberUtil.getCountryMobileToken =
    function(countryCallingCode) {
        return i18n.phonenumbers.PhoneNumberUtil.MOBILE_TOKEN_MAPPINGS_[
            countryCallingCode] || '';
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getSupportedRegions = function() {
    return goog.array.filter(
        Object.keys(i18n.phonenumbers.metadata.countryToMetadata),
        function(regionCode) {
            return isNaN(regionCode);
        });
};
i18n.phonenumbers.PhoneNumberUtil.prototype.
    getSupportedGlobalNetworkCallingCodes = function() {
    var callingCodesAsStrings = goog.array.filter(
        Object.keys(i18n.phonenumbers.metadata.countryToMetadata),
        function(regionCode) {
            return !isNaN(regionCode);
        });
    return goog.array.map(callingCodesAsStrings,
        function(callingCode) {
            return parseInt(callingCode, 10);
        });
};
i18n.phonenumbers.PhoneNumberUtil.prototype.getSupportedCallingCodes =
    function() {
        var countryCodesAsStrings =
            Object.keys(i18n.phonenumbers.metadata.countryCodeToRegionCodeMap);
        return goog.array.join(
            this.getSupportedGlobalNetworkCallingCodes(),
            goog.array.map(countryCodesAsStrings,
                function(callingCode) {
                    return parseInt(callingCode, 10);
                }));
    };
i18n.phonenumbers.PhoneNumberUtil.descHasPossibleNumberData_ = function(desc) {
    return desc != null &&
        (desc.possibleLengthCount() != 1 || desc.possibleLengthArray()[0] != -1);
};
i18n.phonenumbers.PhoneNumberUtil.descHasData_ = function(desc) {
    return desc != null && (desc.hasExampleNumber() ||
        i18n.phonenumbers.PhoneNumberUtil.descHasPossibleNumberData_(desc) ||
        desc.hasNationalNumberPattern());
};
i18n.phonenumbers.PhoneNumberUtil.getSupportedTypesForMetadata_ =
    function(metadata) {
        var types = [];
        goog.object.forEach(i18n.phonenumbers.PhoneNumberType,
            function(type) {
                if (type == i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE ||
                    type == i18n.phonenumbers.PhoneNumberType.UNKNOWN) {
                    return;
                }
                var desc = i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(
                    metadata, type);
                if (i18n.phonenumbers.PhoneNumberUtil.descHasData_(desc)) {
                    types.push(type);
                }
            });
        return types;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getSupportedTypesForRegion =
    function(regionCode) {
        if (!this.isValidRegionCode_(regionCode)) {
            return [];
        }
        return i18n.phonenumbers.PhoneNumberUtil.getSupportedTypesForMetadata_(
            (
                this.getMetadataForRegion(regionCode)));
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getSupportedTypesForNonGeoEntity =
    function(countryCallingCode) {
        var metadata = this.getMetadataForNonGeographicalRegion(countryCallingCode);
        if (metadata == null) {
            return [];
        }
        return i18n.phonenumbers.PhoneNumberUtil.getSupportedTypesForMetadata_(
            (metadata));
    };
i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_ =
    function(number, normalizationReplacements, removeNonMatches) {
        var normalizedNumber = new goog.string.StringBuffer();
        var character;
        var newDigit;
        var numberLength = number.length;
        for (var i = 0; i < numberLength; ++i) {
            character = number.charAt(i);
            newDigit = normalizationReplacements[character.toUpperCase()];
            if (newDigit != null) {
                normalizedNumber.append(newDigit);
            } else if (!removeNonMatches) {
                normalizedNumber.append(character);
            }
        }
        return normalizedNumber.toString();
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formattingRuleHasFirstGroupOnly =
    function(nationalPrefixFormattingRule) {
        return nationalPrefixFormattingRule.length == 0 ||
            i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_ONLY_PREFIX_PATTERN_.
            test(nationalPrefixFormattingRule);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isNumberGeographical =
    function(phoneNumber) {
        var numberType = this.getNumberType(phoneNumber);
        return numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE ||
            numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE ||
            (goog.array.contains(
                i18n.phonenumbers.PhoneNumberUtil.GEO_MOBILE_COUNTRIES_,
                phoneNumber.getCountryCodeOrDefault()) &&
                numberType == i18n.phonenumbers.PhoneNumberType.MOBILE);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isValidRegionCode_ =
    function(regionCode) {
        return regionCode != null &&
            isNaN(regionCode) &&
            regionCode.toUpperCase() in i18n.phonenumbers.metadata.countryToMetadata;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.hasValidCountryCallingCode_ =
    function(countryCallingCode) {
        return countryCallingCode in
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.format =
    function(number, numberFormat) {
        if (number.getNationalNumber() == 0 && number.hasRawInput()) {
            var rawInput = number.getRawInputOrDefault();
            if (rawInput.length > 0) {
                return rawInput;
            }
        }
        var countryCallingCode = number.getCountryCodeOrDefault();
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.E164) {
            return this.prefixNumberWithCountryCallingCode_(
                countryCallingCode, i18n.phonenumbers.PhoneNumberFormat.E164,
                nationalSignificantNumber, '');
        }
        if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
            return nationalSignificantNumber;
        }
        var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
        var metadata =
            this.getMetadataForRegionOrCallingCode_(countryCallingCode, regionCode);
        var formattedExtension =
            this.maybeGetFormattedExtension_(number, metadata, numberFormat);
        var formattedNationalNumber =
            this.formatNsn_(nationalSignificantNumber, metadata, numberFormat);
        return this.prefixNumberWithCountryCallingCode_(countryCallingCode,
            numberFormat,
            formattedNationalNumber,
            formattedExtension);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formatByPattern =
    function(number, numberFormat, userDefinedFormats) {
        var countryCallingCode = number.getCountryCodeOrDefault();
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
            return nationalSignificantNumber;
        }
        var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
        var metadata =
            this.getMetadataForRegionOrCallingCode_(countryCallingCode, regionCode);
        var formattedNumber = '';
        var formattingPattern = this.chooseFormattingPatternForNumber_(
            userDefinedFormats, nationalSignificantNumber);
        if (formattingPattern == null) {
            formattedNumber = nationalSignificantNumber;
        } else {
            var numFormatCopy = formattingPattern.clone();
            var nationalPrefixFormattingRule =
                formattingPattern.getNationalPrefixFormattingRuleOrDefault();
            if (nationalPrefixFormattingRule.length > 0) {
                var nationalPrefix = metadata.getNationalPrefixOrDefault();
                if (nationalPrefix.length > 0) {
                    nationalPrefixFormattingRule = nationalPrefixFormattingRule
                        .replace(i18n.phonenumbers.PhoneNumberUtil.NP_PATTERN_,
                            nationalPrefix)
                        .replace(i18n.phonenumbers.PhoneNumberUtil.FG_PATTERN_, '$1');
                    numFormatCopy.setNationalPrefixFormattingRule(
                        nationalPrefixFormattingRule);
                } else {
                    numFormatCopy.clearNationalPrefixFormattingRule();
                }
            }
            formattedNumber = this.formatNsnUsingPattern_(
                nationalSignificantNumber, numFormatCopy, numberFormat);
        }
        var formattedExtension =
            this.maybeGetFormattedExtension_(number, metadata, numberFormat);
        return this.prefixNumberWithCountryCallingCode_(countryCallingCode,
            numberFormat,
            formattedNumber,
            formattedExtension);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    formatNationalNumberWithCarrierCode = function(number, carrierCode) {
    var countryCallingCode = number.getCountryCodeOrDefault();
    var nationalSignificantNumber = this.getNationalSignificantNumber(number);
    if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
        return nationalSignificantNumber;
    }
    var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
    var metadata =
        this.getMetadataForRegionOrCallingCode_(countryCallingCode, regionCode);
    var formattedExtension = this.maybeGetFormattedExtension_(
        number, metadata, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
    var formattedNationalNumber = this.formatNsn_(
        nationalSignificantNumber, metadata,
        i18n.phonenumbers.PhoneNumberFormat.NATIONAL, carrierCode);
    return this.prefixNumberWithCountryCallingCode_(
        countryCallingCode, i18n.phonenumbers.PhoneNumberFormat.NATIONAL,
        formattedNationalNumber, formattedExtension);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.getMetadataForRegionOrCallingCode_ =
    function(countryCallingCode, regionCode) {
        return i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY ==
        regionCode ?
            this.getMetadataForNonGeographicalRegion(countryCallingCode) :
            this.getMetadataForRegion(regionCode);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    formatNationalNumberWithPreferredCarrierCode = function(
    number, fallbackCarrierCode) {
    return this.formatNationalNumberWithCarrierCode(
        number,
        number.getPreferredDomesticCarrierCodeOrDefault().length > 0 ?
            number.getPreferredDomesticCarrierCodeOrDefault() :
            fallbackCarrierCode);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.formatNumberForMobileDialing =
    function(number, regionCallingFrom, withFormatting) {
        var countryCallingCode = number.getCountryCodeOrDefault();
        if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
            return number.hasRawInput() ? number.getRawInputOrDefault() : '';
        }
        var formattedNumber = '';
        var numberNoExt = number.clone();
        numberNoExt.clearExtension();
        var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
        var numberType = this.getNumberType(numberNoExt);
        var isValidNumber = (numberType != i18n.phonenumbers.PhoneNumberType.UNKNOWN);
        if (regionCallingFrom == regionCode) {
            var isFixedLineOrMobile =
                (numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE) ||
                (numberType == i18n.phonenumbers.PhoneNumberType.MOBILE) ||
                (numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE);
            if (regionCode == 'CO' &&
                numberType == i18n.phonenumbers.PhoneNumberType.FIXED_LINE) {
                formattedNumber = this.formatNationalNumberWithCarrierCode(
                    numberNoExt,
                    i18n.phonenumbers.PhoneNumberUtil
                        .COLOMBIA_MOBILE_TO_FIXED_LINE_PREFIX_);
            } else if (regionCode == 'BR' && isFixedLineOrMobile) {
                formattedNumber =
                    numberNoExt.getPreferredDomesticCarrierCodeOrDefault().length > 0 ?
                        this.formatNationalNumberWithPreferredCarrierCode(numberNoExt, '') :
                        '';
            } else if (isValidNumber && regionCode == 'HU') {
                formattedNumber =
                    this.getNddPrefixForRegion(regionCode, true  ) +
                    ' ' + this.format(numberNoExt,
                    i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
            } else if (countryCallingCode ==
                i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_) {
                var regionMetadata = this.getMetadataForRegion(regionCallingFrom);
                if (this.canBeInternationallyDialled(numberNoExt) &&
                    this.testNumberLength_(this.getNationalSignificantNumber(numberNoExt),
                        regionMetadata) !=
                    i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT) {
                    formattedNumber = this.format(
                        numberNoExt, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
                } else {
                    formattedNumber = this.format(
                        numberNoExt, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
                }
            } else {
                if ((regionCode ==
                        i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY ||
                        ((regionCode == 'MX' || regionCode == 'CL' || regionCode == 'UZ') &&
                            isFixedLineOrMobile)) &&
                    this.canBeInternationallyDialled(numberNoExt)) {
                    formattedNumber = this.format(
                        numberNoExt, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
                } else {
                    formattedNumber = this.format(
                        numberNoExt, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
                }
            }
        } else if (isValidNumber && this.canBeInternationallyDialled(numberNoExt)) {
            return withFormatting ?
                this.format(numberNoExt,
                    i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL) :
                this.format(numberNoExt, i18n.phonenumbers.PhoneNumberFormat.E164);
        }
        return withFormatting ?
            formattedNumber :
            i18n.phonenumbers.PhoneNumberUtil.normalizeDiallableCharsOnly(
                formattedNumber);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formatOutOfCountryCallingNumber =
    function(number, regionCallingFrom) {
        if (!this.isValidRegionCode_(regionCallingFrom)) {
            return this.format(number,
                i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
        }
        var countryCallingCode = number.getCountryCodeOrDefault();
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        if (!this.hasValidCountryCallingCode_(countryCallingCode)) {
            return nationalSignificantNumber;
        }
        if (countryCallingCode ==
            i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_) {
            if (this.isNANPACountry(regionCallingFrom)) {
                return countryCallingCode + ' ' +
                    this.format(number, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
            }
        } else if (countryCallingCode ==
            this.getCountryCodeForValidRegion_(regionCallingFrom)) {
            return this.format(number,
                i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
        }
        var metadataForRegionCallingFrom =
            this.getMetadataForRegion(regionCallingFrom);
        var internationalPrefix =
            metadataForRegionCallingFrom.getInternationalPrefixOrDefault();
        var internationalPrefixForFormatting = '';
        if (i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                i18n.phonenumbers.PhoneNumberUtil.SINGLE_INTERNATIONAL_PREFIX_,
                internationalPrefix)) {
            internationalPrefixForFormatting = internationalPrefix;
        } else if (metadataForRegionCallingFrom.hasPreferredInternationalPrefix()) {
            internationalPrefixForFormatting =
                metadataForRegionCallingFrom.getPreferredInternationalPrefixOrDefault();
        }
        var regionCode = this.getRegionCodeForCountryCode(countryCallingCode);
        var metadataForRegion =
            this.getMetadataForRegionOrCallingCode_(countryCallingCode, regionCode);
        var formattedNationalNumber = this.formatNsn_(
            nationalSignificantNumber, metadataForRegion,
            i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
        var formattedExtension = this.maybeGetFormattedExtension_(number,
            metadataForRegion, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
        return internationalPrefixForFormatting.length > 0 ?
            internationalPrefixForFormatting + ' ' + countryCallingCode + ' ' +
            formattedNationalNumber + formattedExtension :
            this.prefixNumberWithCountryCallingCode_(
                countryCallingCode, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL,
                formattedNationalNumber, formattedExtension);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formatInOriginalFormat =
    function(number, regionCallingFrom) {
        if (number.hasRawInput() && !this.hasFormattingPatternForNumber_(number)) {
            return number.getRawInputOrDefault();
        }
        if (!number.hasCountryCodeSource()) {
            return this.format(number, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
        }
        var formattedNumber;
        switch (number.getCountryCodeSource()) {
            case i18n.phonenumbers.PhoneNumber.CountryCodeSource
                .FROM_NUMBER_WITH_PLUS_SIGN:
                formattedNumber = this.format(number,
                    i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
                break;
            case i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_NUMBER_WITH_IDD:
                formattedNumber =
                    this.formatOutOfCountryCallingNumber(number, regionCallingFrom);
                break;
            case i18n.phonenumbers.PhoneNumber.CountryCodeSource
                .FROM_NUMBER_WITHOUT_PLUS_SIGN:
                formattedNumber = this.format(number,
                    i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL).substring(1);
                break;
            case i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_DEFAULT_COUNTRY:
            default:
                var regionCode =
                    this.getRegionCodeForCountryCode(number.getCountryCodeOrDefault());
                var nationalPrefix = this.getNddPrefixForRegion(regionCode, true);
                var nationalFormat =
                    this.format(number, i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
                if (nationalPrefix == null || nationalPrefix.length == 0) {
                    formattedNumber = nationalFormat;
                    break;
                }
                if (this.rawInputContainsNationalPrefix_(
                        number.getRawInputOrDefault(), nationalPrefix, regionCode)) {
                    formattedNumber = nationalFormat;
                    break;
                }
                var metadata = this.getMetadataForRegion(regionCode);
                var nationalNumber = this.getNationalSignificantNumber(number);
                var formatRule = this.chooseFormattingPatternForNumber_(
                    metadata.numberFormatArray(), nationalNumber);
                if (formatRule == null) {
                    formattedNumber = nationalFormat;
                    break;
                }
                var candidateNationalPrefixRule =
                    formatRule.getNationalPrefixFormattingRuleOrDefault();
                var indexOfFirstGroup = candidateNationalPrefixRule.indexOf('$1');
                if (indexOfFirstGroup <= 0) {
                    formattedNumber = nationalFormat;
                    break;
                }
                candidateNationalPrefixRule =
                    candidateNationalPrefixRule.substring(0, indexOfFirstGroup);
                candidateNationalPrefixRule = i18n.phonenumbers.PhoneNumberUtil
                    .normalizeDigitsOnly(candidateNationalPrefixRule);
                if (candidateNationalPrefixRule.length == 0) {
                    formattedNumber = nationalFormat;
                    break;
                }
                var numFormatCopy = formatRule.clone();
                numFormatCopy.clearNationalPrefixFormattingRule();
                formattedNumber = this.formatByPattern(number,
                    i18n.phonenumbers.PhoneNumberFormat.NATIONAL, [numFormatCopy]);
                break;
        }
        var rawInput = number.getRawInputOrDefault();
        if (formattedNumber != null && rawInput.length > 0) {
            var normalizedFormattedNumber =
                i18n.phonenumbers.PhoneNumberUtil.normalizeDiallableCharsOnly(
                    formattedNumber);
            var normalizedRawInput =
                i18n.phonenumbers.PhoneNumberUtil.normalizeDiallableCharsOnly(rawInput);
            if (normalizedFormattedNumber != normalizedRawInput) {
                formattedNumber = rawInput;
            }
        }
        return formattedNumber;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.rawInputContainsNationalPrefix_ =
    function(rawInput, nationalPrefix, regionCode) {
        var normalizedNationalNumber =
            i18n.phonenumbers.PhoneNumberUtil.normalizeDigitsOnly(rawInput);
        if (goog.string.startsWith(normalizedNationalNumber, nationalPrefix)) {
            try {
                return this.isValidNumber(
                    this.parse(normalizedNationalNumber.substring(nationalPrefix.length),
                        regionCode));
            } catch (e) {
                return false;
            }
        }
        return false;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.hasFormattingPatternForNumber_ =
    function(number) {
        var countryCallingCode = number.getCountryCodeOrDefault();
        var phoneNumberRegion = this.getRegionCodeForCountryCode(countryCallingCode);
        var metadata = this.getMetadataForRegionOrCallingCode_(
            countryCallingCode, phoneNumberRegion);
        if (metadata == null) {
            return false;
        }
        var nationalNumber = this.getNationalSignificantNumber(number);
        var formatRule = this.chooseFormattingPatternForNumber_(
            metadata.numberFormatArray(), nationalNumber);
        return formatRule != null;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    formatOutOfCountryKeepingAlphaChars = function(number, regionCallingFrom) {
    var rawInput = number.getRawInputOrDefault();
    if (rawInput.length == 0) {
        return this.formatOutOfCountryCallingNumber(number, regionCallingFrom);
    }
    var countryCode = number.getCountryCodeOrDefault();
    if (!this.hasValidCountryCallingCode_(countryCode)) {
        return rawInput;
    }
    rawInput = i18n.phonenumbers.PhoneNumberUtil.normalizeHelper_(
        rawInput,
        i18n.phonenumbers.PhoneNumberUtil.ALL_PLUS_NUMBER_GROUPING_SYMBOLS_,
        true);
    var nationalNumber = this.getNationalSignificantNumber(number);
    if (nationalNumber.length > 3) {
        var firstNationalNumberDigit =
            rawInput.indexOf(nationalNumber.substring(0, 3));
        if (firstNationalNumberDigit != -1) {
            rawInput = rawInput.substring(firstNationalNumberDigit);
        }
    }
    var metadataForRegionCallingFrom =
        this.getMetadataForRegion(regionCallingFrom);
    if (countryCode == i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_) {
        if (this.isNANPACountry(regionCallingFrom)) {
            return countryCode + ' ' + rawInput;
        }
    } else if (metadataForRegionCallingFrom != null &&
        countryCode == this.getCountryCodeForValidRegion_(regionCallingFrom)) {
        var formattingPattern = this.chooseFormattingPatternForNumber_(
            metadataForRegionCallingFrom.numberFormatArray(), nationalNumber);
        if (formattingPattern == null) {
            return rawInput;
        }
        var newFormat = formattingPattern.clone();
        newFormat.setPattern('(\\d+)(.*)');
        newFormat.setFormat('$1$2');
        return this.formatNsnUsingPattern_(rawInput, newFormat,
            i18n.phonenumbers.PhoneNumberFormat.NATIONAL);
    }
    var internationalPrefixForFormatting = '';
    if (metadataForRegionCallingFrom != null) {
        var internationalPrefix =
            metadataForRegionCallingFrom.getInternationalPrefixOrDefault();
        internationalPrefixForFormatting =
            i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                i18n.phonenumbers.PhoneNumberUtil.SINGLE_INTERNATIONAL_PREFIX_,
                internationalPrefix) ?
                internationalPrefix :
                metadataForRegionCallingFrom.getPreferredInternationalPrefixOrDefault();
    }
    var regionCode = this.getRegionCodeForCountryCode(countryCode);
    var metadataForRegion =
        this.getMetadataForRegionOrCallingCode_(countryCode, regionCode);
    var formattedExtension = this.maybeGetFormattedExtension_(
        number, metadataForRegion,
        i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
    if (internationalPrefixForFormatting.length > 0) {
        return internationalPrefixForFormatting + ' ' + countryCode + ' ' +
            rawInput + formattedExtension;
    } else {
        return this.prefixNumberWithCountryCallingCode_(
            countryCode, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL,
            rawInput, formattedExtension);
    }
};
i18n.phonenumbers.PhoneNumberUtil.prototype.getNationalSignificantNumber =
    function(number) {
        if (!number.hasNationalNumber()) {
            return '';
        }
        var nationalNumber = '' + number.getNationalNumber();
        if (number.hasItalianLeadingZero() && number.getItalianLeadingZero() &&
            number.getNumberOfLeadingZerosOrDefault() > 0) {
            return Array(number.getNumberOfLeadingZerosOrDefault() + 1).join('0') +
                nationalNumber;
        }
        return nationalNumber;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    prefixNumberWithCountryCallingCode_ = function(countryCallingCode,
                                                   numberFormat,
                                                   formattedNationalNumber,
                                                   formattedExtension) {
    switch (numberFormat) {
        case i18n.phonenumbers.PhoneNumberFormat.E164:
            return i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN + countryCallingCode +
                formattedNationalNumber + formattedExtension;
        case i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL:
            return i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN + countryCallingCode +
                ' ' + formattedNationalNumber + formattedExtension;
        case i18n.phonenumbers.PhoneNumberFormat.RFC3966:
            return i18n.phonenumbers.PhoneNumberUtil.RFC3966_PREFIX_ +
                i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN + countryCallingCode +
                '-' + formattedNationalNumber + formattedExtension;
        case i18n.phonenumbers.PhoneNumberFormat.NATIONAL:
        default:
            return formattedNationalNumber + formattedExtension;
    }
};
i18n.phonenumbers.PhoneNumberUtil.prototype.formatNsn_ =
    function(number, metadata, numberFormat, opt_carrierCode) {
        var intlNumberFormats = metadata.intlNumberFormatArray();
        var availableFormats =
            (intlNumberFormats.length == 0 ||
                numberFormat == i18n.phonenumbers.PhoneNumberFormat.NATIONAL) ?
                metadata.numberFormatArray() : metadata.intlNumberFormatArray();
        var formattingPattern = this.chooseFormattingPatternForNumber_(
            availableFormats, number);
        return (formattingPattern == null) ?
            number :
            this.formatNsnUsingPattern_(number, formattingPattern,
                numberFormat, opt_carrierCode);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.chooseFormattingPatternForNumber_ =
    function(availableFormats, nationalNumber) {
        var numFormat;
        var l = availableFormats.length;
        for (var i = 0; i < l; ++i) {
            numFormat = availableFormats[i];
            var size = numFormat.leadingDigitsPatternCount();
            if (size == 0 ||
                nationalNumber
                    .search(numFormat.getLeadingDigitsPattern(size - 1)) == 0) {
                var patternToMatch = new RegExp(numFormat.getPattern());
                if (i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(patternToMatch,
                        nationalNumber)) {
                    return numFormat;
                }
            }
        }
        return null;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.formatNsnUsingPattern_ =
    function(nationalNumber, formattingPattern, numberFormat, opt_carrierCode) {
        var numberFormatRule = formattingPattern.getFormatOrDefault();
        var patternToMatch = new RegExp(formattingPattern.getPattern());
        var domesticCarrierCodeFormattingRule =
            formattingPattern.getDomesticCarrierCodeFormattingRuleOrDefault();
        var formattedNationalNumber = '';
        if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.NATIONAL &&
            opt_carrierCode != null && opt_carrierCode.length > 0 &&
            domesticCarrierCodeFormattingRule.length > 0) {
            var carrierCodeFormattingRule = domesticCarrierCodeFormattingRule
                .replace(i18n.phonenumbers.PhoneNumberUtil.CC_PATTERN_,
                    opt_carrierCode);
            numberFormatRule = numberFormatRule.replace(
                i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_PATTERN_,
                carrierCodeFormattingRule);
            formattedNationalNumber =
                nationalNumber.replace(patternToMatch, numberFormatRule);
        } else {
            var nationalPrefixFormattingRule =
                formattingPattern.getNationalPrefixFormattingRuleOrDefault();
            if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.NATIONAL &&
                nationalPrefixFormattingRule != null &&
                nationalPrefixFormattingRule.length > 0) {
                formattedNationalNumber = nationalNumber.replace(patternToMatch,
                    numberFormatRule.replace(
                        i18n.phonenumbers.PhoneNumberUtil.FIRST_GROUP_PATTERN_,
                        nationalPrefixFormattingRule));
            } else {
                formattedNationalNumber =
                    nationalNumber.replace(patternToMatch, numberFormatRule);
            }
        }
        if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.RFC3966) {
            formattedNationalNumber = formattedNationalNumber.replace(
                new RegExp('^' + i18n.phonenumbers.PhoneNumberUtil.SEPARATOR_PATTERN_),
                '');
            formattedNationalNumber = formattedNationalNumber.replace(
                new RegExp(i18n.phonenumbers.PhoneNumberUtil.SEPARATOR_PATTERN_, 'g'),
                '-');
        }
        return formattedNationalNumber;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getExampleNumber =
    function(regionCode) {
        return this.getExampleNumberForType(regionCode,
            i18n.phonenumbers.PhoneNumberType.FIXED_LINE);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getExampleNumberForType =
    function(regionCode, type) {
        if (!this.isValidRegionCode_(regionCode)) {
            return null;
        }
        var desc = i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(
            this.getMetadataForRegion(regionCode), type);
        try {
            if (desc.hasExampleNumber()) {
                return this.parse(desc.getExampleNumber(), regionCode);
            }
        } catch (e) {
        }
        return null;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getExampleNumberForNonGeoEntity =
    function(countryCallingCode) {
        var metadata =
            this.getMetadataForNonGeographicalRegion(countryCallingCode);
        if (metadata != null) {
            var numberTypeWithExampleNumber = goog.array.find(
                [metadata.getMobile(), metadata.getTollFree(),
                    metadata.getSharedCost(), metadata.getVoip(),
                    metadata.getVoicemail(), metadata.getUan(),
                    metadata.getPremiumRate()],
                function(desc, index) {
                    return (desc.hasExampleNumber());
                });
            if (numberTypeWithExampleNumber != null) {
                try {
                    return this.parse('+' + countryCallingCode +
                        numberTypeWithExampleNumber.getExampleNumber(), 'ZZ');
                } catch (e) {
                }
            }
        }
        return null;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.maybeGetFormattedExtension_ =
    function(number, metadata, numberFormat) {
        if (!number.hasExtension() || number.getExtension().length == 0) {
            return '';
        } else {
            if (numberFormat == i18n.phonenumbers.PhoneNumberFormat.RFC3966) {
                return i18n.phonenumbers.PhoneNumberUtil.RFC3966_EXTN_PREFIX_ +
                    number.getExtension();
            } else {
                if (metadata.hasPreferredExtnPrefix()) {
                    return metadata.getPreferredExtnPrefix() +
                        number.getExtensionOrDefault();
                } else {
                    return i18n.phonenumbers.PhoneNumberUtil.DEFAULT_EXTN_PREFIX_ +
                        number.getExtensionOrDefault();
                }
            }
        }
    };
i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_ =
    function(metadata, type) {
        switch (type) {
            case i18n.phonenumbers.PhoneNumberType.PREMIUM_RATE:
                return metadata.getPremiumRate();
            case i18n.phonenumbers.PhoneNumberType.TOLL_FREE:
                return metadata.getTollFree();
            case i18n.phonenumbers.PhoneNumberType.MOBILE:
                return metadata.getMobile();
            case i18n.phonenumbers.PhoneNumberType.FIXED_LINE:
            case i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE:
                return metadata.getFixedLine();
            case i18n.phonenumbers.PhoneNumberType.SHARED_COST:
                return metadata.getSharedCost();
            case i18n.phonenumbers.PhoneNumberType.VOIP:
                return metadata.getVoip();
            case i18n.phonenumbers.PhoneNumberType.PERSONAL_NUMBER:
                return metadata.getPersonalNumber();
            case i18n.phonenumbers.PhoneNumberType.PAGER:
                return metadata.getPager();
            case i18n.phonenumbers.PhoneNumberType.UAN:
                return metadata.getUan();
            case i18n.phonenumbers.PhoneNumberType.VOICEMAIL:
                return metadata.getVoicemail();
            default:
                return metadata.getGeneralDesc();
        }
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getNumberType =
    function(number) {
        var regionCode = this.getRegionCodeForNumber(number);
        var metadata = this.getMetadataForRegionOrCallingCode_(
            number.getCountryCodeOrDefault(), regionCode);
        if (metadata == null) {
            return i18n.phonenumbers.PhoneNumberType.UNKNOWN;
        }
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        return this.getNumberTypeHelper_(nationalSignificantNumber, metadata);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getNumberTypeHelper_ =
    function(nationalNumber, metadata) {
        if (!this.isNumberMatchingDesc_(nationalNumber, metadata.getGeneralDesc())) {
            return i18n.phonenumbers.PhoneNumberType.UNKNOWN;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getPremiumRate())) {
            return i18n.phonenumbers.PhoneNumberType.PREMIUM_RATE;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getTollFree())) {
            return i18n.phonenumbers.PhoneNumberType.TOLL_FREE;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getSharedCost())) {
            return i18n.phonenumbers.PhoneNumberType.SHARED_COST;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getVoip())) {
            return i18n.phonenumbers.PhoneNumberType.VOIP;
        }
        if (this.isNumberMatchingDesc_(nationalNumber,
                metadata.getPersonalNumber())) {
            return i18n.phonenumbers.PhoneNumberType.PERSONAL_NUMBER;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getPager())) {
            return i18n.phonenumbers.PhoneNumberType.PAGER;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getUan())) {
            return i18n.phonenumbers.PhoneNumberType.UAN;
        }
        if (this.isNumberMatchingDesc_(nationalNumber, metadata.getVoicemail())) {
            return i18n.phonenumbers.PhoneNumberType.VOICEMAIL;
        }
        var isFixedLine = this.isNumberMatchingDesc_(nationalNumber, metadata
            .getFixedLine());
        if (isFixedLine) {
            if (metadata.getSameMobileAndFixedLinePattern()) {
                return i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE;
            } else if (this.isNumberMatchingDesc_(nationalNumber,
                    metadata.getMobile())) {
                return i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE;
            }
            return i18n.phonenumbers.PhoneNumberType.FIXED_LINE;
        }
        if (!metadata.getSameMobileAndFixedLinePattern() &&
            this.isNumberMatchingDesc_(nationalNumber, metadata.getMobile())) {
            return i18n.phonenumbers.PhoneNumberType.MOBILE;
        }
        return i18n.phonenumbers.PhoneNumberType.UNKNOWN;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getMetadataForRegion =
    function(regionCode) {
        if (regionCode == null) {
            return null;
        }
        regionCode = regionCode.toUpperCase();
        var metadata = this.regionToMetadataMap[regionCode];
        if (metadata == null) {
            var serializer = new goog.proto2.PbLiteSerializer();
            var metadataSerialized =
                i18n.phonenumbers.metadata.countryToMetadata[regionCode];
            if (metadataSerialized == null) {
                return null;
            }
            metadata =   (
                serializer.deserialize(i18n.phonenumbers.PhoneMetadata.getDescriptor(),
                    metadataSerialized));
            this.regionToMetadataMap[regionCode] = metadata;
        }
        return metadata;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    getMetadataForNonGeographicalRegion = function(countryCallingCode) {
    return this.getMetadataForRegion('' + countryCallingCode);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isNumberMatchingDesc_ =
    function(nationalNumber, numberDesc) {
        var actualLength = nationalNumber.length;
        if (numberDesc.possibleLengthCount() > 0 &&
            goog.array.indexOf(numberDesc.possibleLengthArray(),
                actualLength) == -1) {
            return false;
        }
        return i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
            numberDesc.getNationalNumberPatternOrDefault(), nationalNumber);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isValidNumber = function(number) {
    var regionCode = this.getRegionCodeForNumber(number);
    return this.isValidNumberForRegion(number, regionCode);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isValidNumberForRegion =
    function(number, regionCode) {
        var countryCode = number.getCountryCodeOrDefault();
        var metadata =
            this.getMetadataForRegionOrCallingCode_(countryCode, regionCode);
        if (metadata == null ||
            (i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY !=
                regionCode &&
                countryCode != this.getCountryCodeForValidRegion_(regionCode))) {
            return false;
        }
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        return this.getNumberTypeHelper_(nationalSignificantNumber, metadata) !=
            i18n.phonenumbers.PhoneNumberType.UNKNOWN;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getRegionCodeForNumber =
    function(number) {
        if (number == null) {
            return null;
        }
        var countryCode = number.getCountryCodeOrDefault();
        var regions =
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[countryCode];
        if (regions == null) {
            return null;
        }
        if (regions.length == 1) {
            return regions[0];
        } else {
            return this.getRegionCodeForNumberFromRegionList_(number, regions);
        }
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    getRegionCodeForNumberFromRegionList_ = function(number, regionCodes) {
    var nationalNumber = this.getNationalSignificantNumber(number);
    var regionCode;
    var regionCodesLength = regionCodes.length;
    for (var i = 0; i < regionCodesLength; i++) {
        regionCode = regionCodes[i];
        var metadata = this.getMetadataForRegion(regionCode);
        if (metadata.hasLeadingDigits()) {
            if (nationalNumber.search(metadata.getLeadingDigits()) == 0) {
                return regionCode;
            }
        } else if (this.getNumberTypeHelper_(nationalNumber, metadata) !=
            i18n.phonenumbers.PhoneNumberType.UNKNOWN) {
            return regionCode;
        }
    }
    return null;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.getRegionCodeForCountryCode =
    function(countryCallingCode) {
        var regionCodes =
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[countryCallingCode];
        return regionCodes == null ?
            i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_ : regionCodes[0];
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getRegionCodesForCountryCode =
    function(countryCallingCode) {
        var regionCodes =
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[countryCallingCode];
        return regionCodes == null ? [] : regionCodes;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getCountryCodeForRegion =
    function(regionCode) {
        if (!this.isValidRegionCode_(regionCode)) {
            return 0;
        }
        return this.getCountryCodeForValidRegion_(regionCode);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getCountryCodeForValidRegion_ =
    function(regionCode) {
        var metadata = this.getMetadataForRegion(regionCode);
        if (metadata == null) {
            throw new Error('Invalid region code: ' + regionCode);
        }
        return metadata.getCountryCodeOrDefault();
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.getNddPrefixForRegion = function(
    regionCode, stripNonDigits) {
    var metadata = this.getMetadataForRegion(regionCode);
    if (metadata == null) {
        return null;
    }
    var nationalPrefix = metadata.getNationalPrefixOrDefault();
    if (nationalPrefix.length == 0) {
        return null;
    }
    if (stripNonDigits) {
        nationalPrefix = nationalPrefix.replace('~', '');
    }
    return nationalPrefix;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isNANPACountry =
    function(regionCode) {
        return regionCode != null && goog.array.contains(
            i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[
                i18n.phonenumbers.PhoneNumberUtil.NANPA_COUNTRY_CODE_],
            regionCode.toUpperCase());
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isAlphaNumber = function(number) {
    if (!i18n.phonenumbers.PhoneNumberUtil.isViablePhoneNumber(number)) {
        return false;
    }
    var strippedNumber = new goog.string.StringBuffer(number);
    this.maybeStripExtension(strippedNumber);
    return i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
        i18n.phonenumbers.PhoneNumberUtil.VALID_ALPHA_PHONE_PATTERN_,
        strippedNumber.toString());
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumber =
    function(number) {
        var result = this.isPossibleNumberWithReason(number);
        return result ==
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE ||
            result ==
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE_LOCAL_ONLY;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumberForType =
    function(number, type) {
        var result = this.isPossibleNumberForTypeWithReason(number, type);
        return result ==
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE ||
            result ==
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE_LOCAL_ONLY;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.testNumberLength_ =
    function(number, metadata) {
        return this.testNumberLengthForType_(
            number, metadata, i18n.phonenumbers.PhoneNumberType.UNKNOWN);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.testNumberLengthForType_ =
    function(number, metadata, type) {
        var descForType =
            i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(metadata, type);
        var possibleLengths = descForType.possibleLengthCount() == 0 ?
            metadata.getGeneralDesc().possibleLengthArray() :
            descForType.possibleLengthArray();
        var localLengths = descForType.possibleLengthLocalOnlyArray();
        if (type == i18n.phonenumbers.PhoneNumberType.FIXED_LINE_OR_MOBILE) {
            if (!i18n.phonenumbers.PhoneNumberUtil.descHasPossibleNumberData_(
                    i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(
                        metadata, i18n.phonenumbers.PhoneNumberType.FIXED_LINE))) {
                return this.testNumberLengthForType_(
                    number, metadata, i18n.phonenumbers.PhoneNumberType.MOBILE);
            } else {
                var mobileDesc = i18n.phonenumbers.PhoneNumberUtil.getNumberDescByType_(
                    metadata, i18n.phonenumbers.PhoneNumberType.MOBILE);
                if (i18n.phonenumbers.PhoneNumberUtil.descHasPossibleNumberData_(
                        mobileDesc)) {
                    possibleLengths = possibleLengths.concat(
                        mobileDesc.possibleLengthCount() == 0 ?
                            metadata.getGeneralDesc().possibleLengthArray() :
                            mobileDesc.possibleLengthArray());
                    goog.array.sort(possibleLengths);
                    if (localLengths.length == 0) {
                        localLengths = mobileDesc.possibleLengthLocalOnlyArray();
                    } else {
                        localLengths = localLengths.concat(
                            mobileDesc.possibleLengthLocalOnlyArray());
                        goog.array.sort(localLengths);
                    }
                }
            }
        }
        if (possibleLengths[0] == -1) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.INVALID_LENGTH;
        }
        var actualLength = number.length;
        if (goog.array.indexOf(localLengths, actualLength) > -1) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult
                .IS_POSSIBLE_LOCAL_ONLY;
        }
        var minimumLength = possibleLengths[0];
        if (minimumLength == actualLength) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE;
        } else if (minimumLength > actualLength) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT;
        } else if (possibleLengths[possibleLengths.length - 1] < actualLength) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_LONG;
        }
        return (goog.array.indexOf(possibleLengths, actualLength, 1) > -1) ?
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE :
            i18n.phonenumbers.PhoneNumberUtil.ValidationResult.INVALID_LENGTH;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumberWithReason =
    function(number) {
        return this.isPossibleNumberForTypeWithReason(
            number, i18n.phonenumbers.PhoneNumberType.UNKNOWN);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumberForTypeWithReason =
    function(number, type) {
        var nationalNumber = this.getNationalSignificantNumber(number);
        var countryCode = number.getCountryCodeOrDefault();
        if (!this.hasValidCountryCallingCode_(countryCode)) {
            return i18n.phonenumbers.PhoneNumberUtil.ValidationResult
                .INVALID_COUNTRY_CODE;
        }
        var regionCode = this.getRegionCodeForCountryCode(countryCode);
        var metadata =
            this.getMetadataForRegionOrCallingCode_(countryCode, regionCode);
        return this.testNumberLengthForType_(nationalNumber, metadata, type);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isPossibleNumberString =
    function(number, regionDialingFrom) {
        try {
            return this.isPossibleNumber(this.parse(number, regionDialingFrom));
        } catch (e) {
            return false;
        }
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.truncateTooLongNumber =
    function(number) {
        if (this.isValidNumber(number)) {
            return true;
        }
        var numberCopy = number.clone();
        var nationalNumber = number.getNationalNumberOrDefault();
        do {
            nationalNumber = Math.floor(nationalNumber / 10);
            numberCopy.setNationalNumber(nationalNumber);
            if (nationalNumber == 0 ||
                this.isPossibleNumberWithReason(numberCopy) ==
                i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT) {
                return false;
            }
        } while (!this.isValidNumber(numberCopy));
        number.setNationalNumber(nationalNumber);
        return true;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.extractCountryCode =
    function(fullNumber, nationalNumber) {
        var fullNumberStr = fullNumber.toString();
        if ((fullNumberStr.length == 0) || (fullNumberStr.charAt(0) == '0')) {
            return 0;
        }
        var potentialCountryCode;
        var numberLength = fullNumberStr.length;
        for (var i = 1;
             i <= i18n.phonenumbers.PhoneNumberUtil.MAX_LENGTH_COUNTRY_CODE_ &&
             i <= numberLength; ++i) {
            potentialCountryCode = parseInt(fullNumberStr.substring(0, i), 10);
            if (potentialCountryCode in
                i18n.phonenumbers.metadata.countryCodeToRegionCodeMap) {
                nationalNumber.append(fullNumberStr.substring(i));
                return potentialCountryCode;
            }
        }
        return 0;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.maybeExtractCountryCode =
    function(number, defaultRegionMetadata, nationalNumber,
             keepRawInput, phoneNumber) {
        if (number.length == 0) {
            return 0;
        }
        var fullNumber = new goog.string.StringBuffer(number);
        var possibleCountryIddPrefix;
        if (defaultRegionMetadata != null) {
            possibleCountryIddPrefix = defaultRegionMetadata.getInternationalPrefix();
        }
        if (possibleCountryIddPrefix == null) {
            possibleCountryIddPrefix = 'NonMatch';
        }
        var countryCodeSource = this.maybeStripInternationalPrefixAndNormalize(
            fullNumber, possibleCountryIddPrefix);
        if (keepRawInput) {
            phoneNumber.setCountryCodeSource(countryCodeSource);
        }
        if (countryCodeSource !=
            i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_DEFAULT_COUNTRY) {
            if (fullNumber.getLength() <=
                i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_) {
                throw new Error(i18n.phonenumbers.Error.TOO_SHORT_AFTER_IDD);
            }
            var potentialCountryCode = this.extractCountryCode(fullNumber,
                nationalNumber);
            if (potentialCountryCode != 0) {
                phoneNumber.setCountryCode(potentialCountryCode);
                return potentialCountryCode;
            }
            throw new Error(i18n.phonenumbers.Error.INVALID_COUNTRY_CODE);
        } else if (defaultRegionMetadata != null) {
            var defaultCountryCode = defaultRegionMetadata.getCountryCodeOrDefault();
            var defaultCountryCodeString = '' + defaultCountryCode;
            var normalizedNumber = fullNumber.toString();
            if (goog.string.startsWith(normalizedNumber, defaultCountryCodeString)) {
                var potentialNationalNumber = new goog.string.StringBuffer(
                    normalizedNumber.substring(defaultCountryCodeString.length));
                var generalDesc = defaultRegionMetadata.getGeneralDesc();
                var validNumberPattern =
                    new RegExp(generalDesc.getNationalNumberPatternOrDefault());
                this.maybeStripNationalPrefixAndCarrierCode(
                    potentialNationalNumber, defaultRegionMetadata, null);
                var potentialNationalNumberStr = potentialNationalNumber.toString();
                if ((!i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                        validNumberPattern, fullNumber.toString()) &&
                        i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                            validNumberPattern, potentialNationalNumberStr)) ||
                    this.testNumberLength_(
                        fullNumber.toString(), defaultRegionMetadata) ==
                    i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_LONG) {
                    nationalNumber.append(potentialNationalNumberStr);
                    if (keepRawInput) {
                        phoneNumber.setCountryCodeSource(
                            i18n.phonenumbers.PhoneNumber.CountryCodeSource
                                .FROM_NUMBER_WITHOUT_PLUS_SIGN);
                    }
                    phoneNumber.setCountryCode(defaultCountryCode);
                    return defaultCountryCode;
                }
            }
        }
        phoneNumber.setCountryCode(0);
        return 0;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.parsePrefixAsIdd_ =
    function(iddPattern, number) {
        var numberStr = number.toString();
        if (numberStr.search(iddPattern) == 0) {
            var matchEnd = numberStr.match(iddPattern)[0].length;
            var matchedGroups = numberStr.substring(matchEnd).match(
                i18n.phonenumbers.PhoneNumberUtil.CAPTURING_DIGIT_PATTERN);
            if (matchedGroups && matchedGroups[1] != null &&
                matchedGroups[1].length > 0) {
                var normalizedGroup =
                    i18n.phonenumbers.PhoneNumberUtil.normalizeDigitsOnly(
                        matchedGroups[1]);
                if (normalizedGroup == '0') {
                    return false;
                }
            }
            number.clear();
            number.append(numberStr.substring(matchEnd));
            return true;
        }
        return false;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.
    maybeStripInternationalPrefixAndNormalize = function(number,
                                                         possibleIddPrefix) {
    var numberStr = number.toString();
    if (numberStr.length == 0) {
        return i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_DEFAULT_COUNTRY;
    }
    if (i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN
            .test(numberStr)) {
        numberStr = numberStr.replace(
            i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN, '');
        number.clear();
        number.append(i18n.phonenumbers.PhoneNumberUtil.normalize(numberStr));
        return i18n.phonenumbers.PhoneNumber.CountryCodeSource
            .FROM_NUMBER_WITH_PLUS_SIGN;
    }
    var iddPattern = new RegExp(possibleIddPrefix);
    i18n.phonenumbers.PhoneNumberUtil.normalizeSB_(number);
    return this.parsePrefixAsIdd_(iddPattern, number) ?
        i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_NUMBER_WITH_IDD :
        i18n.phonenumbers.PhoneNumber.CountryCodeSource.FROM_DEFAULT_COUNTRY;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.
    maybeStripNationalPrefixAndCarrierCode = function(number, metadata,
                                                      carrierCode) {
    var numberStr = number.toString();
    var numberLength = numberStr.length;
    var possibleNationalPrefix = metadata.getNationalPrefixForParsing();
    if (numberLength == 0 || possibleNationalPrefix == null ||
        possibleNationalPrefix.length == 0) {
        return false;
    }
    var prefixPattern = new RegExp('^(?:' + possibleNationalPrefix + ')');
    var prefixMatcher = prefixPattern.exec(numberStr);
    if (prefixMatcher) {
        var nationalNumberRule = new RegExp(
            metadata.getGeneralDesc().getNationalNumberPatternOrDefault());
        var isViableOriginalNumber =
            i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                nationalNumberRule, numberStr);
        var numOfGroups = prefixMatcher.length - 1;
        var transformRule = metadata.getNationalPrefixTransformRule();
        var noTransform = transformRule == null || transformRule.length == 0 ||
            prefixMatcher[numOfGroups] == null ||
            prefixMatcher[numOfGroups].length == 0;
        if (noTransform) {
            if (isViableOriginalNumber &&
                !i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                    nationalNumberRule,
                    numberStr.substring(prefixMatcher[0].length))) {
                return false;
            }
            if (carrierCode != null &&
                numOfGroups > 0 && prefixMatcher[numOfGroups] != null) {
                carrierCode.append(prefixMatcher[1]);
            }
            number.set(numberStr.substring(prefixMatcher[0].length));
            return true;
        } else {
            var transformedNumber;
            transformedNumber = numberStr.replace(prefixPattern, transformRule);
            if (isViableOriginalNumber &&
                !i18n.phonenumbers.PhoneNumberUtil.matchesEntirely(
                    nationalNumberRule, transformedNumber)) {
                return false;
            }
            if (carrierCode != null && numOfGroups > 0) {
                carrierCode.append(prefixMatcher[1]);
            }
            number.set(transformedNumber);
            return true;
        }
    }
    return false;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.maybeStripExtension =
    function(number) {
        var numberStr = number.toString();
        var mStart =
            numberStr.search(i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERN_);
        if (mStart >= 0 && i18n.phonenumbers.PhoneNumberUtil.isViablePhoneNumber(
                numberStr.substring(0, mStart))) {
            var matchedGroups =
                numberStr.match(i18n.phonenumbers.PhoneNumberUtil.EXTN_PATTERN_);
            var matchedGroupsLength = matchedGroups.length;
            for (var i = 1; i < matchedGroupsLength; ++i) {
                if (matchedGroups[i] != null && matchedGroups[i].length > 0) {
                    number.clear();
                    number.append(numberStr.substring(0, mStart));
                    return matchedGroups[i];
                }
            }
        }
        return '';
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.checkRegionForParsing_ = function(
    numberToParse, defaultRegion) {
    return this.isValidRegionCode_(defaultRegion) ||
        (numberToParse != null && numberToParse.length > 0 &&
            i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN.test(
                numberToParse));
};
i18n.phonenumbers.PhoneNumberUtil.prototype.parse = function(numberToParse,
                                                             defaultRegion) {
    return this.parseHelper_(numberToParse, defaultRegion, false, true);
};
i18n.phonenumbers.PhoneNumberUtil.prototype.parseAndKeepRawInput =
    function(numberToParse, defaultRegion) {
        if (!this.isValidRegionCode_(defaultRegion)) {
            if (numberToParse.length > 0 && numberToParse.charAt(0) !=
                i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN) {
                throw new Error(i18n.phonenumbers.Error.INVALID_COUNTRY_CODE);
            }
        }
        return this.parseHelper_(numberToParse, defaultRegion, true, true);
    };
i18n.phonenumbers.PhoneNumberUtil.setItalianLeadingZerosForPhoneNumber_ =
    function(nationalNumber, phoneNumber) {
        if (nationalNumber.length > 1 && nationalNumber.charAt(0) == '0') {
            phoneNumber.setItalianLeadingZero(true);
            var numberOfLeadingZeros = 1;
            while (numberOfLeadingZeros < nationalNumber.length - 1 &&
            nationalNumber.charAt(numberOfLeadingZeros) == '0') {
                numberOfLeadingZeros++;
            }
            if (numberOfLeadingZeros != 1) {
                phoneNumber.setNumberOfLeadingZeros(numberOfLeadingZeros);
            }
        }
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.parseHelper_ =
    function(numberToParse, defaultRegion, keepRawInput, checkRegion) {
        if (numberToParse == null) {
            throw new Error(i18n.phonenumbers.Error.NOT_A_NUMBER);
        } else if (numberToParse.length >
            i18n.phonenumbers.PhoneNumberUtil.MAX_INPUT_STRING_LENGTH_) {
            throw new Error(i18n.phonenumbers.Error.TOO_LONG);
        }
        var nationalNumber = new goog.string.StringBuffer();
        this.buildNationalNumberForParsing_(numberToParse, nationalNumber);
        if (!i18n.phonenumbers.PhoneNumberUtil.isViablePhoneNumber(
                nationalNumber.toString())) {
            throw new Error(i18n.phonenumbers.Error.NOT_A_NUMBER);
        }
        if (checkRegion &&
            !this.checkRegionForParsing_(nationalNumber.toString(), defaultRegion)) {
            throw new Error(i18n.phonenumbers.Error.INVALID_COUNTRY_CODE);
        }
        var phoneNumber = new i18n.phonenumbers.PhoneNumber();
        if (keepRawInput) {
            phoneNumber.setRawInput(numberToParse);
        }
        var extension = this.maybeStripExtension(nationalNumber);
        if (extension.length > 0) {
            phoneNumber.setExtension(extension);
        }
        var regionMetadata = this.getMetadataForRegion(defaultRegion);
        var normalizedNationalNumber = new goog.string.StringBuffer();
        var countryCode = 0;
        var nationalNumberStr = nationalNumber.toString();
        try {
            countryCode = this.maybeExtractCountryCode(nationalNumberStr,
                regionMetadata, normalizedNationalNumber, keepRawInput, phoneNumber);
        } catch (e) {
            if (e.message == i18n.phonenumbers.Error.INVALID_COUNTRY_CODE &&
                i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN
                    .test(nationalNumberStr)) {
                nationalNumberStr = nationalNumberStr.replace(
                    i18n.phonenumbers.PhoneNumberUtil.LEADING_PLUS_CHARS_PATTERN, '');
                countryCode = this.maybeExtractCountryCode(nationalNumberStr,
                    regionMetadata, normalizedNationalNumber, keepRawInput, phoneNumber);
                if (countryCode == 0) {
                    throw e;
                }
            } else {
                throw e;
            }
        }
        if (countryCode != 0) {
            var phoneNumberRegion = this.getRegionCodeForCountryCode(countryCode);
            if (phoneNumberRegion != defaultRegion) {
                regionMetadata = this.getMetadataForRegionOrCallingCode_(
                    countryCode, phoneNumberRegion);
            }
        } else {
            i18n.phonenumbers.PhoneNumberUtil.normalizeSB_(nationalNumber);
            normalizedNationalNumber.append(nationalNumber.toString());
            if (defaultRegion != null) {
                countryCode = regionMetadata.getCountryCodeOrDefault();
                phoneNumber.setCountryCode(countryCode);
            } else if (keepRawInput) {
                phoneNumber.clearCountryCodeSource();
            }
        }
        if (normalizedNationalNumber.getLength() <
            i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_) {
            throw new Error(i18n.phonenumbers.Error.TOO_SHORT_NSN);
        }
        if (regionMetadata != null) {
            var carrierCode = new goog.string.StringBuffer();
            var potentialNationalNumber =
                new goog.string.StringBuffer(normalizedNationalNumber.toString());
            this.maybeStripNationalPrefixAndCarrierCode(
                potentialNationalNumber, regionMetadata, carrierCode);
            var validationResult = this.testNumberLength_(
                potentialNationalNumber.toString(), regionMetadata);
            var validationResults = i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
            if (validationResult != validationResults.TOO_SHORT &&
                validationResult != validationResults.IS_POSSIBLE_LOCAL_ONLY &&
                validationResult != validationResults.INVALID_LENGTH) {
                normalizedNationalNumber = potentialNationalNumber;
                if (keepRawInput && carrierCode.toString().length > 0) {
                    phoneNumber.setPreferredDomesticCarrierCode(carrierCode.toString());
                }
            }
        }
        var normalizedNationalNumberStr = normalizedNationalNumber.toString();
        var lengthOfNationalNumber = normalizedNationalNumberStr.length;
        if (lengthOfNationalNumber <
            i18n.phonenumbers.PhoneNumberUtil.MIN_LENGTH_FOR_NSN_) {
            throw new Error(i18n.phonenumbers.Error.TOO_SHORT_NSN);
        }
        if (lengthOfNationalNumber >
            i18n.phonenumbers.PhoneNumberUtil.MAX_LENGTH_FOR_NSN_) {
            throw new Error(i18n.phonenumbers.Error.TOO_LONG);
        }
        i18n.phonenumbers.PhoneNumberUtil.setItalianLeadingZerosForPhoneNumber_(
            normalizedNationalNumberStr, phoneNumber);
        phoneNumber.setNationalNumber(parseInt(normalizedNationalNumberStr, 10));
        return phoneNumber;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.buildNationalNumberForParsing_ =
    function(numberToParse, nationalNumber) {
        var indexOfPhoneContext = numberToParse.indexOf(
            i18n.phonenumbers.PhoneNumberUtil.RFC3966_PHONE_CONTEXT_);
        if (indexOfPhoneContext >= 0) {
            var phoneContextStart = indexOfPhoneContext +
                i18n.phonenumbers.PhoneNumberUtil.RFC3966_PHONE_CONTEXT_.length;
            if (numberToParse.charAt(phoneContextStart) ==
                i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN) {
                var phoneContextEnd = numberToParse.indexOf(';', phoneContextStart);
                if (phoneContextEnd > 0) {
                    nationalNumber.append(numberToParse.substring(phoneContextStart,
                        phoneContextEnd));
                } else {
                    nationalNumber.append(numberToParse.substring(phoneContextStart));
                }
            }
            var indexOfRfc3966Prefix = numberToParse.indexOf(
                i18n.phonenumbers.PhoneNumberUtil.RFC3966_PREFIX_);
            var indexOfNationalNumber = (indexOfRfc3966Prefix >= 0) ?
                indexOfRfc3966Prefix +
                i18n.phonenumbers.PhoneNumberUtil.RFC3966_PREFIX_.length : 0;
            nationalNumber.append(numberToParse.substring(indexOfNationalNumber,
                indexOfPhoneContext));
        } else {
            nationalNumber.append(
                i18n.phonenumbers.PhoneNumberUtil.extractPossibleNumber(numberToParse));
        }
        var nationalNumberStr = nationalNumber.toString();
        var indexOfIsdn = nationalNumberStr.indexOf(
            i18n.phonenumbers.PhoneNumberUtil.RFC3966_ISDN_SUBADDRESS_);
        if (indexOfIsdn > 0) {
            nationalNumber.clear();
            nationalNumber.append(nationalNumberStr.substring(0, indexOfIsdn));
        }
    };
i18n.phonenumbers.PhoneNumberUtil.copyCoreFieldsOnly_ = function(numberIn) {
    var phoneNumber = new i18n.phonenumbers.PhoneNumber();
    phoneNumber.setCountryCode(numberIn.getCountryCodeOrDefault());
    phoneNumber.setNationalNumber(numberIn.getNationalNumberOrDefault());
    if (numberIn.getExtensionOrDefault().length > 0) {
        phoneNumber.setExtension(numberIn.getExtensionOrDefault());
    }
    if (numberIn.getItalianLeadingZero()) {
        phoneNumber.setItalianLeadingZero(true);
        phoneNumber.setNumberOfLeadingZeros(
            numberIn.getNumberOfLeadingZerosOrDefault());
    }
    return phoneNumber;
};
i18n.phonenumbers.PhoneNumberUtil.prototype.isNumberMatch =
    function(firstNumberIn, secondNumberIn) {
        var firstNumber;
        var secondNumber;
        if (typeof firstNumberIn == 'string') {
            try {
                firstNumber = this.parse(
                    firstNumberIn, i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_);
            } catch (e) {
                if (e.message != i18n.phonenumbers.Error.INVALID_COUNTRY_CODE) {
                    return i18n.phonenumbers.PhoneNumberUtil.MatchType.NOT_A_NUMBER;
                }
                if (typeof secondNumberIn != 'string') {
                    var secondNumberRegion = this.getRegionCodeForCountryCode(
                        secondNumberIn.getCountryCodeOrDefault());
                    if (secondNumberRegion !=
                        i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_) {
                        try {
                            firstNumber = this.parse(firstNumberIn, secondNumberRegion);
                        } catch (e2) {
                            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NOT_A_NUMBER;
                        }
                        var match = this.isNumberMatch(firstNumber, secondNumberIn);
                        if (match ==
                            i18n.phonenumbers.PhoneNumberUtil.MatchType.EXACT_MATCH) {
                            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NSN_MATCH;
                        }
                        return match;
                    }
                }
                try {
                    firstNumber = this.parseHelper_(firstNumberIn, null, false, false);
                } catch (e2) {
                    return i18n.phonenumbers.PhoneNumberUtil.MatchType.NOT_A_NUMBER;
                }
            }
        } else {
            firstNumber = firstNumberIn.clone();
        }
        if (typeof secondNumberIn == 'string') {
            try {
                secondNumber = this.parse(
                    secondNumberIn, i18n.phonenumbers.PhoneNumberUtil.UNKNOWN_REGION_);
                return this.isNumberMatch(firstNumberIn, secondNumber);
            } catch (e) {
                if (e.message != i18n.phonenumbers.Error.INVALID_COUNTRY_CODE) {
                    return i18n.phonenumbers.PhoneNumberUtil.MatchType.NOT_A_NUMBER;
                }
                return this.isNumberMatch(secondNumberIn, firstNumber);
            }
        } else {
            secondNumber = secondNumberIn.clone();
        }
        var firstNumberToCompare =
            i18n.phonenumbers.PhoneNumberUtil.copyCoreFieldsOnly_(firstNumber);
        var secondNumberToCompare =
            i18n.phonenumbers.PhoneNumberUtil.copyCoreFieldsOnly_(secondNumber);
        if (firstNumberToCompare.hasExtension() &&
            secondNumberToCompare.hasExtension() &&
            firstNumberToCompare.getExtension() !=
            secondNumberToCompare.getExtension()) {
            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NO_MATCH;
        }
        var firstNumberCountryCode = firstNumberToCompare.getCountryCodeOrDefault();
        var secondNumberCountryCode = secondNumberToCompare.getCountryCodeOrDefault();
        if (firstNumberCountryCode != 0 && secondNumberCountryCode != 0) {
            if (firstNumberToCompare.equals(secondNumberToCompare)) {
                return i18n.phonenumbers.PhoneNumberUtil.MatchType.EXACT_MATCH;
            } else if (firstNumberCountryCode == secondNumberCountryCode &&
                this.isNationalNumberSuffixOfTheOther_(
                    firstNumberToCompare, secondNumberToCompare)) {
                return i18n.phonenumbers.PhoneNumberUtil.MatchType.SHORT_NSN_MATCH;
            }
            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NO_MATCH;
        }
        firstNumberToCompare.setCountryCode(0);
        secondNumberToCompare.setCountryCode(0);
        if (firstNumberToCompare.equals(secondNumberToCompare)) {
            return i18n.phonenumbers.PhoneNumberUtil.MatchType.NSN_MATCH;
        }
        if (this.isNationalNumberSuffixOfTheOther_(firstNumberToCompare,
                secondNumberToCompare)) {
            return i18n.phonenumbers.PhoneNumberUtil.MatchType.SHORT_NSN_MATCH;
        }
        return i18n.phonenumbers.PhoneNumberUtil.MatchType.NO_MATCH;
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.isNationalNumberSuffixOfTheOther_ =
    function(firstNumber, secondNumber) {
        var firstNumberNationalNumber = '' + firstNumber.getNationalNumber();
        var secondNumberNationalNumber = '' + secondNumber.getNationalNumber();
        return goog.string.endsWith(firstNumberNationalNumber,
            secondNumberNationalNumber) ||
            goog.string.endsWith(secondNumberNationalNumber,
                firstNumberNationalNumber);
    };
i18n.phonenumbers.PhoneNumberUtil.prototype.canBeInternationallyDialled =
    function(number) {
        var metadata = this.getMetadataForRegion(this.getRegionCodeForNumber(number));
        if (metadata == null) {
            return true;
        }
        var nationalSignificantNumber = this.getNationalSignificantNumber(number);
        return !this.isNumberMatchingDesc_(nationalSignificantNumber,
            metadata.getNoInternationalDialling());
    };
i18n.phonenumbers.PhoneNumberUtil.matchesEntirely = function(regex, str) {
    var matchedGroups = (typeof regex == 'string') ?
        str.match('^(?:' + regex + ')$') : str.match(regex);
    if (matchedGroups && matchedGroups[0].length == str.length) {
        return true;
    }
    return false;
};
i18n.phonenumbers.PhoneNumberUtil.matchesPrefix = function(regex, str) {
    var matchedGroups = (typeof regex == 'string') ?
        str.match('^(?:' + regex + ')') : str.match(regex);
    if (matchedGroups && goog.string.startsWith(str, matchedGroups[0])) {
        return true;
    }
    return false;
};

/*phonenumberutil.js*/


/*asyoutypeformatter.js*/

i18n.phonenumbers.AsYouTypeFormatter = function(regionCode) {
    this.DIGIT_PLACEHOLDER_ = '\u2008';
    this.DIGIT_PATTERN_ = new RegExp(this.DIGIT_PLACEHOLDER_);
    this.currentOutput_ = '';
    this.formattingTemplate_ = new goog.string.StringBuffer();
    this.currentFormattingPattern_ = '';
    this.accruedInput_ = new goog.string.StringBuffer();
    this.accruedInputWithoutFormatting_ = new goog.string.StringBuffer();
    this.ableToFormat_ = true;
    this.inputHasFormatting_ = false;
    this.isCompleteNumber_ = false;
    this.isExpectingCountryCallingCode_ = false;
    this.phoneUtil_ = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    this.lastMatchPosition_ = 0;
    this.originalPosition_ = 0;
    this.positionToRemember_ = 0;
    this.prefixBeforeNationalNumber_ = new goog.string.StringBuffer();
    this.shouldAddSpaceAfterNationalPrefix_ = false;
    this.extractedNationalPrefix_ = '';
    this.nationalNumber_ = new goog.string.StringBuffer();
    this.possibleFormats_ = [];
    this.defaultCountry_ = regionCode;
    this.currentMetadata_ = this.getMetadataForRegion_(this.defaultCountry_);
    this.defaultMetadata_ = this.currentMetadata_;
};
i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_ = ' ';
i18n.phonenumbers.AsYouTypeFormatter.EMPTY_METADATA_ =
    new i18n.phonenumbers.PhoneMetadata();
i18n.phonenumbers.AsYouTypeFormatter.EMPTY_METADATA_
    .setInternationalPrefix('NA');
i18n.phonenumbers.AsYouTypeFormatter.CHARACTER_CLASS_PATTERN_ =
    /\[([^\[\]])*\]/g;
i18n.phonenumbers.AsYouTypeFormatter.STANDALONE_DIGIT_PATTERN_ =
    /\d(?=[^,}][^,}])/g;
i18n.phonenumbers.AsYouTypeFormatter.ELIGIBLE_FORMAT_PATTERN_ = new RegExp(
    '^[' + i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION + ']*' +
    '(\\$\\d[' + i18n.phonenumbers.PhoneNumberUtil.VALID_PUNCTUATION + ']*)+$');
i18n.phonenumbers.AsYouTypeFormatter.NATIONAL_PREFIX_SEPARATORS_PATTERN_ =
    /[- ]/;
i18n.phonenumbers.AsYouTypeFormatter.MIN_LEADING_DIGITS_LENGTH_ = 3;
i18n.phonenumbers.AsYouTypeFormatter.prototype.getMetadataForRegion_ =
    function(regionCode) {
        var countryCallingCode = this.phoneUtil_.getCountryCodeForRegion(regionCode);
        var mainCountry =
            this.phoneUtil_.getRegionCodeForCountryCode(countryCallingCode);
        var metadata = this.phoneUtil_.getMetadataForRegion(mainCountry);
        if (metadata != null) {
            return metadata;
        }
        return i18n.phonenumbers.AsYouTypeFormatter.EMPTY_METADATA_;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.maybeCreateNewTemplate_ =
    function() {
        var possibleFormatsLength = this.possibleFormats_.length;
        for (var i = 0; i < possibleFormatsLength; ++i) {
            var numberFormat = this.possibleFormats_[i];
            var pattern = numberFormat.getPatternOrDefault();
            if (this.currentFormattingPattern_ == pattern) {
                return false;
            }
            if (this.createFormattingTemplate_(numberFormat)) {
                this.currentFormattingPattern_ = pattern;
                this.shouldAddSpaceAfterNationalPrefix_ =
                    i18n.phonenumbers.AsYouTypeFormatter.
                    NATIONAL_PREFIX_SEPARATORS_PATTERN_.test(
                        numberFormat.getNationalPrefixFormattingRule());
                this.lastMatchPosition_ = 0;
                return true;
            }
        }
        this.ableToFormat_ = false;
        return false;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.getAvailableFormats_ =
    function(leadingDigits) {
        var formatList =
            (this.isCompleteNumber_ &&
                this.currentMetadata_.intlNumberFormatCount() > 0) ?
                this.currentMetadata_.intlNumberFormatArray() :
                this.currentMetadata_.numberFormatArray();
        var formatListLength = formatList.length;
        for (var i = 0; i < formatListLength; ++i) {
            var format = formatList[i];
            var nationalPrefixIsUsedByCountry =
                this.currentMetadata_.hasNationalPrefix();
            if (!nationalPrefixIsUsedByCountry || this.isCompleteNumber_ ||
                format.getNationalPrefixOptionalWhenFormatting() ||
                this.phoneUtil_.formattingRuleHasFirstGroupOnly(
                    format.getNationalPrefixFormattingRuleOrDefault())) {
                if (this.isFormatEligible_(format.getFormatOrDefault())) {
                    this.possibleFormats_.push(format);
                }
            }
        }
        this.narrowDownPossibleFormats_(leadingDigits);
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.isFormatEligible_ =
    function(format) {
        return i18n.phonenumbers.AsYouTypeFormatter.ELIGIBLE_FORMAT_PATTERN_
            .test(format);
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.narrowDownPossibleFormats_ =
    function(leadingDigits) {
        var possibleFormats = [];
        var indexOfLeadingDigitsPattern =
            leadingDigits.length -
            i18n.phonenumbers.AsYouTypeFormatter.MIN_LEADING_DIGITS_LENGTH_;
        var possibleFormatsLength = this.possibleFormats_.length;
        for (var i = 0; i < possibleFormatsLength; ++i) {
            var format = this.possibleFormats_[i];
            if (format.leadingDigitsPatternCount() == 0) {
                possibleFormats.push(this.possibleFormats_[i]);
                continue;
            }
            var lastLeadingDigitsPattern = Math.min(
                indexOfLeadingDigitsPattern, format.leadingDigitsPatternCount() - 1);
            var leadingDigitsPattern =          (format.getLeadingDigitsPattern(lastLeadingDigitsPattern));
            if (leadingDigits.search(leadingDigitsPattern) == 0) {
                possibleFormats.push(this.possibleFormats_[i]);
            }
        }
        this.possibleFormats_ = possibleFormats;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.createFormattingTemplate_ =
    function(format) {
        var numberPattern = format.getPatternOrDefault();
        if (numberPattern.indexOf('|') != -1) {
            return false;
        }
        numberPattern = numberPattern.replace(
            i18n.phonenumbers.AsYouTypeFormatter.CHARACTER_CLASS_PATTERN_, '\\d');
        numberPattern = numberPattern.replace(
            i18n.phonenumbers.AsYouTypeFormatter.STANDALONE_DIGIT_PATTERN_, '\\d');
        this.formattingTemplate_.clear();
        var tempTemplate = this.getFormattingTemplate_(numberPattern,
            format.getFormatOrDefault());
        if (tempTemplate.length > 0) {
            this.formattingTemplate_.append(tempTemplate);
            return true;
        }
        return false;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.getFormattingTemplate_ =
    function(numberPattern, numberFormat) {
        var longestPhoneNumber = '999999999999999';
        var m = longestPhoneNumber.match(numberPattern);
        var aPhoneNumber = m[0];
        if (aPhoneNumber.length < this.nationalNumber_.getLength()) {
            return '';
        }
        var template = aPhoneNumber.replace(new RegExp(numberPattern, 'g'),
            numberFormat);
        template = template.replace(new RegExp('9', 'g'), this.DIGIT_PLACEHOLDER_);
        return template;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.clear = function() {
    this.currentOutput_ = '';
    this.accruedInput_.clear();
    this.accruedInputWithoutFormatting_.clear();
    this.formattingTemplate_.clear();
    this.lastMatchPosition_ = 0;
    this.currentFormattingPattern_ = '';
    this.prefixBeforeNationalNumber_.clear();
    this.extractedNationalPrefix_ = '';
    this.nationalNumber_.clear();
    this.ableToFormat_ = true;
    this.inputHasFormatting_ = false;
    this.positionToRemember_ = 0;
    this.originalPosition_ = 0;
    this.isCompleteNumber_ = false;
    this.isExpectingCountryCallingCode_ = false;
    this.possibleFormats_ = [];
    this.shouldAddSpaceAfterNationalPrefix_ = false;
    if (this.currentMetadata_ != this.defaultMetadata_) {
        this.currentMetadata_ = this.getMetadataForRegion_(this.defaultCountry_);
    }
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.inputDigit = function(nextChar) {
    this.currentOutput_ =
        this.inputDigitWithOptionToRememberPosition_(nextChar, false);
    return this.currentOutput_;
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.inputDigitAndRememberPosition =
    function(nextChar) {
        this.currentOutput_ =
            this.inputDigitWithOptionToRememberPosition_(nextChar, true);
        return this.currentOutput_;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    inputDigitWithOptionToRememberPosition_ = function(nextChar,
                                                       rememberPosition) {
    this.accruedInput_.append(nextChar);
    if (rememberPosition) {
        this.originalPosition_ = this.accruedInput_.getLength();
    }
    if (!this.isDigitOrLeadingPlusSign_(nextChar)) {
        this.ableToFormat_ = false;
        this.inputHasFormatting_ = true;
    } else {
        nextChar = this.normalizeAndAccrueDigitsAndPlusSign_(nextChar,
            rememberPosition);
    }
    if (!this.ableToFormat_) {
        if (this.inputHasFormatting_) {
            return this.accruedInput_.toString();
        } else if (this.attemptToExtractIdd_()) {
            if (this.attemptToExtractCountryCallingCode_()) {
                return this.attemptToChoosePatternWithPrefixExtracted_();
            }
        } else if (this.ableToExtractLongerNdd_()) {
            this.prefixBeforeNationalNumber_.append(
                i18n.phonenumbers.AsYouTypeFormatter.
                    SEPARATOR_BEFORE_NATIONAL_NUMBER_);
            return this.attemptToChoosePatternWithPrefixExtracted_();
        }
        return this.accruedInput_.toString();
    }
    switch (this.accruedInputWithoutFormatting_.getLength()) {
        case 0:
        case 1:
        case 2:
            return this.accruedInput_.toString();
        case 3:
            if (this.attemptToExtractIdd_()) {
                this.isExpectingCountryCallingCode_ = true;
            } else {
                this.extractedNationalPrefix_ =
                    this.removeNationalPrefixFromNationalNumber_();
                return this.attemptToChooseFormattingPattern_();
            }
        default:
            if (this.isExpectingCountryCallingCode_) {
                if (this.attemptToExtractCountryCallingCode_()) {
                    this.isExpectingCountryCallingCode_ = false;
                }
                return this.prefixBeforeNationalNumber_.toString() +
                    this.nationalNumber_.toString();
            }
            if (this.possibleFormats_.length > 0) {
                var tempNationalNumber = this.inputDigitHelper_(nextChar);
                var formattedNumber = this.attemptToFormatAccruedDigits_();
                if (formattedNumber.length > 0) {
                    return formattedNumber;
                }
                this.narrowDownPossibleFormats_(this.nationalNumber_.toString());
                if (this.maybeCreateNewTemplate_()) {
                    return this.inputAccruedNationalNumber_();
                }
                return this.ableToFormat_ ?
                    this.appendNationalNumber_(tempNationalNumber) :
                    this.accruedInput_.toString();
            } else {
                return this.attemptToChooseFormattingPattern_();
            }
    }
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    attemptToChoosePatternWithPrefixExtracted_ = function() {
    this.ableToFormat_ = true;
    this.isExpectingCountryCallingCode_ = false;
    this.possibleFormats_ = [];
    this.lastMatchPosition_ = 0;
    this.formattingTemplate_.clear();
    this.currentFormattingPattern_ = '';
    return this.attemptToChooseFormattingPattern_();
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.getExtractedNationalPrefix_ =
    function() {
        return this.extractedNationalPrefix_;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.ableToExtractLongerNdd_ =
    function() {
        if (this.extractedNationalPrefix_.length > 0) {
            var nationalNumberStr = this.nationalNumber_.toString();
            this.nationalNumber_.clear();
            this.nationalNumber_.append(this.extractedNationalPrefix_);
            this.nationalNumber_.append(nationalNumberStr);
            var prefixBeforeNationalNumberStr =
                this.prefixBeforeNationalNumber_.toString();
            var indexOfPreviousNdd = prefixBeforeNationalNumberStr.lastIndexOf(
                this.extractedNationalPrefix_);
            this.prefixBeforeNationalNumber_.clear();
            this.prefixBeforeNationalNumber_.append(
                prefixBeforeNationalNumberStr.substring(0, indexOfPreviousNdd));
        }
        return this.extractedNationalPrefix_ !=
            this.removeNationalPrefixFromNationalNumber_();
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.isDigitOrLeadingPlusSign_ =
    function(nextChar) {
        return i18n.phonenumbers.PhoneNumberUtil.CAPTURING_DIGIT_PATTERN
                .test(nextChar) ||
            (this.accruedInput_.getLength() == 1 &&
                i18n.phonenumbers.PhoneNumberUtil.PLUS_CHARS_PATTERN.test(nextChar));
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.attemptToFormatAccruedDigits_ =
    function() {
        var nationalNumber = this.nationalNumber_.toString();
        var possibleFormatsLength = this.possibleFormats_.length;
        for (var i = 0; i < possibleFormatsLength; ++i) {
            var numberFormat = this.possibleFormats_[i];
            var pattern = numberFormat.getPatternOrDefault();
            var patternRegExp = new RegExp('^(?:' + pattern + ')$');
            if (patternRegExp.test(nationalNumber)) {
                this.shouldAddSpaceAfterNationalPrefix_ =
                    i18n.phonenumbers.AsYouTypeFormatter.
                    NATIONAL_PREFIX_SEPARATORS_PATTERN_.test(
                        numberFormat.getNationalPrefixFormattingRule());
                var formattedNumber = nationalNumber.replace(new RegExp(pattern, 'g'),
                    numberFormat.getFormat());
                return this.appendNationalNumber_(formattedNumber);
            }
        }
        return '';
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.appendNationalNumber_ =
    function(nationalNumber) {
        var prefixBeforeNationalNumberLength =
            this.prefixBeforeNationalNumber_.getLength();
        if (this.shouldAddSpaceAfterNationalPrefix_ &&
            prefixBeforeNationalNumberLength > 0 &&
            this.prefixBeforeNationalNumber_.toString().charAt(
                prefixBeforeNationalNumberLength - 1) !=
            i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_) {
            return this.prefixBeforeNationalNumber_ +
                i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_ +
                nationalNumber;
        } else {
            return this.prefixBeforeNationalNumber_ + nationalNumber;
        }
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.getRememberedPosition =
    function() {
        if (!this.ableToFormat_) {
            return this.originalPosition_;
        }
        var accruedInputIndex = 0;
        var currentOutputIndex = 0;
        var accruedInputWithoutFormatting =
            this.accruedInputWithoutFormatting_.toString();
        var currentOutput = this.currentOutput_.toString();
        while (accruedInputIndex < this.positionToRemember_ &&
        currentOutputIndex < currentOutput.length) {
            if (accruedInputWithoutFormatting.charAt(accruedInputIndex) ==
                currentOutput.charAt(currentOutputIndex)) {
                accruedInputIndex++;
            }
            currentOutputIndex++;
        }
        return currentOutputIndex;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    attemptToChooseFormattingPattern_ = function() {
    var nationalNumber = this.nationalNumber_.toString();
    if (nationalNumber.length >=
        i18n.phonenumbers.AsYouTypeFormatter.MIN_LEADING_DIGITS_LENGTH_) {
        this.getAvailableFormats_(nationalNumber);
        var formattedNumber = this.attemptToFormatAccruedDigits_();
        if (formattedNumber.length > 0) {
            return formattedNumber;
        }
        return this.maybeCreateNewTemplate_() ?
            this.inputAccruedNationalNumber_() : this.accruedInput_.toString();
    } else {
        return this.appendNationalNumber_(nationalNumber);
    }
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.inputAccruedNationalNumber_ =
    function() {
        var nationalNumber = this.nationalNumber_.toString();
        var lengthOfNationalNumber = nationalNumber.length;
        if (lengthOfNationalNumber > 0) {
            var tempNationalNumber = '';
            for (var i = 0; i < lengthOfNationalNumber; i++) {
                tempNationalNumber =
                    this.inputDigitHelper_(nationalNumber.charAt(i));
            }
            return this.ableToFormat_ ?
                this.appendNationalNumber_(tempNationalNumber) :
                this.accruedInput_.toString();
        } else {
            return this.prefixBeforeNationalNumber_.toString();
        }
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    isNanpaNumberWithNationalPrefix_ = function() {
    if (this.currentMetadata_.getCountryCode() != 1) {
        return false;
    }
    var nationalNumber = this.nationalNumber_.toString();
    return (nationalNumber.charAt(0) == '1') &&
        (nationalNumber.charAt(1) != '0') &&
        (nationalNumber.charAt(1) != '1');
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    removeNationalPrefixFromNationalNumber_ = function() {
    var nationalNumber = this.nationalNumber_.toString();
    var startOfNationalNumber = 0;
    if (this.isNanpaNumberWithNationalPrefix_()) {
        startOfNationalNumber = 1;
        this.prefixBeforeNationalNumber_.append('1').append(
            i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_);
        this.isCompleteNumber_ = true;
    } else if (this.currentMetadata_.hasNationalPrefixForParsing()) {
        var nationalPrefixForParsing = new RegExp(
            '^(?:' + this.currentMetadata_.getNationalPrefixForParsing() + ')');
        var m = nationalNumber.match(nationalPrefixForParsing);
        if (m != null && m[0] != null && m[0].length > 0) {
            this.isCompleteNumber_ = true;
            startOfNationalNumber = m[0].length;
            this.prefixBeforeNationalNumber_.append(nationalNumber.substring(0,
                startOfNationalNumber));
        }
    }
    this.nationalNumber_.clear();
    this.nationalNumber_.append(nationalNumber.substring(startOfNationalNumber));
    return nationalNumber.substring(0, startOfNationalNumber);
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.attemptToExtractIdd_ =
    function() {
        var accruedInputWithoutFormatting =
            this.accruedInputWithoutFormatting_.toString();
        var internationalPrefix = new RegExp(
            '^(?:' + '\\' + i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN + '|' +
            this.currentMetadata_.getInternationalPrefix() + ')');
        var m = accruedInputWithoutFormatting.match(internationalPrefix);
        if (m != null && m[0] != null && m[0].length > 0) {
            this.isCompleteNumber_ = true;
            var startOfCountryCallingCode = m[0].length;
            this.nationalNumber_.clear();
            this.nationalNumber_.append(
                accruedInputWithoutFormatting.substring(startOfCountryCallingCode));
            this.prefixBeforeNationalNumber_.clear();
            this.prefixBeforeNationalNumber_.append(
                accruedInputWithoutFormatting.substring(0, startOfCountryCallingCode));
            if (accruedInputWithoutFormatting.charAt(0) !=
                i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN) {
                this.prefixBeforeNationalNumber_.append(
                    i18n.phonenumbers.AsYouTypeFormatter.
                        SEPARATOR_BEFORE_NATIONAL_NUMBER_);
            }
            return true;
        }
        return false;
    };
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    attemptToExtractCountryCallingCode_ = function() {
    if (this.nationalNumber_.getLength() == 0) {
        return false;
    }
    var numberWithoutCountryCallingCode = new goog.string.StringBuffer();
    var countryCode = this.phoneUtil_.extractCountryCode(
        this.nationalNumber_, numberWithoutCountryCallingCode);
    if (countryCode == 0) {
        return false;
    }
    this.nationalNumber_.clear();
    this.nationalNumber_.append(numberWithoutCountryCallingCode.toString());
    var newRegionCode = this.phoneUtil_.getRegionCodeForCountryCode(countryCode);
    if (i18n.phonenumbers.PhoneNumberUtil.REGION_CODE_FOR_NON_GEO_ENTITY ==
        newRegionCode) {
        this.currentMetadata_ =
            this.phoneUtil_.getMetadataForNonGeographicalRegion(countryCode);
    } else if (newRegionCode != this.defaultCountry_) {
        this.currentMetadata_ = this.getMetadataForRegion_(newRegionCode);
    }
    var countryCodeString = '' + countryCode;
    this.prefixBeforeNationalNumber_.append(countryCodeString).append(
        i18n.phonenumbers.AsYouTypeFormatter.SEPARATOR_BEFORE_NATIONAL_NUMBER_);
    this.extractedNationalPrefix_ = '';
    return true;
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.
    normalizeAndAccrueDigitsAndPlusSign_ = function(nextChar,
                                                    rememberPosition) {
    var normalizedChar;
    if (nextChar == i18n.phonenumbers.PhoneNumberUtil.PLUS_SIGN) {
        normalizedChar = nextChar;
        this.accruedInputWithoutFormatting_.append(nextChar);
    } else {
        normalizedChar = i18n.phonenumbers.PhoneNumberUtil.DIGIT_MAPPINGS[nextChar];
        this.accruedInputWithoutFormatting_.append(normalizedChar);
        this.nationalNumber_.append(normalizedChar);
    }
    if (rememberPosition) {
        this.positionToRemember_ = this.accruedInputWithoutFormatting_.getLength();
    }
    return normalizedChar;
};
i18n.phonenumbers.AsYouTypeFormatter.prototype.inputDigitHelper_ =
    function(nextChar) {
        var formattingTemplate = this.formattingTemplate_.toString();
        if (formattingTemplate.substring(this.lastMatchPosition_)
                .search(this.DIGIT_PATTERN_) >= 0) {
            var digitPatternStart = formattingTemplate.search(this.DIGIT_PATTERN_);
            var tempTemplate =
                formattingTemplate.replace(this.DIGIT_PATTERN_, nextChar);
            this.formattingTemplate_.clear();
            this.formattingTemplate_.append(tempTemplate);
            this.lastMatchPosition_ = digitPatternStart;
            return tempTemplate.substring(0, this.lastMatchPosition_ + 1);
        } else {
            if (this.possibleFormats_.length == 1) {
                this.ableToFormat_ = false;
            }       this.currentFormattingPattern_ = '';
            return this.accruedInput_.toString();
        }
    };
/*asyoutypeformatter.js*/ 
 $(window).load(function() {
    !function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","gio.js"/*tpa=http://jci.xiaozhustatic1.com/e19061101/assets.growingio.com/2.1/gio.js*/,"gio");
    gio('init', '59a81cc7d8c04307ba183d331c373ef6', {});
    gio('config', {'hashtag':true}); 
    if($('#loginUserId').val()){
        gio('setUserId',  $('#loginUserId').val());
    }
    else{
        gio('setUserId',  "N/A");
    }
    gio('send');
    if(!$('#loginUserId').val()){
        gio('clearUserId');
    }
    var pageOp = $('#actionName').val().toLocaleLowerCase();
    
    switch(pageOp)
    {
        //gio 订单详情页
        case 'fangke_orderdetail':
            var state = $(".t_tit span").text();
            var reg = /[\u4e00-\u9fa5]|）|：|（/g;
            var bookorderid = $(".t_box .t_info.clearfix h6").text().replace(reg, "");
            var pushToGio = {};
            pushToGio.state = state;
            pushToGio.bookorderid = bookorderid;
            updatePS('订单详情页_WEB',pushToGio);
            break;
        //gio 预订页_H5
        case 'front_addbookorder':
            var url = window.location.href;
            var arrUrl = url.split("?");
            var arrPara = arrUrl[1].split("&");
            var arr = arrPara[0].split("=");
            var pushToGio = {};
            pushToGio.luid = arr[1];
            updatePS('预订页_WEB',pushToGio);
            break;
        //gio 房间详情页
        case 'front_detail':
            var userfrom = 'other';
            var fromUrl = document.referrer.split(/\/\//)[1];
            if(fromUrl == undefined){
                userfrom = "other";
            }
            else if(fromUrl.indexOf("fangzi")){
                var begin = fromUrl.indexOf("fangzi")+7;
                var end = fromUrl.indexOf("html");
                var luid1 = fromUrl.slice(begin,end);
                var url = window.location.href; 
                var begin = url.indexOf("fangzi")+7;
                var end = url.indexOf("html");
                var luid2 = url.slice(begin,end);
                if(luid1 == luid2){
                    userfrom = "im";
                }
                else{
                    userfrom = "detail";
                }
            }
            else if(fromUrl.indexOf("fangdong")){
                userfrom = "landlord";
            }
            else if(fromUrl.indexOf("xiaozhu")){
                var url = fromUrl.split("/")[0];
                var arr = url.split(".");
                if(arr[0].indexof("www")||arr[0].indexof("dev")||arr[0].indexof("test")){
                    userfrom = "home";
                }
                else if(arr.length == 3 ||arr.length == 4){
                    userfrom = "result";
                }
            }
            var luid = $("#lodgeUnitId").val();
            var leasetype = $("#introduce .border_none .h_ico1").text(); 
            var commentscore = $("#comment_box .comment_box .x_textscore").text().split("/")[0];
            var reg = /[\u4e00-\u9fa5]/g;
            var guestnum = $("#introduce").children("li:eq(1)").children(".h_ico2").text().replace(reg, "");
            var city = $('#cityName').val();
            var price = $('#pricePart div span').text();
            var youpin = "否";
            var xianzhuhoufu = "否";
            var carefree = "否";
            var labels = $(".labels").children().each(function(k,v){
                var lable = $(this).children();
                if(lable.hasClass("youpin_ico")){
                    youpin = "是";
                }
                if(lable.hasClass("xianzhuhoufu_ico")){
                    xianzhuhoufu = "是";
                }
                if(lable.hasClass("carefree_ico")){
                    carefreeinsurance = "是";
                }
            });
            var pushToGio = {};
            pushToGio.luid = luid;
            pushToGio.firststaythenpay = xianzhuhoufu;
            pushToGio.leasetype = leasetype;
            pushToGio.userfrom = userfrom;
            pushToGio.commentscore = commentscore;
            pushToGio.guestnum = guestnum;
            pushToGio.youpin = youpin;
            pushToGio.cityname = city;
            pushToGio.price = price;
            pushToGio.carefreeinsurance = carefree;
            updatePS('房间详情页_WEB',pushToGio);
            break;
        //gio 城市结果页
        case 'front_search':
            var pushToGio = {};
            var guestnum = 0;
            var price = '-';
            $('.tj_con').children().each(function(k,v){
                var id = $(this).attr("id");
                var text = $(this).text();
                var reg = /[\u4e00-\u9fa5]/g;
                if (id == 'delguestnum') {
                    guestnum = text.replace(reg, "");
                }
                if (id == 'delprice') {
                    prices = text.split("-");
                    if(prices.length > 1){
                        price = text.replace(reg, "");
                    }
                    else if(text.indexof("以上")){
                        price = text.replace(reg, "")+'-';
                    }
                    else if(text.indexof("以下")){
                        price = '-'+text.replace(reg, "");
                    }
                }
            });
            var keyword = '';
            var landmark = '';
            if($('#searchKeyLandMark').length>0){
                landmark = $("#keyword").val();
            }
            if($('#deldistrict').length>0){
                landmark = $('#deldistrict').text();
            }
            if(landmark.length == 0){
                keyword = $("#keyword").val();
            }
            var rentType = [];
            $('#rentType').children(".type_list").children().each(function(k,v){
                if ($(this).hasClass('select_active')) rentType.push($(this).children().text().trim());
            });
            var facilities = [];
            $('#facilities').children().each(function(k,v){
                if ($(this).hasClass('col_blue')) facilities.push($(this).text().trim());
            });
            var huXing = [];
            $('#housetyperoomcnt').children().each(function(k,v){
                if ($(this).hasClass('col_blue')) huXing.push($(this).text().trim());
            });
            
            pushToGio.cityname = $("#searchcityd").val();
            pushToGio.landmark = landmark;
            pushToGio.checkday = $("#startenddate").val();
            pushToGio.leasetype = rentType.join('|');
            pushToGio.facility = facilities.join('|');
            pushToGio.housetyperoom = huXing.join('|');
            pushToGio.guestnum = guestnum;
            pushToGio.keyword = keyword;
            pushToGio.price = price;
            updatePS('城市列表_WEB',pushToGio);
            break;
    }

    function updatePS(pageGroup, pushObj){
        gio('http://jci.xiaozhustatic1.com/e19061101/page.set','pageGroup', pageGroup);
        for (var k in pushObj ) {
            gio('http://jci.xiaozhustatic1.com/e19061101/page.set',k,pushObj[k]);
        }
        try {
            gio('sendPage');
        } catch (e) {} finally {}
    }

    /*pinyou ad start*/
    (function(w,d,s,l,a){
        w._CommandName_=l;w[l]=w[l]||function(){(w[l].q=w[l].q||[]).push(arguments);
        w[l].track = function(){(w[l].q[w[l].q.length-1].t=[]).push(arguments)};return w[l]},w[l].a=a,w[l].l=1*new Date();
        var c = d.createElement(s);c.async=1;
        c.src='a.js'/*tpa=http://fm.ipinyou.com/j/a.js*/;
        var h = d.getElementsByTagName(s)[0];h.parentNode.insertBefore(c, h);
    })(window,document,'script','py','xQ..hro7LpUkqvqdkotNNc_6Y0');

    var denyPageOp = ['Front_Detail','Front_AddBookorder','Front_BookSuccess',
        'Front_BookOrderPay','Front_OrderPaySuccess','Front_OrderFirstPayPaySuccess','Front_BookOrderPayFirstPay'];
    var pageOp = $('#actionName').val();
    if($.inArray(pageOp,denyPageOp) == -1){
        py('event','viewPage');
    }
    //ludetail send to pinyou
    if(pageOp == 'Front_Detail'){
        var py_luId = $("#lodgeUnitId").val();
        var py_luName = $('.pho_info h4 em').text();
        var py_luAddr = $('.pho_info p').attr('title');
        var py_luUrl = window.location.href;
        var py_luCity = $('#cityName').val();
        var py_luPrice = $('#pricePart div span').text();
        var luIsAbord = $('#isAbroad').val() == 0 ? '国内' : '海外';
        var py_catGry = luIsAbord + '>' 
        var py_promotion = $.trim($('.price_top div').text());
        var py_curLuImgSrc = $('#curBigImage').attr('src');
        var py_curLuImgW = $('#curBigImage').attr('width');
        var py_curLuImgH = $('#curBigImage').attr('height');
        py('event','viewItem',
        { 
            'product_no':py_luId,
            'name':py_luName,
            'category':py_luCity + '>' + py_luAddr,
            'price':py_luPrice,
            'orig_price':py_luPrice,
            'currency_code':'',
            'product_url':py_luUrl,
            'pc_pic_url':py_curLuImgSrc,
            'pic_size':py_curLuImgW + '*' + py_curLuImgH,
            'promotion':py_promotion,
            'sold_out':0,
            'brand':py_luCity
        });
    }
    function checkBDSource(source) {
        var channels = localStorage.getItem('referrerStatistics');
        if (!channels || !channels.length) {
            return false;
        }
        channels = JSON.parse(channels);
        var len = channels.length;
        var flag = false;
        for (var i = 0; i < len; i++) {
            if(channels[i].utm_source && channels[i].utm_source.indexOf(source) != -1){
                flag = true;
                break;
            }
        }
        return flag;
    }

    var sendPermission = checkBDSource('pinyou');
    if(sendPermission){
        //booksuccess
        if($('#actionName').val() == 'Front_BookSuccess' || $('#actionName').val() == 'Front_BookOrderPayFirstPay'){
            var py_orderId = $('#bookOrderId').val();
            var py_orderPrice = $('#totalPrice').val();
            var py_orderLuId = $('#luid').val();
            var py_dayCount = $('#dayCount').val();
            py('event','order' ,{'id':py_orderId,'money':py_orderPrice,
                'items':[{'id':py_orderLuId,'count':py_dayCount,'price':py_orderPrice}]
            }).track('xQ.Guh.1PubYVWhAJF0WTQbN37l9_');
            
        }
        //waittocheckin
        if($('#actionName').val() == 'Front_OrderPaySuccess' || $('#actionName').val() == 'Front_OrderFirstPayPaySuccess'){
            var py_orderId = $('#bookOrderId').val();
            var py_orderPrice = $('#totalPrice').val();
            var py_orderLuId = $('#luid').val();
            var py_dayCount = $('#dayCount').val();
            py('event','order' ,{'id':py_orderId,'money':py_orderPrice,
                'items':[{'id':py_orderLuId,'count':py_dayCount,'price':py_orderPrice}]
            }).track('xQ.Muh.TbZjtjcFPTDxVQ0fmCGYjP');
        }
        //regsuccess
        if($('#actionName').val() == 'Front_Register_SuccessPage'){
            py('event','register',$('#encryptUid').val()).track('xQ.Quh.Oi-Gt0Aj2UkDajbbMUJsvP');
        }
    }
    /*pinyou ad end*/


});
// channel statistics
(function () {
    var referrerJson = 'referrerJson';

    function referrerFormat() {
        var RF = {};
        RF.referrer = '';
        RF.sem = function (n) {
            n.utm_term = this.getUrlParam('utm_term');
            n.utm_source = this.getUrlParam('utm_source');
            n.utm_medium = this.getUrlParam('utm_medium');
            n.utm_campaign = this.getUrlParam('utm_campaign');
            n.utm_content = this.getUrlParam('utm_content');
            n.ca_source = 'pc' + n.utm_source + n.utm_content;
            var planid = this.getUrlParam('planid');
            var unitid = this.getUrlParam('unitid');
            var ideaid = this.getUrlParam('ideaid');
            if (planid && ideaid && unitid){
                n.utm_term = 'planid_' + planid + ',unitid_' + unitid + ',ideaid_' + ideaid;
            } 
        };
        RF.getUrlParam = function (paramName) {
            var sURL = decodeURIComponent(window.document.URL.toString().replace(/#/, '&'));
            sURL = sURL + '&';
            var paramStart = sURL.indexOf(paramName);
            if (paramStart == -1) {
                return '';
            }
            var equal = sURL.substr(paramStart + paramName.length, 1);
            if (equal != '=') {
                return '';
            }
            var start = paramStart + paramName.length + 1;
            return sURL.substring(start, sURL.indexOf('&', start));
        };
        RF.getReferrerParam = function (paramName) {
            var r = RF.referrer;
            if (r.indexOf(paramName) == -1) {
                return '';
            }
            var start = r.indexOf(paramName) + paramName.length;
            return r.substring(start, r.indexOf('&', start));
        };
        return RF;
    }

    function domainConfig(domain) {
        var url = new Array();
        url['http://jci.xiaozhustatic1.com/e19061101/www.baidu.com'] = {'ca_source' : 'pcbaiduseo', 'utm_source' : 'baidu', 'key' : ''};
        url['http://jci.xiaozhustatic1.com/e19061101/m.baidu.com'] = {'ca_source' : 'h5baiduseo', 'utm_source' : 'baidu', 'key' : '&title='};
        url['http://jci.xiaozhustatic1.com/e19061101/www.sogou.com'] = {'ca_source' : 'pcsogouseo', 'utm_source' : 'sogou', 'key' : '&query='};
        url['http://jci.xiaozhustatic1.com/e19061101/m.sogou.com'] = {'ca_source' : 'h5sogouseo', 'utm_source' : 'sogou', 'key' : '&keyword='};
        url['http://jci.xiaozhustatic1.com/e19061101/www.so.com'] = {'ca_source' : 'pc360seo', 'utm_source' : '360', 'key' : '?q='};
        url['http://jci.xiaozhustatic1.com/e19061101/m.so.com'] = {'ca_source' : 'h5360seo', 'utm_source' : '360', 'key' : '?q='};
        if (typeof(url[domain]) != 'undefined')
            return url[domain];
        return '';
    }

    var RF = referrerFormat();
    var t = new Date();
    var newRef = {
        ts: Math.floor(t.getTime() / 1000),
        ca_source: '',
        utm_term: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_content: ''
    };

    if (RF.getUrlParam('utm_source') != '' && RF.getUrlParam('utm_content') != '') {
        RF.sem(newRef);
    } else {
        var referrer = document.referrer;
        if (referrer == '' || referrer.indexOf('http://' + topLevelDomain) == 0 || referrer.indexOf('https://'+topLevelDomain) == 0) {
            return;
        }
        referrer = decodeURIComponent(referrer) + '&';
        RF.referrer = referrer;
        var subStart = 0;
        if (referrer.indexOf('http://') !== -1) {
            subStart = 7;
        } else {
            subStart = 8;
        }
        var curDomain = referrer.substring(subStart, referrer.indexOf('.com') + 4);
        var info = domainConfig(curDomain);
        if (info == '')
            return;
        newRef.ca_source = info.ca_source;
        newRef.utm_source = info.utm_source;
        if (newRef.key != '') {
            newRef.utm_term = RF.getReferrerParam(newRef.key)
        }
        if (newRef.utm_term == '') {
            newRef.utm_term = document.title
        }

    }
    var iframe = document.createElement('iframe');
    iframe.src = window.location.protocol + "//"+topLevelDomain+"/statistics.html?" + referrerJson + "=" + JSON.stringify(newRef);
    iframe.style = "display:none";
    document.body.appendChild(iframe);
}());

 
 $(function(){
    $("#Pub_Btn").on('click',function(){
        if ($('#loginUserId').length <= 0) {
            return false;
        }
        XZWebAjax.get(XZWebUrlWriter.getAjax_CheckIllegalUser('ispublish'),{},false, function(ajaxResponse){
            if(ajaxResponse.status == 1){
                window.location = $("#Pub_Btn").attr('data-href');
            } else {
                alert(ajaxResponse.errmsg);
            }
        });
    });
});
 
 function open7Moor() {
    var boxWidth = 580;
    var boxHeight = 490;
    var top = (window.screen.height - boxHeight)/2;
    var left = (window.screen.width - boxWidth)/2;
    var sevenMoorChatUrl = 'https://webchat.7moor.com/wapchat.html?accessId=252e6ff0-062f-11e8-8d82-97f7dd3b3b55&fromUrl=www.xaiozhu.com&urlTitle=%E5%B0%8F%E7%8C%AA%E7%9F%AD%E7%A7%9F';
    window.open(sevenMoorChatUrl,"_blank",'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, top='+top+', left='+left+', width='+boxWidth+', height='+boxHeight);
} 
 /**
 * 元素晃动
 */
var shaking = function(obj) {
    this.shaker = obj;
    return(this);
}

shaking.prototype.generator=function(){    //生成左右摇晃的偏移量
    this.offsets=new Array();
    this.times=10;    //登录表单左右摇晃的总次数
    for(var i=0;i<this.times;i++){
        var offset=Math.ceil((Math.random()+3)*3);    //9=<偏移量<=12
        if(i%2==0){    //向左的偏移量
            this.offsets.push(offset);
        }
        else{    //向右的偏移量
            this.offsets.push(-offset);
        }
    }
    this.scale=0;    //记录目前表单已经摇晃的次数
}
shaking.prototype.counter=function(){    //摇晃次数计数器函数
    if(this.scale<this.times){
        var offset=this.offsets[this.scale];
        var position=parseInt(getComputedStyle(this.shaker)['left']);
        var distance=Math.abs(position)+Math.abs(offset);    //表单每次摇晃需要移动的水平距离
        if(offset>0){    //向右偏移
            this.mover(1,distance,this);
        }
        else{    //向左偏移
            this.mover(-1,distance,this);
        }
        this.scale+=1;
        var _this=this;    //缓存当前对象
        setTimeout(function(){_this.counter()},50);
    }
    else{    //表单位置复位
        this.shaker.style.left='0px';
    }
}
shaking.prototype.mover=function(sign,distance){    //摇晃移动函数
    var speed=sign*Math.ceil(distance*0.6);    //表单移动的速度
    this.shaker.style.left=parseInt(getComputedStyle(this.shaker)['left'])+speed+'px';
    distance-=Math.abs(speed);
    var _this=this;    //缓存当前对象
    if(distance>0){
        setTimeout(function(){_this.mover()},10);
    }
}

shaking.prototype.run=function(){    //run
    this.shaker.style.position = 'relative';
    this.shaker.parentNode.style.position = 'relative';
    this.generator();
    this.counter();
}


var totalHtml = '';
var faWuAgreeId='';
var xiYiAgreeId='';
var canClickRequest = false;
var canAgree = false;
var timer = null;
var actionName = $('#actionName').val();
var userId = (typeof($("#loginUserId").val()) == "undefined") ? null : $("#loginUserId").val();
var getLawPageUrl = XZWebUrlWriter.getAjax_GetLawPopupPage_Url();
var getAgreementUrl = XZWebUrlWriter.getAjax_GetAgreementPage_Url();
var doAgreeUrl = XZWebUrlWriter.getAjax_DoAgree_Url();
var rule_math = localStorage.getItem('rule_math');
var terminalUniqueIdentification = getCookieUniqueIndex('rule_math');
var lawData = {'uniqueId':rule_math};
var isSelect = false;
var pop = false;
var agreed = false;
var position;
var parentDialog = null;
var countDownTime = 0;

$(document).ready(function(){
// 设备唯一标识相关操作
    if(!rule_math || 'null' == rule_math){
        if (!terminalUniqueIdentification || 'null' == terminalUniqueIdentification){
            rule_math = Math.random().toString(36).substr(2);
            localStorage.setItem('rule_math', rule_math);
            setCookieUniqueIndex('rule_math', rule_math);
        }else{
            rule_math = terminalUniqueIdentification;
            localStorage.setItem('rule_math', terminalUniqueIdentification);
        }
    } else {
        if (terminalUniqueIdentification && 'null' != terminalUniqueIdentification) {
            if (terminalUniqueIdentification != rule_math) {
                rule_math = terminalUniqueIdentification;
                localStorage.setItem('rule_math', rule_math);
            }
        } else {
            setCookieUniqueIndex('rule_math', rule_math);
        }
    }

//判断法务弹窗是否显示；
      var nexturl = $('input[name=next]').val();
      if (nexturl) requestParam.next = nexturl;
      $.ajax({
         type     : "POST",
         url      : getLawPageUrl,
         data     : lawData,
         dataType : 'json',
         async    : true,
         beforeSend : function(XHR){ XHR.setRequestHeader('xSRF-Token',$('#xz_srf_token').val()); },
         success  : function(returnLawData){
            if (!isEmptyObject(returnLawData)) {
               // var datas=JSON.parse(returnLawData);
               var datas = returnLawData;
               if(datas.status==1){
                  faWuAgreeId = datas.sucmsg.agreementIds;
                  if(datas.sucmsg.isShow==true){
                     loadShadePageStyle();
                     // 法务弹层  头部拼接字符串开始；
                     var wrapperHtml = '<div class="dialogRoom">'+
                        '<div class="xzDialog">'+
                        '<div class="topBar">'+
                        '<p class="title">'+datas.sucmsg.title+'</p>'+
                        '</div>'+
                        '<div class="xzRemaind">'+
                        '<img src="diaBg.png"/*tpa=http://jci.xiaozhustatic1.com/images/diaBg.png*/>';
                     //文案部分拼接；
                     var text = '<div class="dialogP">'+
                        '<div>'+datas.sucmsg.content+'</div>'+
                        '</div></div>'
                     // 按钮部分拼接
                     var btnHtml = '<div class="dialogFooter">'+
                        '<div class="dialogBtns">'+
                        '<button type="button" class="agreeBtn agreeBtnDis"  id="agreeBtnF" onclick="clickAgree(this)">'+'同意'+'</button>'+
                        '<button type="button" class="disAgreeBtn" id="disAgreeBtn" onclick="clickDisAgree()">'+'不同意'+
                        '<div class="shewF unDis" id="showText">'+
                        '<div class="shedowRemind">'+
                        datas.sucmsg.refusingMessage+
                        '</div>'+
                        '<i></i>'+
                        '</div>'+
                        '</button>'+
                        '</div>'+
                        '</div>';
                     var dialogFooterHtml = '</div></div>';
                     totalHtml = wrapperHtml+text+btnHtml+dialogFooterHtml;
                     //放到页面中
                     $('body').append(totalHtml);

                     if(datas.sucmsg.countdown != 0){
                        //跳去倒计时
                        Countdown(Number(datas.sucmsg.countdown)+1,$("#agreeBtnF"));
                        $("#PoppedagreeBtnF").text("同意("+ Number(datas.sucmsg.countdown) +"s)");
                        $("#PoppedagreeBtnF").addClass("agreeBtnDis");
                        canAgree = false;
                     }else{
                        $("#agreeBtnF").removeClass("agreeBtnDis");
                        canAgree = true;
                     }
                     $('.dialogRoom').show();
                     $('.dialogRoom').css('display', 'block');
                  }
               }
            }
         },
         error : function (XMLHttpRequest, textStatus, errorThrown){
            alert('网络错误,请刷新页面重试:'+textStatus);
         }
      });


// 协议弹层
    switch (actionName) {
        case 'Front_Register':
            // 注册弹层协议
            position = 'pc_registerPage';
            parentDialog = $("#registerDialog");
            showShadePage(position);
            break;
        case 'Front_Login':
            // 快捷登录补充用户名页
            position = 'pc_fastLoginAddUserName';
            parentDialog = $("#userlogindialog");
            showShadePage(position);
            break;
        case 'Front_Register_Success':
            // 第三方补充协议
            position = 'pc_partnerLoginAddMobile';
            parentDialog = $(".loginbox");
            showShadePage(position);
            break;
        case 'Front_AddBookorder':
        case 'Front_AddBookorderFirstPay':
            // 订单预订信息填写页协议
            position = 'pc_orderPreFilling';
            showShadePage(position);
            break;
        case 'Pub_IndexV2Step5':
            // 房源发布协议
            position = 'pc_lodgeUnitPublishDetail';
            showShadePage(position);
            break;
        case 'Pub_Preview':
            // 房源修改协议
            position = 'pc_lodgeUnitEdit';
            showShadePage(position);
            break;
        default:
            break;
    }
});

// 获取存在cookie中的唯一标识
function getCookieUniqueIndex(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 设置 cookie
function setCookieUniqueIndex(name,value){
    var exp = new Date();
    exp.setTime(exp.getTime() + 86400);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain="+topLevelDomain;
}

// 动态加载css样式
function loadShadePageStyle() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = 'shadepage.css'/*tpa=http://jci.xiaozhustatic1.com/css/shadepage.css*/;
    head.appendChild(link);
}

//点击法务弹层同意按钮函数
function clickAgree(a){
    if (!canAgree) {
        return false;
    }
    XZWebUrlWriter.postRequest(doAgreeUrl, {'userId': userId,'uniqueId':rule_math,'agreementIds':faWuAgreeId});
    //隐藏弹窗；去掉body的遮罩背景；
    $(a).parents('.dialogRoom').remove();
}

//点击法务弹层 不同意按钮函数 显示不同意提示语
function clickDisAgree(){
    $('#showText').show()
    setTimeout(function(){
        $("#showText").fadeOut(1000);
    },2000)
}

// 快捷登录补充用户名页
$("body").on("click","#mobileLi",function(){
    position = 'pc_fastLoginAddUserName';
    parentDialog = $("#mobilePerfeactInfoDialog");
    showShadePage(position);
});

// 注册弹层协议
$(".show-register-box").on("click",function(){
    position = 'pc_registerPage';
    parentDialog = $("#registerDialog");
    showShadePage(position);
});


function showShadePage(position) {
    var data = XZWebUrlWriter.postRequest(getAgreementUrl, {'userId': userId, 'uniqueId':rule_math,'position':position});
    loadShadePageStyle();
    if (!isEmptyObject(data)) {
        if (1 == data.status) {
            $(".dialogRoom").remove();
            xieYiAgreeId = data.sucmsg.agreementIds;
            pop = data.sucmsg.popup;
            if(true == data.sucmsg.isSelect){
                //勾选框选中
                $('.agreeResBox').find('input:checkbox').prop("checked",true)
                isSelect = true;
                canClickRequest = true;
                agreed = true;
            }else{
                $('.agreeResBox').find('input:checkbox').prop("checked",false)
                isSelect = false;
                canClickRequest = false;
                agreed = false;
            }
            // 协议弹层  头部拼接字符串开始；
            var wrapperHtml2 = '<div class="dialogRoom" flag="'+position+'">'+
                '<div class="xzDialog">'+
                '<div class="topBar">'+
                '<p class="title">'+data.sucmsg.title+'</p>'+
                '<div class="closeBtn">×</div>'+
                '</div>'+
                '<div class="xzRemaind">';
            //文案部分拼接；
            var text2 = '<div class="dialogP">'+
                '<div>'+data.sucmsg.content+'</div>'+
                '</div></div>'
            // 按钮部分拼接
            var btnHtml2 = '<div class="dialogFooter">'+
                '<div class="dialogBtns">'+
                '<button type="button" class="agreeBtn agreeBtnDis" id="PoppedagreeBtnF">'+'同意'+'</button>'+
                '<button type="button" class="disAgreeBtn" id="disPoppedAgreeBtn">'+'不同意'+
                '<div class="shewF unDis" id="showPoppedText">'+
                '<div class="shedowRemind">'+
                data.sucmsg.refusingMessage+
                '</div>'+
                '<i></i>'+
                '</div>'+
                '</button>'+
                '</div>'+
                '</div>';
            var dialogFooterHtml2 = '</div></div>';
            //放到页面中
            $('body').append(wrapperHtml2+text2+btnHtml2+dialogFooterHtml2);
            countDownTime = data.sucmsg.countdown;

        }else{
            $('.agreeResBox').find('input:checkbox').prop("checked",true);
            canClickRequest = true;
            isSelect = true;
        }
    }
}

//点击协议弹层 同意按钮 发起请求
$("body").on("click","#PoppedagreeBtnF",function(){
    if (!canAgree) {
        return false;
    }
    XZWebUrlWriter.postRequest(doAgreeUrl, {'userId': userId,'uniqueId':rule_math,'agreementIds':xieYiAgreeId});
    //隐藏弹窗；去掉body的遮罩背景；
    $(this).parents(".dialogRoom").remove();
    $('.agreeResBox').find('input:checkbox').prop("checked",true);
    if (null!=parentDialog) {
        parentDialog.show();
    }
    agreed = true;
    canClickRequest = true;
});

//关闭协议 弹层；
$("body").on("click",".closeBtn",function(){
    $(this).parents(".dialogRoom").hide();
    if (null!=parentDialog) {
        parentDialog.show();
    }
});

// 点击不同意按钮
$("body").on("click","#disPoppedAgreeBtn",function(){
    $('#showPoppedText').show();
    $('.agreeResBox').find('input:checkbox').prop("checked",false);
    canClickRequest = false;
    agreed = false;
    setTimeout(function(){
        $("#showPoppedText").fadeOut(1000);
    },2000)
})

$("body").on("click", "#check3", function() {
    var that = $(this);
    $('#warningtip').hide();
    if (true == pop && false == agreed) {

        if (true == isSelect) {
            that.prop("checked",true);
        }else{
            that.prop("checked",false);
        }

        if(0 < parseInt(countDownTime)) {
            $("#PoppedagreeBtnF").addClass("agreeBtnDis");
            canAgree = false;
            $("#PoppedagreeBtnF").text("同意("+ Number(countDownTime) +"s)");
            Countdown(Number(countDownTime),$("#PoppedagreeBtnF"));
        }else{
            canAgree = true;
            $("#PoppedagreeBtnF").removeClass("agreeBtnDis");
        }
        if (null!=parentDialog) {
            parentDialog.hide();
        }
        $('.dialogRoom').show();
    }

    if (true == that.prop("checked")) {
        canClickRequest = true;
    } else {
        canClickRequest = false;
    }
});

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0;
}

function  Countdown(time,domObj) {
    clearInterval(timer);
    timer = setInterval(function () {
        if (time <= 1) {
            clearInterval(timer);
            domObj.text("同意");
            domObj.removeClass("agreeBtnDis");
            canAgree = true;
            return false;
        }
        time--;
        $(domObj).text("同意("+time+"s)");
        $(domObj).addClass("agreeBtnDis");
    }, 1000)
}



 
 
var captcha = new Captcha({
    width: 340,
    mode: 'float',
    init: function (safeCheckBox) {
        $('#safeCheck').append(safeCheckBox);
    },
    onSuccess: function () {
    },
    busiKey: 'register'
});
