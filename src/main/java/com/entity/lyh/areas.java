package com.entity.lyh;

public class areas {
	private int id;
	private char areaid;
	private String area;
	private char cityid;
	public areas() {
		super();
		// TODO Auto-generated constructor stub
	}
	public areas(int id, char areaid, String area, char cityid) {
		super();
		this.id = id;
		this.areaid = areaid;
		this.area = area;
		this.cityid = cityid;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public char getAreaid() {
		return areaid;
	}
	public void setAreaid(char areaid) {
		this.areaid = areaid;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public char getCityid() {
		return cityid;
	}
	public void setCityid(char cityid) {
		this.cityid = cityid;
	}
	@Override
	public String toString() {
		return "areas [id=" + id + ", areaid=" + areaid + ", area=" + area + ", cityid=" + cityid + "]";
	}
	
	
}
