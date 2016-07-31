<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {
	private $page = 0;
	private $limit = 10;

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function hotels(){

		header("content-type:application/json");
		$page = $this->page;
		$limit = $this->limit;
		$search = '';
		if(isset($_GET['page'])){
			$page = $_GET['page'];
		}
		if(isset($_GET['limit'])){
			$limit = $_GET['limit'];
		}

		$postdata = file_get_contents("php://input");
		$_POST = json_decode($postdata);


		if(isset($_POST->q)){
			$search = $_POST->q;
		}

//		$this->db->select('*')->from('busines_venue')->limit(0,10);
//		$query =$this->db->get();//
//		$data =  $query->result_array();
		if($search=="") {
			$q = $this->db->query("select * from busines_venue limit " . $page . "," . $limit);
		}else{
			$q = $this->db->query("select * from busines_venue where NAME like '%".$search."%' limit " . $page . "," . $limit);

		}
			$data = $q->result_array();
		echo json_encode(array('data'=>$data));
	}
}
