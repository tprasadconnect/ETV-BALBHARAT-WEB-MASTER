import React from 'react';

interface ICharList {
  description: any;
  charList: any;
}

export const AboutCharacters: React.FC<ICharList> = (props: any) => {
  const { description, charList } = props;

  return (
    <div className="tone-card shows">
      {description && (
        <div>
          <h2 className="block-title">About</h2>
          <p className="block-description">{description}</p>
        </div>
      )}

      {charList?.[0]?.toon_image && (
        <div>
          <div className="block-subtitle">Character Info</div>
          <ul className="character-list">
            {charList.map((character: any) => {
              return (
                <li id={character.toon_id} key={character.toon_id}>
                  <div className="character-block">
                    <div>
                      <img
                        className="img-fluid"
                        alt="show-card-img"
                        src={character.toon_image}
                      />
                    </div>
                    <div className="description">
                      <h5>{character.toon_name}</h5>
                      <p>{character.toon_description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
