package com.dao.lyh;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.entity.lyh.housetype;

@Mapper
public interface houseDao {
	
	@Select("select cus.cname,cus.picture,pri.price,hou.hname,photo.bedroom,\r\n" + 
			"h.livablePeople,p.province,c.city,a.area,ht.houseTypeName,r.rentName,t.toiletTypeName \r\n" + 
			"from house hou\r\n" + 
			"LEFT JOIN customers cus\r\n" + 
			"on hou.cid=cus.cid\r\n" + 
			"LEFT JOIN homedetails h\r\n" + 
			"on hou.homedid=h.homedid\r\n" + 
			"LEFT JOIN provinces p\r\n" + 
			"on h.provinceId=p.provinceid\r\n" + 
			"LEFT JOIN cities c\r\n" + 
			"on c.cityid=h.cityid\r\n" + 
			"LEFT JOIN areas a\r\n" + 
			"on a.areaid=h.areaid\r\n" + 
			"LEFT JOIN housetype ht\r\n" + 
			"on ht.houseTypeId=h.houseTypeId\r\n" + 
			"LEFT JOIN rent r\r\n" + 
			"on r.rentid=h.rentid\r\n" + 
			"LEFT JOIN apartments ap\r\n" + 
			"on ap.Apartmentsid=h.Apartmentsid\r\n" + 
			"LEFT JOIN toilettype t\r\n" + 
			"on t.toiletTypeId=h.toiletTypeId\r\n" + 
			"LEFT JOIN pricerule pri\r\n" + 
			"on hou.pruleId=pri.pruleId\r\n" + 
			"LEFT JOIN homephoto photo\r\n" + 
			"on hou.hpid=photo.hpid")
	public List<Map<String,Object>> queryAll();
	
	@Select("<script>"+
			"select cus.cname,cus.picture,pri.price,hou.hname,photo.bedroom,\r\n" + 
			"h.livablePeople,p.province,c.city,a.area,ht.houseTypeName,r.rentName,t.toiletTypeName \r\n" + 
			"from house hou\r\n" + 
			"LEFT JOIN customers cus\r\n" + 
			"on hou.cid=cus.cid\r\n" + 
			"LEFT JOIN homedetails h\r\n" + 
			"on hou.homedid=h.homedid\r\n" + 
			"LEFT JOIN provinces p\r\n" + 
			"on h.provinceId=p.provinceid\r\n" + 
			"LEFT JOIN cities c\r\n" + 
			"on c.cityid=h.cityid\r\n" + 
			"LEFT JOIN areas a\r\n" + 
			"on a.areaid=h.areaid\r\n" + 
			"LEFT JOIN housetype ht\r\n" + 
			"on ht.houseTypeId=h.houseTypeId\r\n" + 
			"LEFT JOIN rent r\r\n" + 
			"on r.rentid=h.rentid\r\n" + 
			"LEFT JOIN apartments ap\r\n" + 
			"on ap.Apartmentsid=h.Apartmentsid\r\n" + 
			"LEFT JOIN toilettype t\r\n" + 
			"on t.toiletTypeId=h.toiletTypeId\r\n" + 
			"LEFT JOIN pricerule pri\r\n" + 
			"on hou.pruleId=pri.pruleId\r\n" + 
			"LEFT JOIN homephoto photo\r\n" + 
			"on hou.hpid=photo.hpid " +
			"<where>"
			+ "<if test='param1 != null '> and c.city like '%${param1}%'</if>"
			+ " <if test='param2 != null '>and ht.houseTypeName like '%${param2}%'</if> "
			+ "<if test='param3 != null '>and r.rentName like '%${param3}%'</if>"
			+ "</where> " 
			+ "</script>")
	public List<Map<String,Object>> query2
	(String city,String houseTypeName,String rentName);
	
	@Select("select * from housetype")
	public List<housetype> queryhouseType();
}
