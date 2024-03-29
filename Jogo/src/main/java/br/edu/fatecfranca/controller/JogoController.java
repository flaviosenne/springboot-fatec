package br.edu.fatecfranca.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.fatecfranca.entities.JogoEntity;

@RestController // indica que a classe responde por requisisção REST
@RequestMapping("/api/jogo") // indica que a rota é /api/jogo

public class JogoController {
	
	ArrayList<JogoEntity> jogos = new ArrayList<JogoEntity>();
	

	
	@PostMapping
	public JogoEntity addJogo(@RequestBody JogoEntity jogo) {
		this.jogos.add(jogo);
		return jogo;
	}
	
	
	@GetMapping
	public ArrayList<JogoEntity> getJogo(){
		return this.jogos;
	}
	
	@DeleteMapping("/{id}")
	public JogoEntity removeJogo(@PathVariable("id") int id) {
		// percorrer o vetor para procurar o jogo
		for(JogoEntity jogo: this.jogos) {
			if(jogo.getId() == id) {
				this.jogos.remove(jogo);
				return jogo; // remove e si do loop
			}
		}
		return null;
	}
	
	@PutMapping
	public JogoEntity atualizaJogo(@RequestBody JogoEntity jogo) {
		
		for(JogoEntity auxiliar: this.jogos) {
			if(auxiliar.getId() == jogo.getId()) {
				int posicao = this.jogos.indexOf(auxiliar);
				this.jogos.set(posicao, jogo);
				return jogo;
			}
		}
		return null;
	}
}
