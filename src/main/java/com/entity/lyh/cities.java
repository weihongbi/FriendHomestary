package com.entity.lyh;

public class cities {
	private int id;
	private char cityid;
	private String city;
	private int provinceid;
	public cities() {
		super();
		// TODO Auto-generated constructor stub
	}
	public cities(int id, char cityid, String city, int provinceid) {
		super();
		this.id = id;
		this.cityid = cityid;
		this.city = city;
		this.provinceid = provinceid;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public char getCityid() {
		return cityid;
	}
	public void setCityid(char cityid) {
		this.cityid = cityid;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getProvinceid() {
		return provinceid;
	}
	public void setProvinceid(int provinceid) {
		this.provinceid = provinceid;
	}
	@Override
	public String toString() {
		return "cities [id=" + id + ", cityid=" + cityid + ", city=" + city + ", provinceid=" + provinceid + "]";
	}
}
