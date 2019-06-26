package com.entity.lyh;

public class apartments {
	private int Apartmentsid;
	private int bedroom;
	private int parlor;
	private int toilet;
	private int cookhouse;
	private int balcony;
	public apartments() {
		super();
		// TODO Auto-generated constructor stub
	}
	public apartments(int apartmentsid, int bedroom, int parlor, int toilet, int cookhouse, int balcony) {
		super();
		Apartmentsid = apartmentsid;
		this.bedroom = bedroom;
		this.parlor = parlor;
		this.toilet = toilet;
		this.cookhouse = cookhouse;
		this.balcony = balcony;
	}
	public int getApartmentsid() {
		return Apartmentsid;
	}
	public void setApartmentsid(int apartmentsid) {
		Apartmentsid = apartmentsid;
	}
	public int getBedroom() {
		return bedroom;
	}
	public void setBedroom(int bedroom) {
		this.bedroom = bedroom;
	}
	public int getParlor() {
		return parlor;
	}
	public void setParlor(int parlor) {
		this.parlor = parlor;
	}
	public int getToilet() {
		return toilet;
	}
	public void setToilet(int toilet) {
		this.toilet = toilet;
	}
	public int getCookhouse() {
		return cookhouse;
	}
	public void setCookhouse(int cookhouse) {
		this.cookhouse = cookhouse;
	}
	public int getBalcony() {
		return balcony;
	}
	public void setBalcony(int balcony) {
		this.balcony = balcony;
	}
	@Override
	public String toString() {
		return "apartments [Apartmentsid=" + Apartmentsid + ", bedroom=" + bedroom + ", parlor=" + parlor + ", toilet="
				+ toilet + ", cookhouse=" + cookhouse + ", balcony=" + balcony + "]";
	}

	
}
