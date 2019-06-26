package com.entity.lyh;

public class provinces {
	private int id;
	private char provinceid;
	private String province;
	public provinces() {
		super();
		// TODO Auto-generated constructor stub
	}
	public provinces(int id, char provinceid, String province) {
		super();
		this.id = id;
		this.provinceid = provinceid;
		this.province = province;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public char getProvinceid() {
		return provinceid;
	}
	public void setProvinceid(char provinceid) {
		this.provinceid = provinceid;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	@Override
	public String toString() {
		return "provinces [id=" + id + ", provinceid=" + provinceid + ", province=" + province + "]";
	}
	
	
}
