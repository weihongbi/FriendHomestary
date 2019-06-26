package com.entity.lyh;

public class homephoto {
	private int hpid;
	private String bedroom;
	private String parlor;
	private String toilet;
	private String cookhouse;
	private String rests;
	public homephoto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public homephoto(int hpid, String bedroom, String parlor, String toilet, String cookhouse, String rests) {
		super();
		this.hpid = hpid;
		this.bedroom = bedroom;
		this.parlor = parlor;
		this.toilet = toilet;
		this.cookhouse = cookhouse;
		this.rests = rests;
	}
	public int getHpid() {
		return hpid;
	}
	public void setHpid(int hpid) {
		this.hpid = hpid;
	}
	public String getBedroom() {
		return bedroom;
	}
	public void setBedroom(String bedroom) {
		this.bedroom = bedroom;
	}
	public String getParlor() {
		return parlor;
	}
	public void setParlor(String parlor) {
		this.parlor = parlor;
	}
	public String getToilet() {
		return toilet;
	}
	public void setToilet(String toilet) {
		this.toilet = toilet;
	}
	public String getCookhouse() {
		return cookhouse;
	}
	public void setCookhouse(String cookhouse) {
		this.cookhouse = cookhouse;
	}
	public String getRests() {
		return rests;
	}
	public void setRests(String rests) {
		this.rests = rests;
	}
	@Override
	public String toString() {
		return "homephoto [hpid=" + hpid + ", bedroom=" + bedroom + ", parlor=" + parlor + ", toilet=" + toilet
				+ ", cookhouse=" + cookhouse + ", rests=" + rests + "]";
	}

	
}
