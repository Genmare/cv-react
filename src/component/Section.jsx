import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import { StyleContext } from '../utils/context';
import Hover from './Hover';

import SpanSelectable from './SpanSelectable';

import Tools from '../Tools';

const Paragraphe = styled.div`
	background-color: ${(props) => props.bgColor ?? defautlParaBgColor};
	color: ${(props) => props.fontColor ?? defaultParaFtColor};
`;

const Intitule = styled.h3`
	background-color: ${(props) => props.bgColor ?? defautlTitleBgColor};
	color: ${(props) => props.fontColor ?? defaultTitleFtColor};
`;

const defautlParaBgColor = 'var(--section-bg-color)';
const defaultParaFtColor = 'var(--secondary-ft-color)';
const defautlTitleBgColor = 'var(--second-bg-color)';
const defaultTitleFtColor = 'var(--primary-font-color)';

export default function Section({
	sectionData,
	idSection,
	dispatch,
	sectionSetting,
}) {
	const { globalStyles, setglobalStyles, setIdent } =
		useContext(StyleContext);

	console.log('Section', idSection);

	let cfStylesPara = {
		id: 'paragraph',
		backgroundColor:
			sectionSetting?.paragraph?.backgroundColor ?? defautlParaBgColor,
		fontColor: sectionSetting?.paragraph?.fontColor ?? defaultParaFtColor,
	};

	let cfStylesIntitule = {
		id: 'title',
		backgroundColor:
			sectionSetting?.title?.backgroundColor ?? defautlTitleBgColor,
		fontColor: sectionSetting?.title?.fontColor ?? defaultTitleFtColor,
	};

	const tools = new Tools(globalStyles, setglobalStyles, setIdent);

	const ref = useRef();

	const handleColor = (e, cfStyle) => {
		e.stopPropagation();
		tools.handleColor(cfStyle, ref);
	};

	const getColor = (cfStyle) => {
		return tools.getColor(cfStyle);
	};

	const getFontColor = (cfStyle) => {
		return tools.getFontColor(cfStyle);
	};

	// Taille des fonts SpanSelectable en 'em'
	const fontS = '1';

	return (
		<section ref={ref}>
			<Intitule
				className="section-h3"
				bgColor={() => getColor(cfStylesIntitule)}
				fontColor={() => getFontColor(cfStylesIntitule)}
				onClick={(e) => handleColor(e, cfStylesIntitule)}
			>
				{sectionData.title}
			</Intitule>
			<Paragraphe
				className="paragraphe"
				bgColor={() => getColor(cfStylesPara)}
				fontColor={() => getFontColor(cfStylesPara)}
				onClick={(e) => handleColor(e, cfStylesPara)}
			>
				{sectionData.sentence.map((categorie) => {
					return (
						<Hover
							key={categorie.id}
							isBlock={false}
							// addClick={() => addLangue(lang.id)}
							// removeClick={() => removeLangue(lang.id)}
						>
							<p
								key={categorie.id}
								className={
									categorie.isEnum
										? 'enum no-margin'
										: 'phrase no-margin'
								}
							>
								<SpanSelectable
									value={categorie.intitule}
									endChar={':'}
									onSubmit={(value) =>
										dispatch({
											type: 'submit',
											idSection,
											idSentence: categorie.id,
											prop: 'intitule',
											value,
											oldValue: categorie.intitule,
										})
									}
								/>
								{categorie.isEnum ? (
									categorie.iteration.map((iter, index) => {
										if (
											index <
											categorie.iteration.length - 1
										) {
											// if (categorie.intitule === 'IDE')
											// 	console.log(`	${iter}`);
											return (
												<Hover
													key={index}
													isBlock={false}
													addClick={() =>
														dispatch({
															type: 'addIter',
															idSection,
															idSentence:
																categorie.id,
															index,
														})
													}
													removeClick={() =>
														dispatch({
															type: 'removeIter',
															idSection,
															idSentence:
																categorie.id,
															index,
														})
													}
												>
													<SpanSelectable
														value={iter}
														fontSize={fontS}
														bgColor={'white'}
														endChar={','}
														onSubmit={(value) =>
															dispatch({
																type: 'submit',
																idSection,
																idSentence:
																	categorie.id,
																prop: 'iteration',
																value,
																oldValue: iter,
															})
														}
													/>
												</Hover>
											);
										} else {
											// if (categorie.intitule === 'IDE')
											// 	console.log(`	${iter}`);
											return (
												<Hover
													key={index}
													isBlock={false}
													addClick={() =>
														dispatch({
															type: 'addIter',
															idSection,
															idSentence:
																categorie.id,
															index,
														})
													}
													removeClick={() =>
														dispatch({
															type: 'removeIter',
															idSection,
															idSentence:
																categorie.id,
															index,
														})
													}
												>
													<SpanSelectable
														key={index}
														value={iter}
														fontSize={fontS}
														bgColor={'white'}
														onSubmit={(value) =>
															dispatch({
																type: 'submit',
																idSection,
																idSentence:
																	categorie.id,
																prop: 'iteration',
																value,
																oldValue: iter,
															})
														}
													/>
												</Hover>
											);
										}
									})
								) : (
									<SpanSelectable
										value={categorie.phrase}
										fontSize={fontS}
										bgColor={'white'}
										onSubmit={(value) =>
											dispatch({
												type: 'submit',
												idSection,
												idSentence: categorie.id,
												prop: 'phrase',
												value,
												oldValue: categorie.phrase,
											})
										}
									/>
								)}
							</p>
						</Hover>
					);
				})}
			</Paragraphe>
		</section>
	);
}
